/*
 * 學習紀錄的儲存
 *
 * 1. 本機：優先使用 IndexedDB（瀏覽器內建的資料庫，可用空間比 localStorage 大很多）。
 *    舊版存在 localStorage 的紀錄，第一次開啟時會自動搬到 IndexedDB。
 *    如果瀏覽器不支援 IndexedDB，才退回使用 localStorage。
 * 2. 雲端（選用）：在 cloud-config.js 填好 Firebase 設定後，可以用 Google 帳號登入，
 *    把學習紀錄同步到雲端。多台裝置的紀錄會「合併」，不會互相覆蓋。
 */
"use strict";

const IDB_NAME = "toeic600";
const IDB_STORE = "kv";

/* ========== 本機儲存 ========== */
const Store = {
  kind: "none", // "idb" = IndexedDB、"local" = localStorage、"none" = 無法儲存
  db: null,
  async init() {
    try {
      if (!window.indexedDB) throw new Error("no indexedDB");
      this.db = await new Promise((resolve, reject) => {
        const req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        req.onblocked = () => reject(new Error("blocked"));
      });
      this.kind = "idb";
    } catch (e) {
      this.kind = localStorageWorks() ? "local" : "none";
    }
  },
  lsKey: (key) => (key === "state" ? STORE_KEY : STORE_KEY + "." + key),
  get(key) {
    if (this.kind === "idb") {
      return new Promise((resolve, reject) => {
        const req = this.db.transaction(IDB_STORE).objectStore(IDB_STORE).get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    if (this.kind === "local") {
      const v = localStorage.getItem(this.lsKey(key));
      return Promise.resolve(v ? JSON.parse(v) : undefined);
    }
    return Promise.resolve(undefined);
  },
  set(key, value) {
    if (this.kind === "idb") {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(value, key); // 寫入當下就會複製一份資料
        tx.oncomplete = () => resolve();
        tx.onerror = tx.onabort = () => reject(tx.error);
      });
    }
    if (this.kind === "local") {
      try {
        localStorage.setItem(this.lsKey(key), JSON.stringify(value));
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(new Error("no storage"));
  },
};
function localStorageWorks() {
  try {
    localStorage.setItem("__t", "1");
    localStorage.removeItem("__t");
    return true;
  } catch (e) {
    return false;
  }
}

async function load() {
  await Store.init();
  let raw;
  try {
    raw = await Store.get("state");
  } catch (e) {
    raw = undefined;
  }
  // 舊版的紀錄在 localStorage：搬到 IndexedDB
  let moved = false;
  if (!raw && Store.kind === "idb") {
    try {
      const old = localStorage.getItem(STORE_KEY);
      if (old) {
        raw = JSON.parse(old);
        moved = true;
      }
    } catch (e) {
      /* 讀不到舊資料就算了 */
    }
  }
  S = migrate(raw);
  if (moved) {
    try {
      await Store.set("state", S);
      localStorage.removeItem(STORE_KEY);
    } catch (e) {
      /* 搬移失敗時保留 localStorage 的舊資料 */
    }
  }
}
let saveWarned = false;
function saveLocal() {
  Store.set("state", S).catch(() => {
    if (!saveWarned) toast("⚠️ 無法儲存紀錄（瀏覽器可能關閉了儲存功能，或是無痕模式）", 5000);
    saveWarned = true;
  });
}
function save() {
  S.updatedAt = Date.now();
  saveLocal();
  Cloud.schedule();
}

/* ========== 儲存空間資訊 ========== */
function formatBytes(n) {
  if (n == null || isNaN(n)) return "—";
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  if (n < 1024 ** 3) return (n / 1024 / 1024).toFixed(1) + " MB";
  return (n / 1024 ** 3).toFixed(1) + " GB";
}
function browserName() {
  const ua = navigator.userAgent;
  if (/Line\//i.test(ua)) return "LINE 內建瀏覽器";
  if (/FBAN|FBAV|Instagram/i.test(ua)) return "Facebook／Instagram 內建瀏覽器";
  if (/Edg\//.test(ua)) return "Microsoft Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/SamsungBrowser/.test(ua)) return "Samsung 網際網路";
  if (/CriOS|Chrome\//.test(ua)) return "Google Chrome";
  if (/FxiOS|Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua)) return "Safari";
  return "瀏覽器";
}
function isInAppBrowser() {
  return /Line\/|FBAN|FBAV|Instagram/i.test(navigator.userAgent);
}
async function storageInfo() {
  const info = { dataBytes: new Blob([JSON.stringify(S)]).size };
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const e = await navigator.storage.estimate();
      info.usage = e.usage;
      info.quota = e.quota;
    } catch (e) {
      /* 部分瀏覽器不支援 */
    }
  }
  if (navigator.storage && navigator.storage.persisted) {
    try {
      info.persisted = await navigator.storage.persisted();
    } catch (e) {
      /* 不支援 */
    }
  }
  info.canPersist = !!(navigator.storage && navigator.storage.persist);
  return info;
}
function storageCardHTML() {
  const kind = { idb: "IndexedDB（瀏覽器內建資料庫）", local: "localStorage（備用，空間較小）", none: "無法儲存（可能是無痕模式）" }[Store.kind];
  const site = location.protocol === "file:" ? "電腦上的本機檔案（file://）" : location.host;
  return `<div class="card" id="storageCard"><h2>💾 資料儲存位置</h2>
    <ul class="kv">
      <li><span>裝置</span><b>這台${/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "手機／平板" : "電腦"}</b></li>
      <li><span>瀏覽器</span><b>${esc(browserName())}</b></li>
      <li><span>網站</span><b class="en">${esc(site)}</b></li>
      <li><span>儲存方式</span><b>${kind}</b></li>
      <li><span>資料庫名稱</span><b class="en">${Store.kind === "idb" ? IDB_NAME : Store.kind === "local" ? STORE_KEY : "—"}</b></li>
    </ul>
    ${isInAppBrowser() ? `<div class="notice bad">你正在 LINE／Facebook 的內建瀏覽器中使用，紀錄很容易被清掉。建議改用 Chrome 或 Safari 開啟網址。</div>` : ""}
    ${Store.kind === "none" ? `<div class="notice bad">這個瀏覽器目前無法儲存資料，關閉頁面後紀錄會消失。請關閉無痕模式或換一個瀏覽器。</div>` : ""}
    <div id="storageUsage"><p class="hint">正在讀取空間資訊…</p></div>
  </div>`;
}
async function fillStorageInfo() {
  const box = $("#storageUsage");
  if (!box) return;
  const i = await storageInfo();
  if (!$("#storageUsage")) return;
  let html = `<ul class="kv"><li><span>學習紀錄大小</span><b>${formatBytes(i.dataBytes)}</b></li>`;
  if (i.quota) {
    const free = Math.max(0, i.quota - (i.usage || 0));
    html += `<li><span>這個網站已使用</span><b>${formatBytes(i.usage)}</b></li>
      <li><span>瀏覽器允許上限</span><b>約 ${formatBytes(i.quota)}</b></li>
      <li><span>剩餘空間</span><b>約 ${formatBytes(free)}</b></li></ul>
      <div class="pbar" style="margin:6px 0 4px" title="已使用 ${formatBytes(i.usage)}"><span style="width:${Math.max(0.5, Math.min(100, ((i.usage || 0) / i.quota) * 100))}%"></span></div>
      <p class="hint" style="margin-top:2px">已使用 ${(i.usage || 0) / i.quota < 0.0001 ? "不到 0.01" : (((i.usage || 0) / i.quota) * 100).toFixed(2)}%。2000 個單字全部學完，紀錄也只有幾百 KB，空間非常足夠。</p>`;
  } else {
    html += `</ul><p class="hint">這個瀏覽器無法查詢可用空間。</p>`;
  }
  if (i.persisted === true) {
    html += `<p>🔒 <b>永久保存：已開啟</b>　<span class="hint">瀏覽器空間不足時也不會自動刪除這些紀錄。</span></p>`;
  } else if (i.canPersist) {
    html += `<p>🔓 <b>永久保存：未開啟</b>　<span class="hint">瀏覽器空間不足或太久沒使用時，可能會自動清掉紀錄。</span></p>
      <button class="btn small" data-act="persist">🔒 申請永久保存</button>`;
  }
  box.innerHTML = html;
}
async function requestPersist() {
  try {
    const ok = await navigator.storage.persist();
    toast(ok ? "✅ 已開啟永久保存" : "瀏覽器暫時沒有同意。常使用這個網站或把它加到主畫面後，再試一次比較容易成功。", 4000);
  } catch (e) {
    toast("這個瀏覽器不支援永久保存");
  }
  fillStorageInfo();
}

/* ========== 合併兩份學習紀錄（多台裝置同步用） ========== */
function wordIsNewer(a, b) {
  const la = a.last || "", lb = b.last || "";
  if (la !== lb) return la > lb;
  return (a.ok || 0) + (a.ng || 0) > (b.ok || 0) + (b.ng || 0);
}
function mergeStates(x, y) {
  const a = migrate(JSON.parse(JSON.stringify(x)));
  const b = migrate(JSON.parse(JSON.stringify(y)));
  const aNewer = (a.updatedAt || 0) >= (b.updatedAt || 0);
  const out = aNewer ? a : b; // 設定、今日任務等以「最後修改」的那份為主
  const other = aNewer ? b : a;
  // 單字：每個字各自保留較新的紀錄
  Object.keys(other.words).forEach((id) => {
    if (!out.words[id] || wordIsNewer(other.words[id], out.words[id])) out.words[id] = other.words[id];
  });
  // 每日練習量：同一天取較大的數字
  Object.keys(other.history).forEach((d) => {
    const h = out.history[d] || (out.history[d] = {});
    Object.keys(other.history[d]).forEach((k) => (h[k] = Math.max(h[k] || 0, other.history[d][k] || 0)));
  });
  // 文法題：保留作答次數較多的紀錄
  Object.keys(other.grammar).forEach((id) => {
    const o = other.grammar[id], n = out.grammar[id];
    if (!n || (o.ok || 0) + (o.ng || 0) > (n.ok || 0) + (n.ng || 0)) out.grammar[id] = o;
  });
  // 同一天在兩台裝置都學了新字：今日新單字清單合併
  if (out.daily && other.daily && out.daily.date === other.daily.date) {
    other.daily.newIds.forEach((id) => out.daily.newIds.includes(id) || out.daily.newIds.push(id));
    out.daily.reviewTotal = Math.max(out.daily.reviewTotal || 0, other.daily.reviewTotal || 0);
  } else if (!out.daily && other.daily) out.daily = other.daily;
  if (!out.placement && other.placement) out.placement = other.placement;
  if (!out.priority.length && other.priority.length) out.priority = other.priority;
  if ((other.lastExport || "") > (out.lastExport || "")) out.lastExport = other.lastExport;
  out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return out;
}

/* ========== 雲端同步（Firebase，選用） ========== */
const FIREBASE_FILES = [
  "vendor/firebase/firebase-app-compat.js",
  "vendor/firebase/firebase-auth-compat.js",
  "vendor/firebase/firebase-firestore-compat.js",
];
const CLOUD_LIMIT = 900 * 1024; // Firestore 單筆資料上限約 1 MB
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("無法載入 " + src));
    document.head.appendChild(s);
  });
}
const Cloud = {
  state: "off", // off：未設定｜file：本機檔案無法登入｜loading｜ready｜error
  user: null,
  syncing: false,
  again: false,
  timer: null,
  lastSync: null,
  cloudBytes: null,
  message: "",
  configured() {
    const c = window.CLOUD_CONFIG || {};
    return !!(c.apiKey && c.authDomain && c.projectId);
  },
  async init() {
    if (!this.configured()) return;
    if (location.protocol === "file:") {
      this.state = "file";
      return refreshCloudUI();
    }
    this.state = "loading";
    refreshCloudUI();
    try {
      for (const f of FIREBASE_FILES) await loadScript(f);
      firebase.initializeApp(window.CLOUD_CONFIG);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.state = "ready";
      this.auth.getRedirectResult().catch((e) => this.fail(e));
      this.auth.onAuthStateChanged((u) => {
        this.user = u;
        if (u) this.sync();
        else {
          this.lastSync = null;
          this.cloudBytes = null;
        }
        refreshCloudUI();
      });
    } catch (e) {
      this.state = "error";
      this.message = "雲端功能載入失敗：" + (e.message || e);
    }
    refreshCloudUI();
  },
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await this.auth.signInWithPopup(provider);
      toast("✅ 登入成功，正在同步學習紀錄…");
    } catch (e) {
      if (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") {
        try {
          await this.auth.signInWithRedirect(provider);
        } catch (e2) {
          this.fail(e2);
        }
      } else if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") this.fail(e);
    }
  },
  async logout() {
    if (this.timer) await this.sync(); // 登出前先把最新紀錄送上雲端
    await this.auth.signOut();
    toast("已登出。學習紀錄仍保留在這台裝置。");
  },
  doc() {
    return this.db.collection("users").doc(this.user.uid);
  },
  // 本機紀錄有變動時，等 10 秒沒有新動作再上傳（避免每答一題就上傳一次）
  schedule() {
    if (!this.user) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.sync(), 10000);
  },
  flush() {
    if (this.user && this.timer) this.sync();
  },
  // mode = "merge"：先下載雲端紀錄和本機合併再上傳；"overwrite"：直接用本機紀錄取代雲端
  async sync(mode = "merge") {
    if (!this.user) return;
    if (this.syncing) {
      this.again = true;
      return;
    }
    this.syncing = true;
    clearTimeout(this.timer);
    this.timer = null;
    refreshCloudUI();
    try {
      if (mode === "merge") {
        const snap = await this.doc().get();
        const data = snap.exists ? snap.data() : null;
        if (data && data.state) {
          const before = JSON.stringify(S);
          S = mergeStates(S, JSON.parse(data.state));
          if (JSON.stringify(S) !== before) {
            saveLocal();
            applyTheme();
            if (!session && tab !== "settings") render();
          }
        }
      }
      const text = JSON.stringify(S);
      if (text.length > CLOUD_LIMIT) throw new Error("學習紀錄太大，無法上傳到雲端");
      await this.doc().set({ app: "toeic600", state: text, size: text.length, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      this.cloudBytes = new Blob([text]).size;
      this.lastSync = new Date();
      this.message = "";
    } catch (e) {
      this.fail(e);
    }
    this.syncing = false;
    refreshCloudUI();
    if (this.again) {
      this.again = false;
      this.schedule();
    }
  },
  async wipe() {
    try {
      await this.doc().delete();
      this.cloudBytes = 0;
      this.lastSync = null;
      toast("已刪除雲端上的學習紀錄（這台裝置的紀錄仍保留）");
    } catch (e) {
      this.fail(e);
    }
    refreshCloudUI();
  },
  fail(e) {
    console.warn("雲端同步錯誤", e);
    const code = (e && e.code) || "";
    this.message =
      code === "auth/unauthorized-domain" ? `這個網址（${location.host}）還沒加入 Firebase 的「已授權網域」，請照 README 的步驟新增。`
      : code === "permission-denied" ? "雲端資料庫拒絕存取，請確認 Firestore 的安全規則有照 README 設定。"
      : code === "unavailable" || code === "auth/network-request-failed" ? "網路連線失敗，下次有網路時會再同步。"
      : code === "auth/operation-not-allowed" ? "Firebase 還沒有啟用 Google 登入，請照 README 的步驟開啟。"
      : "雲端同步失敗：" + ((e && e.message) || e);
    refreshCloudUI();
  },
};
function cloudCardHTML() {
  const c = Cloud;
  let body;
  if (c.state === "off") {
    body = `<p class="hint" style="margin-top:0">尚未設定。雲端同步需要先建立免費的 Firebase 專案，並把設定填進 <b class="en">cloud-config.js</b>（約 10 分鐘，步驟在 README 的「雲端同步設定」）。</p>
      <p class="hint">設定完成前，學習紀錄只存在這台裝置，換裝置請用下方的「匯出／匯入備份」。</p>`;
  } else if (c.state === "file") {
    body = `<p class="hint" style="margin-top:0">雲端已設定，但目前是直接打開電腦上的 index.html，無法使用 Google 登入。請改用網址（例如 GitHub Pages）開啟 App。</p>`;
  } else if (c.state === "loading") {
    body = `<p class="hint" style="margin-top:0">雲端功能載入中…</p>`;
  } else if (c.state === "error") {
    body = `<div class="notice bad">${esc(c.message)}</div>`;
  } else if (!c.user) {
    body = `<p class="hint" style="margin-top:0">登入後，學習紀錄會自動備份到雲端。換手機、清除瀏覽器資料也不怕遺失，多台裝置的進度會自動合併。</p>
      ${c.message ? `<div class="notice bad">${esc(c.message)}</div>` : ""}
      <button class="btn primary block" data-act="cloud-login">🔑 使用 Google 帳號登入</button>`;
  } else {
    const u = c.user;
    body = `<ul class="kv">
        <li><span>帳號</span><b>${esc(u.displayName || "")} <span class="en">${esc(u.email || "")}</span></b></li>
        <li><span>狀態</span><b>${c.syncing ? "🔄 同步中…" : c.lastSync ? `✅ 已同步（${pad(c.lastSync.getHours())}:${pad(c.lastSync.getMinutes())}）` : "等待同步"}</b></li>
        <li><span>雲端資料大小</span><b>${c.cloudBytes == null ? "—" : formatBytes(c.cloudBytes)}</b></li>
        <li><span>雲端空間</span><b>Firebase 免費方案（共 1 GB）</b></li>
      </ul>
      ${c.message ? `<div class="notice bad">${esc(c.message)}</div>` : ""}
      <p class="hint">練習時會自動同步（停止作答約 10 秒後上傳）。</p>
      <div class="btn-row">
        <button class="btn" data-act="cloud-sync" ${c.syncing ? "disabled" : ""}>🔄 立即同步</button>
        <button class="btn" data-act="cloud-logout">登出</button>
      </div>
      <div style="text-align:center"><button class="link-btn" data-act="cloud-wipe">刪除雲端上的學習紀錄</button></div>`;
  }
  return `<div class="card" id="cloudCard"><h2>☁️ 帳號與雲端同步</h2>${body}</div>`;
}
function refreshCloudUI() {
  const el = $("#cloudCard");
  if (el) el.outerHTML = cloudCardHTML();
}
