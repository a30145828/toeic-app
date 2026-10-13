/*
 * 多益單字與文法練習 App 主程式
 * 純前端，學習紀錄存在瀏覽器的 localStorage。
 */
"use strict";

/* ========== 常數 ========== */
const STORE_KEY = "toeic600.v1";
const TOPICS = {
  office: { name: "辦公室", icon: "🏢" },
  meeting: { name: "會議", icon: "📊" },
  hr: { name: "人事", icon: "👥" },
  travel: { name: "出差", icon: "✈️" },
  restaurant: { name: "餐廳", icon: "🍽️" },
  shopping: { name: "購物", icon: "🛍️" },
  finance: { name: "財務", icon: "💰" },
  manufacturing: { name: "製造", icon: "🏭" },
  marketing: { name: "行銷", icon: "📣" },
};
const TYPE_NAMES = { enzh: "英選中", zhen: "中選英", listen: "聽音選意思", spell: "拼字" };
const TYPE_KEYS = Object.keys(TYPE_NAMES);
const NEW_OPTIONS = [5, 10, 15, 20, 30];
const REVIEW_LIMIT = 80; // 待複習超過這個數量時，新單字減半
const MASTER_REPS = 3; // 連續答對 3 次（間隔拉長）就算「已學會」
const BATCH = 5; // 新單字每 5 個一組：先看卡片，再小測驗
const GRAMMAR_ROUND = 10;
const GRAMMAR_TOPICS = ["詞性", "時態", "介系詞", "連接詞"];
const RATES = [{ v: 0.7, n: "慢" }, { v: 0.9, n: "正常" }, { v: 1.05, n: "快" }];

const DONE_MSGS = [
  "太棒了！今天的任務全部完成 🎉",
  "做得好！每天進步一點點，600 分就在前面！",
  "完成！持之以恆就是最強的學習法 💪",
  "好厲害！今天的你又更接近目標了！",
  "任務達成！記得明天再回來複習喔 😊",
  "讚！累積的單字正在慢慢變成你的實力！",
];
const PRAISE = ["答對了！", "很好！", "正確！", "太棒了！", "厲害！", "沒錯！"];

/* ========== 小工具 ========== */
const $ = (sel, el = document) => el.querySelector(sel);
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const pad = (n) => (n < 10 ? "0" + n : "" + n);
const dateStr = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const today = () => dateStr(new Date());
function addDays(ds, n) {
  const [y, m, d] = ds.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  return dateStr(dt);
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const topicName = (t) => (TOPICS[t] ? TOPICS[t].name : t);
const topicIcon = (t) => (TOPICS[t] ? TOPICS[t].icon : "📁");
const LETTERS = ["A", "B", "C", "D"];

let toastTimer = null;
function toast(msg, ms = 2600) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), ms);
}

/* ========== 發音（瀏覽器語音） ========== */
const TTS = {
  ok: typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined",
  voice: null,
  init() {
    if (!this.ok) return;
    const choose = () => {
      const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang) || /^en$/i.test(v.lang));
      const us = vs.filter((v) => /^en[-_]US/i.test(v.lang));
      const good = (list) => list.find((v) => /Google|Samantha|Aria|Jenny|Natural|Ava|Allison/i.test(v.name));
      this.voice = good(us) || us[0] || vs.find((v) => /^en[-_]GB/i.test(v.lang)) || vs[0] || null;
    };
    choose();
    if ("onvoiceschanged" in speechSynthesis) speechSynthesis.onvoiceschanged = choose;
  },
  speak(text) {
    if (!this.ok || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = this.voice ? this.voice.lang : "en-US";
      if (this.voice) u.voice = this.voice;
      u.rate = (S && S.settings.rate) || 0.9;
      speechSynthesis.speak(u);
    } catch (e) {
      /* 部分瀏覽器不支援，忽略 */
    }
  },
};

/* ========== 單字與文法資料 ========== */
const DB = { words: [], map: {}, levels: [], order: [], problems: [] };
let GQ = [];

function bigrams(s) {
  const t = s.replace(/[（）()；;，,、…\s/．.a-zA-Z0-9]/g, "");
  const set = new Set();
  for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2));
  if (t.length === 1) set.add(t);
  return set;
}

function buildDB() {
  const levels = (window.WORD_LEVELS || []).slice().sort((a, b) => a.level - b.level);
  levels.forEach((lv) => {
    const info = { level: lv.level, name: lv.name || "", topics: {}, ids: [] };
    const lists = [];
    const keys = Object.keys(lv.topics || {});
    // 主題依固定順序排列（新主題排在後面）
    keys.sort((a, b) => {
      const ia = Object.keys(TOPICS).indexOf(a), ib = Object.keys(TOPICS).indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    keys.forEach((tp) => {
      const list = [];
      (lv.topics[tp] || []).forEach((row, i) => {
        const where = `Level ${lv.level}／${topicName(tp)} 第 ${i + 1} 個`;
        if (!Array.isArray(row) || row.length < 6 || row.slice(0, 6).some((f) => typeof f !== "string" || !f.trim())) {
          DB.problems.push(`${where}：格式不正確（需要 6 個文字欄位）`);
          return;
        }
        const id = row[0].trim().toLowerCase();
        if (DB.map[id]) {
          DB.problems.push(`重複單字「${row[0]}」：Level ${DB.map[id].level} 已有，${where} 已略過`);
          return;
        }
        const w = {
          id, w: row[0].trim(), pos: row[1].trim(), zh: row[2].trim(), kk: row[3].trim(),
          ex: row[4].trim(), exZh: row[5].trim(), level: lv.level, topic: tp,
        };
        w.bg = bigrams(w.zh);
        DB.words.push(w);
        DB.map[id] = w;
        list.push(id);
      });
      info.topics[tp] = list;
      info.ids = info.ids.concat(list);
      lists.push(list);
    });
    DB.levels.push(info);
    // 新單字順序：同一等級內，各主題輪流出題（每天能接觸不同主題，難度也逐步提高）
    const max = Math.max(0, ...lists.map((l) => l.length));
    for (let i = 0; i < max; i++) lists.forEach((l) => l[i] && DB.order.push(l[i]));
  });

  const seenQ = new Set();
  GQ = [];
  (window.GRAMMAR_QUESTIONS || []).forEach((q, i) => {
    const ok = q && typeof q.q === "string" && Array.isArray(q.options) && q.options.length === 4 &&
      q.answer >= 0 && q.answer <= 3 && q.explain;
    if (!ok) return DB.problems.push(`文法第 ${i + 1} 題格式不正確，已略過`);
    const id = q.id || hashId(q.q);
    if (seenQ.has(id)) return DB.problems.push(`文法第 ${i + 1} 題與其他題目重複，已略過`);
    seenQ.add(id);
    GQ.push(Object.assign({ id }, q));
  });
}
function hashId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return "g" + (h >>> 0).toString(36);
}

/* ========== 學習紀錄（localStorage） ========== */
let S = null;
function defaultState() {
  return {
    app: "toeic600",
    version: 1,
    settings: {
      newPerDay: 20,
      newLevel: "all",
      types: { enzh: true, zhen: true, listen: true, spell: true },
      rate: 0.9,
      autoSpeak: true,
      theme: "auto",
    },
    words: {}, // 每個單字的 SM-2 狀態
    daily: null, // 今日任務
    history: {}, // 每天的練習量
    grammar: {}, // 文法題作答紀錄
    lastExport: null,
  };
}
function migrate(o) {
  const d = defaultState();
  if (!o || typeof o !== "object") return d;
  const s = Object.assign(d, o);
  s.settings = Object.assign(defaultState().settings, o.settings || {});
  s.settings.types = Object.assign(defaultState().settings.types, (o.settings || {}).types || {});
  if (!NEW_OPTIONS.includes(+s.settings.newPerDay)) s.settings.newPerDay = 20;
  s.words = o.words && typeof o.words === "object" ? o.words : {};
  Object.keys(s.words).forEach((k) => {
    const st = s.words[k];
    if (!st || typeof st.due !== "string") delete s.words[k];
    else {
      st.ef = +st.ef || 2.5;
      st.int = +st.int || 0;
      st.reps = +st.reps || 0;
    }
  });
  s.history = o.history && typeof o.history === "object" ? o.history : {};
  s.grammar = o.grammar && typeof o.grammar === "object" ? o.grammar : {};
  if (s.daily && (typeof s.daily.date !== "string" || !Array.isArray(s.daily.newIds))) s.daily = null;
  return s;
}
function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    S = raw ? migrate(JSON.parse(raw)) : defaultState();
  } catch (e) {
    S = defaultState();
  }
}
function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(S));
  } catch (e) {
    toast("⚠️ 無法儲存紀錄（瀏覽器可能關閉了儲存功能）");
  }
}
function logAnswer(kind, correct) {
  const t = today();
  const h = S.history[t] || (S.history[t] = { w: 0, g: 0, n: 0, c: 0 });
  h[kind] = (h[kind] || 0) + 1;
  if (correct) h.c = (h.c || 0) + 1;
}

/* ========== SM-2 間隔重複 ========== */
// quality：5=拼字答對、4=選擇題答對、3=靠提示答對、1=答錯
function grade(id, q) {
  const t = today();
  let st = S.words[id];
  if (!st) {
    st = S.words[id] = { ef: 2.5, int: 0, reps: 0, due: t, lapses: 0, ok: 0, ng: 0, first: t };
    logAnswer("n", false);
  }
  if (q >= 3) {
    st.reps += 1;
    st.int = st.reps === 1 ? 1 : st.reps === 2 ? 6 : Math.round(st.int * st.ef);
    st.ok += 1;
  } else {
    // 答錯：重新開始，明天就再出現
    st.reps = 0;
    st.int = 1;
    st.lapses += 1;
    st.ng += 1;
  }
  st.ef = Math.max(1.3, Math.round((st.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)) * 100) / 100);
  st.due = addDays(t, st.int);
  st.last = t;
}
const statusOf = (id) => {
  const st = S.words[id];
  return !st ? "new" : st.reps >= MASTER_REPS ? "mastered" : "learning";
};
function countStatus(ids) {
  let m = 0, l = 0;
  ids.forEach((id) => {
    const s = statusOf(id);
    if (s === "mastered") m++;
    else if (s === "learning") l++;
  });
  return { m, l, total: ids.length };
}

/* ========== 今日任務 ========== */
function dueIds() {
  const t = today();
  return Object.keys(S.words).filter((id) => DB.map[id] && S.words[id].due <= t);
}
function newPool() {
  const lv = S.settings.newLevel;
  let pool = DB.order.filter((id) => !S.words[id] && (lv === "all" || DB.map[id].level === +lv));
  if (!pool.length && lv !== "all") pool = DB.order.filter((id) => !S.words[id]);
  return pool;
}
function quotaFor(dueCount) {
  const n = S.settings.newPerDay;
  return dueCount > REVIEW_LIMIT ? { quota: Math.ceil(n / 2), halved: true } : { quota: n, halved: false };
}
function ensureDaily() {
  const t = today();
  if (!S.daily || S.daily.date !== t) {
    const due = dueIds().length;
    const { quota, halved } = quotaFor(due);
    S.daily = { date: t, reviewTotal: due, dueAtStart: due, quota, halved, extra: 0, newIds: newPool().slice(0, quota), completed: false, msg: "" };
    save();
  }
  S.daily.newIds = S.daily.newIds.filter((id) => DB.map[id]);
  const remaining = dueIds().length;
  if (remaining > S.daily.reviewTotal) S.daily.reviewTotal = remaining;
  return S.daily;
}
// 設定改變時，重新調整今天的新單字（已學過的保留）
function refreshDailyNew() {
  if (!S.daily || S.daily.date !== today()) return;
  const d = S.daily;
  const learned = d.newIds.filter((id) => S.words[id]);
  const { quota, halved } = quotaFor(d.dueAtStart);
  d.quota = quota;
  d.halved = halved;
  const target = quota + d.extra;
  const fill = newPool().filter((id) => !learned.includes(id));
  d.newIds = learned.concat(fill.slice(0, Math.max(0, target - learned.length)));
  if (!isDailyDone()) d.completed = false;
}
function reviewProgress() {
  const d = ensureDaily();
  const remaining = dueIds().length;
  return { remaining, total: d.reviewTotal, done: Math.max(0, d.reviewTotal - remaining) };
}
function newProgress() {
  const d = ensureDaily();
  const done = d.newIds.filter((id) => S.words[id]).length;
  return { done, total: d.newIds.length, remaining: d.newIds.length - done };
}
function isDailyDone() {
  return dueIds().length === 0 && S.daily.newIds.every((id) => S.words[id]);
}
function checkDailyComplete() {
  ensureDaily();
  if (isDailyDone() && !S.daily.completed) {
    S.daily.completed = true;
    S.daily.msg = pick(DONE_MSGS);
    save();
    return true;
  }
  return false;
}
function streak() {
  const active = (d) => {
    const h = S.history[d];
    return h && (h.w || 0) + (h.g || 0) > 0;
  };
  let d = today();
  if (!active(d)) d = addDays(d, -1);
  let n = 0;
  while (active(d)) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}
function totalMastered() {
  return Object.keys(S.words).filter((id) => DB.map[id] && S.words[id].reps >= MASTER_REPS).length;
}

/* ========== 出題 ========== */
function enabledTypes() {
  let t = TYPE_KEYS.filter((k) => S.settings.types[k]);
  if (!TTS.ok) t = t.filter((k) => k !== "listen");
  return t.length ? t : ["enzh"];
}
function chooseType(item) {
  const types = enabledTypes();
  const st = S.words[item.id];
  if (item.phase === "new" || !st) {
    for (const k of ["enzh", "zhen", "listen"]) if (types.includes(k)) return k;
    return types[0];
  }
  let pool = types;
  if (st.reps < 1 && pool.length > 1) pool = pool.filter((k) => k !== "spell"); // 還不熟的字先不考拼字
  return pick(pool);
}
function retryType(type) {
  const types = enabledTypes();
  const want = type === "zhen" ? "enzh" : "zhen";
  if (types.includes(want)) return want;
  return types.includes(type) ? type : types[0];
}
function distractors(w, n) {
  const ok = (c) => c.id !== w.id && c.zh !== w.zh && ![...c.bg].some((b) => w.bg.has(b));
  const mainPos = (x) => x.pos.split("/")[0];
  let res = [];
  const add = (list) => {
    for (const c of shuffle(list)) {
      if (res.length >= n) break;
      if (!res.includes(c) && !res.some((r) => r.zh === c.zh || [...c.bg].some((b) => r.bg.has(b)))) res.push(c);
    }
  };
  const sameTopic = DB.words.filter((c) => c.level === w.level && c.topic === w.topic && ok(c));
  add(sameTopic.filter((c) => mainPos(c) === mainPos(w)));
  if (res.length < n) add(sameTopic);
  if (res.length < n) add(DB.words.filter((c) => c.level === w.level && ok(c)));
  if (res.length < n) add(DB.words.filter(ok));
  return res;
}
function buildQuestion(w, type) {
  if (type === "spell") return { type, w };
  const options = shuffle([w].concat(distractors(w, 3)));
  return { type, w, options, answer: options.indexOf(w) };
}
function spellMask(word, shown) {
  let letters = 0;
  return word
    .split("")
    .map((ch) => {
      if (!/[a-z]/i.test(ch)) return ch === " " ? "&nbsp;" : esc(ch);
      letters++;
      return letters <= shown ? esc(ch) : "_";
    })
    .join(" ");
}
const normSpell = (s) => s.toLowerCase().replace(/[^a-z]/g, "");

function highlight(text, word) {
  const b = word.toLowerCase();
  const stem = b.length >= 5 ? b.slice(0, -1) : b;
  const re = new RegExp("(^|[^A-Za-z])(" + stem.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&") + "[A-Za-z-]*)", "i");
  const m = re.exec(text);
  if (!m) return esc(text);
  const start = m.index + m[1].length;
  const end = start + m[2].length;
  return esc(text.slice(0, start)) + "<mark>" + esc(text.slice(start, end)) + "</mark>" + esc(text.slice(end));
}
function wordCardHTML(w, big) {
  return `<div class="wcard${big ? " big" : ""}">
    <div class="wc-head"><span class="wc-word en">${esc(w.w)}</span>
      <button class="speak" data-say="${esc(w.w)}" aria-label="朗讀單字">🔊</button></div>
    <div class="wc-kk"><span class="kk">[${esc(w.kk)}]</span><span class="pos en">${esc(w.pos)}</span></div>
    <div class="wc-zh">${esc(w.zh)}</div>
    <div class="wc-ex">
      <p class="en">${highlight(w.ex, w.w)} <button class="speak sm" data-say="${esc(w.ex)}" aria-label="朗讀例句">🔊</button></p>
      <p class="zh">${esc(w.exZh)}</p>
    </div>
    <div class="wc-meta">Level ${w.level}・${topicIcon(w.topic)} ${esc(topicName(w.topic))}</div>
  </div>`;
}

/* ========== 頁面切換 ========== */
let tab = "home";
const wordsView = { level: null, topic: null, open: null, query: "" };
let statsLevel = "all";
let showTable = false;
const TITLES = { home: "今日任務", words: "單字庫", grammar: "文法練習", stats: "學習統計", settings: "設定" };

function setTab(t) {
  tab = t;
  document.querySelectorAll(".tabbar button").forEach((b) => b.classList.toggle("active", b.dataset.tab === t));
  render();
  window.scrollTo(0, 0);
}
function render() {
  $("#pageTitle").textContent = TITLES[tab];
  const view = $("#view");
  if (!DB.words.length) {
    view.innerHTML = `<div class="notice bad">找不到單字資料。請確認 words-level1.js 和 index.html 放在同一個資料夾。</div>`;
    return;
  }
  view.innerHTML = { home: homeHTML, words: wordsHTML, grammar: grammarHTML, stats: statsHTML, settings: settingsHTML }[tab]();
}

/* ----- 今日任務頁 ----- */
function homeHTML() {
  ensureDaily();
  checkDailyComplete();
  const d = S.daily;
  const rv = reviewProgress();
  const nw = newProgress();
  const h = S.history[today()] || {};
  const dt = new Date();
  const wk = "日一二三四五六"[dt.getDay()];
  let out = `<p class="today-date">${dt.getMonth() + 1} 月 ${dt.getDate()} 日（星期${wk}）</p>`;

  if (d.halved) {
    out += `<div class="notice">📌 今天待複習的單字有 <b>${d.dueAtStart}</b> 個（超過 ${REVIEW_LIMIT} 個），新單字自動減半為 <b>${d.quota}</b> 個。先把複習清掉，記得更牢！</div>`;
  }
  const poolLeft = newPool().length;
  if (!poolLeft && !nw.total) out += `<div class="notice info">🎓 所有單字都學過了！接下來只要每天把複習完成就好。</div>`;

  const rvDone = rv.remaining === 0;
  const nwDone = nw.remaining === 0;
  out += `<div class="card">
    <h2>今日任務</h2>
    <div class="task-row">
      <div class="task-ico ${rvDone ? "done" : ""}">${rvDone ? "✓" : "🔁"}</div>
      <div class="task-main"><div class="t">① 複習到期單字</div>
        <div class="s">${rv.total ? `${rv.done} / ${rv.total} 個` : "今天沒有要複習的單字"}</div>
        ${rv.total ? `<div class="pbar"><span style="width:${pct(rv.done, rv.total)}%"></span></div>` : ""}
      </div>
    </div>
    <div class="task-row">
      <div class="task-ico ${nwDone ? "done" : ""}">${nwDone ? "✓" : "🆕"}</div>
      <div class="task-main"><div class="t">② 學習新單字</div>
        <div class="s">${nw.total ? `${nw.done} / ${nw.total} 個` : "今天沒有新單字"}${!rvDone && !nwDone ? "（複習完才開始）" : ""}</div>
        ${nw.total ? `<div class="pbar"><span style="width:${pct(nw.done, nw.total)}%"></span></div>` : ""}
      </div>
    </div>`;

  if (d.completed) {
    out += `<div class="done-box">
        <div class="big-check" aria-hidden="true">✓</div>
        <p class="msg">${esc(d.msg || DONE_MSGS[0])}</p>
        <p class="hint">今天答了 ${h.w || 0} 題單字、${h.g || 0} 題文法</p>
      </div>
      <div class="btn-row">
        ${poolLeft ? `<button class="btn" data-act="extra">➕ 再學 5 個</button>` : ""}
        <button class="btn" data-act="go-grammar">✏️ 做文法練習</button>
      </div>`;
  } else {
    const label = !rvDone ? `開始複習（${rv.remaining} 個）` : `學習新單字（${nw.remaining} 個）`;
    const started = rv.done > 0 || nw.done > 0;
    out += `<button class="btn primary block" data-act="start-daily" style="margin-top:8px">▶ ${started ? "繼續：" : ""}${label}</button>
      <p class="hint" style="margin:8px 0 0">隨時可以離開，進度會自動儲存。</p>`;
  }
  out += `</div>`;

  out += `<div class="card"><h2>學習概況</h2><div class="mini-stats">
      <div><b>${streak()}</b><span>🔥 連續天數</span></div>
      <div><b>${totalMastered()}</b><span>✅ 已學會</span></div>
      <div><b>${(h.w || 0) + (h.g || 0)}</b><span>✍️ 今日題數</span></div>
    </div></div>`;
  out += `<div class="card"><h2>文法小練習</h2>
      <p class="hint" style="margin-top:0">多益 Part 5 單句填空，每回 ${GRAMMAR_ROUND} 題，附中文解析。</p>
      <button class="btn block" data-act="go-grammar">✏️ 前往文法練習</button></div>`;
  return out;
}

/* ----- 單字庫頁 ----- */
function wordRowHTML(id) {
  const w = DB.map[id];
  const st = statusOf(id);
  const open = wordsView.open === id;
  return `<li class="word-row"><button data-act="open-word" data-id="${esc(id)}" aria-expanded="${open}">
      <span class="dot ${st}" title="${{ new: "未學", learning: "學習中", mastered: "已學會" }[st]}"></span>
      <span class="ww en">${esc(w.w)}</span><span class="wz">${esc(w.zh)}</span></button>
      ${open ? `<div class="detail">${wordCardHTML(w)}</div>` : ""}</li>`;
}
function statusLegend() {
  return `<div class="legend"><span><i class="b0"></i>未學</span><span><i class="b2"></i>學習中</span><span><i></i>已學會（連續答對 ${MASTER_REPS} 次）</span></div>`;
}
function stackBar(c) {
  const m = pct(c.m, c.total), l = pct(c.l, c.total);
  return `<div class="pbar">${m ? `<span style="width:${m}%"></span>` : ""}${l ? `<span class="b2" style="width:${l}%"></span>` : ""}</div>`;
}
function wordsHTML() {
  if (wordsView.level === null) wordsView.level = DB.levels[0].level;
  const lv = DB.levels.find((l) => l.level === wordsView.level) || DB.levels[0];

  if (wordsView.topic) {
    const ids = lv.topics[wordsView.topic] || [];
    const c = countStatus(ids);
    return `<button class="back-btn" data-act="words-back">‹ 返回主題列表</button>
      <div class="card"><h2>${topicIcon(wordsView.topic)} Level ${lv.level} ${esc(lv.name)}・${esc(topicName(wordsView.topic))}</h2>
        <div class="prow"><div class="pl"><b>${ids.length} 個單字</b><span>已學會 ${c.m}・學習中 ${c.l}</span></div>${stackBar(c)}</div>
        ${statusLegend()}
        <button class="btn primary block" style="margin-top:12px" data-act="practice" data-level="${lv.level}" data-topic="${esc(wordsView.topic)}">🎯 練習這個主題（10 題）</button>
        <p class="hint" style="margin:6px 0 0">主題練習是額外的自由練習，不會改變複習排程。點單字可看詳細內容和發音。</p>
      </div>
      <ul class="word-list card">${ids.map(wordRowHTML).join("")}</ul>`;
  }

  let out = `<input class="search" type="search" placeholder="🔍 搜尋英文或中文…" value="${esc(wordsView.query)}" data-input="search" aria-label="搜尋單字">`;
  const q = wordsView.query.trim().toLowerCase();
  if (q) {
    const found = DB.words.filter((w) => w.id.includes(q) || w.zh.includes(q)).slice(0, 60);
    out += `<div class="card"><h2>搜尋結果（${found.length}${found.length === 60 ? "+" : ""}）</h2>
      ${found.length ? `<ul class="word-list">${found.map((w) => wordRowHTML(w.id)).join("")}</ul>` : `<p class="hint">找不到符合的單字。</p>`}</div>`;
    return out;
  }
  out += `<div class="chips">${DB.levels
    .map((l) => `<button class="chip ${l.level === lv.level ? "on" : ""}" data-act="words-level" data-level="${l.level}">Level ${l.level} ${esc(l.name)}</button>`)
    .join("")}</div>`;
  const c = countStatus(lv.ids);
  out += `<div class="card"><div class="prow" style="margin-top:0"><div class="pl"><b>Level ${lv.level} 共 ${lv.ids.length} 個單字</b><span>已學會 ${c.m}・學習中 ${c.l}</span></div>${stackBar(c)}</div>${statusLegend()}</div>`;
  out += `<div class="topic-list">${Object.keys(lv.topics)
    .map((tp) => {
      const ids = lv.topics[tp];
      const tc = countStatus(ids);
      return `<button class="topic-item" data-act="words-topic" data-topic="${esc(tp)}">
        <span class="ic">${topicIcon(tp)}</span>
        <span class="tm"><b>${esc(topicName(tp))}</b>${stackBar(tc)}</span>
        <span class="cnt">${tc.m + tc.l}/${ids.length}</span></button>`;
    })
    .join("")}</div>`;
  return out;
}

/* ----- 文法頁 ----- */
function grammarStats(list) {
  let done = 0, ok = 0, ng = 0;
  list.forEach((q) => {
    const r = S.grammar[q.id];
    if (r) {
      done++;
      ok += r.ok || 0;
      ng += r.ng || 0;
    }
  });
  return { done, total: list.length, acc: pct(ok, ok + ng), answered: ok + ng };
}
function grammarHTML() {
  const wrong = GQ.filter((q) => (S.grammar[q.id] || {}).wrong).length;
  const all = grammarStats(GQ);
  let out = `<div class="card"><h2>多益 Part 5 文法練習</h2>
    <p class="hint" style="margin-top:0">單句填空，每回 ${GRAMMAR_ROUND} 題，答完立刻看中文解析。會優先出還沒做過或做錯的題目。</p>
    <div class="prow"><div class="pl"><b>全部 ${GQ.length} 題</b><span>做過 ${all.done} 題${all.answered ? `・答對率 ${all.acc}%` : ""}</span></div>
      <div class="pbar">${all.done ? `<span style="width:${pct(all.done, all.total)}%"></span>` : ""}</div></div>
    <button class="btn primary block" data-act="grammar-start" data-topic="all">▶ 綜合練習</button></div>`;
  out += `<div class="card"><h2>依主題練習</h2>`;
  GRAMMAR_TOPICS.forEach((t) => {
    const list = GQ.filter((q) => q.topic === t);
    if (!list.length) return;
    const s = grammarStats(list);
    out += `<div class="task-row"><div class="task-main"><div class="t">${t}</div>
        <div class="s">${list.length} 題・做過 ${s.done} 題${s.answered ? `・答對率 ${s.acc}%` : ""}</div></div>
        <button class="btn small" data-act="grammar-start" data-topic="${t}">練習</button></div>`;
  });
  out += `</div><div class="card"><h2>錯題複習</h2>
    <p class="hint" style="margin-top:0">${wrong ? `目前有 ${wrong} 題上次答錯，再做一次答對就會移出錯題。` : "目前沒有錯題，太棒了！"}</p>
    <button class="btn block" data-act="grammar-start" data-topic="wrong" ${wrong ? "" : "disabled"}>🔁 複習錯題</button></div>`;
  return out;
}

/* ----- 統計頁 ----- */
function statsHTML() {
  const learned = Object.keys(S.words).filter((id) => DB.map[id]).length;
  const gAll = grammarStats(GQ);
  let out = `<div class="stat-grid">
      <div class="stat-tile"><div class="v">${streak()}</div><div class="l">🔥 連續學習天數</div></div>
      <div class="stat-tile"><div class="v">${totalMastered()}</div><div class="l">✅ 已學會單字</div></div>
      <div class="stat-tile"><div class="v">${learned}<small style="font-size:.9rem;color:var(--muted)"> / ${DB.words.length}</small></div><div class="l">📖 學過的單字</div></div>
      <div class="stat-tile"><div class="v">${gAll.answered ? gAll.acc + "%" : "—"}</div><div class="l">✏️ 文法答對率</div></div>
    </div>`;

  // 近 7 天練習量（單一數列直條圖）
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = addDays(today(), -i);
    const h = S.history[d] || {};
    days.push({ d, w: h.w || 0, g: h.g || 0, n: h.n || 0, t: (h.w || 0) + (h.g || 0) });
  }
  const max = Math.max(10, ...days.map((x) => x.t));
  const sum = days.reduce((a, x) => a + x.t, 0);
  out += `<div class="card"><h2>近 7 天練習量（題）</h2>
    <p class="hint" style="margin-top:0">7 天共 ${sum} 題・平均每天 ${Math.round(sum / 7)} 題。點長條可看當天明細。</p>
    <div class="chart" id="chart">
      <div class="cols">${days
        .map((x, i) => {
          const hgt = x.t ? Math.max(3, (x.t / max) * 100) : 0;
          const isToday = i === 6;
          return `<button class="col" data-act="col" data-i="${i}" aria-label="${x.d.slice(5)}：共 ${x.t} 題（單字 ${x.w}、文法 ${x.g}）">
            ${isToday && x.t ? `<span class="val">${x.t}</span>` : ""}
            <span class="bar ${x.t ? "" : "zero"}" style="height:${hgt}%"></span></button>`;
        })
        .join("")}</div>
      <div class="col-labels">${days
        .map((x, i) => `<span class="${i === 6 ? "today" : ""}">${i === 6 ? "今天" : +x.d.slice(5, 7) + "/" + +x.d.slice(8)}</span>`)
        .join("")}</div>
    </div>
    <button class="link-btn table-toggle" data-act="toggle-table">${showTable ? "隱藏數據表" : "顯示數據表"}</button>
    ${showTable ? `<table class="data"><thead><tr><th>日期</th><th>單字題</th><th>文法題</th><th>新學單字</th><th>合計</th></tr></thead><tbody>${days
      .map((x) => `<tr><td>${x.d.slice(5)}</td><td>${x.w}</td><td>${x.g}</td><td>${x.n}</td><td>${x.t}</td></tr>`)
      .join("")}</tbody></table>` : ""}
  </div>`;
  window.__chartDays = days;

  // 各等級完成度
  out += `<div class="card"><h2>各等級完成度</h2>`;
  DB.levels.forEach((lv) => {
    const c = countStatus(lv.ids);
    out += `<div class="prow"><div class="pl"><b>Level ${lv.level} ${esc(lv.name)}</b><span>${c.m} 已學會・${c.l} 學習中 / ${c.total}</span></div>${stackBar(c)}</div>`;
  });
  out += statusLegend() + `</div>`;

  // 各主題完成度
  out += `<div class="card"><h2>各主題完成度</h2><div class="chips">
    <button class="chip ${statsLevel === "all" ? "on" : ""}" data-act="stats-level" data-level="all">全部等級</button>
    ${DB.levels.map((l) => `<button class="chip ${String(l.level) === String(statsLevel) ? "on" : ""}" data-act="stats-level" data-level="${l.level}">Level ${l.level}</button>`).join("")}</div>`;
  const topicIds = {};
  DB.levels
    .filter((l) => statsLevel === "all" || l.level === +statsLevel)
    .forEach((l) => Object.keys(l.topics).forEach((tp) => (topicIds[tp] = (topicIds[tp] || []).concat(l.topics[tp]))));
  Object.keys(topicIds).forEach((tp) => {
    const c = countStatus(topicIds[tp]);
    out += `<div class="prow"><div class="pl"><b>${topicIcon(tp)} ${esc(topicName(tp))}</b><span>學過 ${c.m + c.l}/${c.total}・已學會 ${c.m}</span></div>${stackBar(c)}</div>`;
  });
  out += statusLegend() + `</div>`;

  // 文法
  out += `<div class="card"><h2>文法各主題</h2>`;
  GRAMMAR_TOPICS.forEach((t) => {
    const list = GQ.filter((q) => q.topic === t);
    if (!list.length) return;
    const s = grammarStats(list);
    out += `<div class="prow"><div class="pl"><b>${t}</b><span>做過 ${s.done}/${s.total}${s.answered ? `・答對率 ${s.acc}%` : ""}</span></div>
      <div class="pbar">${s.done ? `<span style="width:${pct(s.done, s.total)}%"></span>` : ""}</div></div>`;
  });
  out += `</div>`;
  return out;
}
function showColTip(i) {
  const days = window.__chartDays;
  const chart = $("#chart");
  if (!days || !chart) return;
  chart.querySelectorAll(".col").forEach((c, j) => c.classList.toggle("sel", j === i));
  let tip = $(".tip", chart);
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "tip";
    chart.appendChild(tip);
  }
  const x = days[i];
  const col = chart.querySelectorAll(".col")[i];
  tip.innerHTML = `${x.d.slice(5)}：共 <b>${x.t}</b> 題<br>單字 ${x.w}・文法 ${x.g}・新學 ${x.n}`;
  const left = col.offsetLeft + col.offsetWidth / 2;
  tip.style.left = Math.min(Math.max(left, 70), chart.offsetWidth - 70) + "px";
}

/* ----- 設定頁 ----- */
function settingsHTML() {
  const st = S.settings;
  const levelCounts = DB.levels.map((l) => `<li>Level ${l.level} ${esc(l.name)}：${l.ids.length} 個單字</li>`).join("");
  const voice = TTS.ok ? (TTS.voice ? `${esc(TTS.voice.name)}（${esc(TTS.voice.lang)}）` : "系統預設英文語音") : "這個瀏覽器不支援語音朗讀";
  return `<div class="card"><h2>每日新單字數量</h2>
      <div class="seg">${NEW_OPTIONS.map((n) => `<button class="${st.newPerDay === n ? "on" : ""}" data-act="set-new" data-n="${n}">${n}</button>`).join("")}</div>
      <p class="hint">預設 20 個。當天待複習超過 ${REVIEW_LIMIT} 個時，新單字會自動減半。</p>
      <div class="field"><label for="newLevel">新單字範圍</label>
        <select id="newLevel" class="select" data-set="newLevel">
          <option value="all" ${st.newLevel === "all" ? "selected" : ""}>依序學習（Level 1 → 2 → 3…）</option>
          ${DB.levels.map((l) => `<option value="${l.level}" ${String(st.newLevel) === String(l.level) ? "selected" : ""}>只學 Level ${l.level} ${esc(l.name)}</option>`).join("")}
        </select></div>
    </div>
    <div class="card"><h2>複習題型</h2>
      <div class="check-list">${TYPE_KEYS.map((k) => `<label class="check"><input type="checkbox" data-set="type" data-k="${k}" ${st.types[k] ? "checked" : ""} ${k === "listen" && !TTS.ok ? "disabled" : ""}> ${TYPE_NAMES[k]}</label>`).join("")}</div>
      <p class="hint">新單字第一次測驗固定用簡單題型；拼字題會等你答對過一次後才出現。</p>
    </div>
    <div class="card"><h2>發音</h2>
      <div class="field"><span class="lbl">語速</span>
        <div class="seg">${RATES.map((r) => `<button class="${st.rate === r.v ? "on" : ""}" data-act="set-rate" data-v="${r.v}">${r.n}</button>`).join("")}</div></div>
      <label class="check"><input type="checkbox" data-set="autoSpeak" ${st.autoSpeak ? "checked" : ""}> 自動朗讀單字</label>
      <button class="btn small" data-say="Welcome to the meeting. Let's get started.">🔊 測試發音</button>
      <p class="hint">目前語音：${voice}</p>
    </div>
    <div class="card"><h2>外觀</h2>
      <div class="seg">${[["auto", "跟隨系統"], ["light", "淺色"], ["dark", "深色"]].map(([v, n]) => `<button class="${st.theme === v ? "on" : ""}" data-act="set-theme" data-v="${v}">${n}</button>`).join("")}</div>
    </div>
    <div class="card"><h2>學習紀錄備份</h2>
      <p class="hint" style="margin-top:0">學習紀錄只存在這台裝置的這個瀏覽器裡。換手機、清除瀏覽器資料前，請先匯出備份。</p>
      <div class="btn-row">
        <button class="btn" data-act="export">⬇️ 匯出備份（JSON）</button>
        <button class="btn" data-act="import">⬆️ 匯入備份</button>
      </div>
      <input type="file" id="importFile" accept=".json,application/json" hidden>
      <p class="hint">${S.lastExport ? `上次匯出：${S.lastExport}` : "還沒有匯出過備份。"}</p>
    </div>
    <div class="card"><h2>資料檢查</h2>
      <ul class="data-check">${levelCounts}<li>單字總數：${DB.words.length} 個</li><li>文法題：${GQ.length} 題</li></ul>
      ${DB.problems.length
        ? `<div class="notice bad">發現 ${DB.problems.length} 個問題：<ul>${DB.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>`
        : `<div class="notice info">✅ 資料格式正確，沒有重複的單字。</div>`}
    </div>
    <div class="card"><h2>重設</h2>
      <p class="hint" style="margin-top:0">刪除所有學習紀錄（設定會保留）。建議先匯出備份。</p>
      <button class="btn danger block" data-act="reset">🗑️ 清除所有學習紀錄</button>
    </div>
    <p class="hint" style="text-align:center">多益單字文法練習・資料存在你的瀏覽器</p>`;
}
function applyTheme() {
  const t = S.settings.theme;
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

/* ========== 練習畫面（共用） ========== */
let session = null;

function openSession(s) {
  session = Object.assign({ pos: 0, correct: 0, total: 0, done: false }, s);
  $("#toast").hidden = true;
  $("#overlay").hidden = false;
  document.body.classList.add("no-scroll");
  nextItem();
}
function closeSession() {
  if (TTS.ok) speechSynthesis.cancel();
  session = null;
  $("#overlay").hidden = true;
  document.body.classList.remove("no-scroll");
  render();
}
function updateTop() {
  const s = session;
  const n = s.queue.length;
  const p = Math.min(s.pos, n);
  $("#sBar").style.width = pct(p, n) + "%";
  $("#sCount").textContent = s.done ? "" : `${Math.min(p + 1, n)} / ${n}`;
}
function setBody(html) {
  const body = $("#sBody");
  body.innerHTML = html;
  body.scrollTop = 0;
}
function nextItem() {
  const s = session;
  if (s.pos >= s.queue.length) return finishSession();
  updateTop();
  const item = s.queue[s.pos];
  if (item.k === "learn") renderLearn(item);
  else if (item.k === "q") renderQuiz(item);
  else if (item.k === "g") renderGrammarQ(item);
}
function advance() {
  session.pos++;
  nextItem();
}

/* ----- 新單字卡片 ----- */
function renderLearn(item) {
  const id = item.ids[item.i || 0];
  const w = DB.map[id];
  const i = item.i || 0;
  const last = i === item.ids.length - 1;
  setBody(`<p class="learn-label">🆕 認識新單字 ${i + 1} / ${item.ids.length}</p>
    ${wordCardHTML(w, true)}
    <div class="sticky-next btn-row">
      ${i > 0 ? `<button class="btn" data-act="learn-prev">‹ 上一個</button>` : ""}
      <button class="btn primary" data-act="learn-next">${last ? "記住了，開始小測驗 →" : "下一個 →"}</button>
    </div>`);
  if (S.settings.autoSpeak) TTS.speak(w.w);
}

/* ----- 單字題 ----- */
function phaseTag(item) {
  if (item.retry) return `<span class="tag">🔁 再練一次</span>`;
  if (item.phase === "review") return `<span class="tag">🔁 複習</span>`;
  if (item.phase === "new") return `<span class="tag">🆕 新單字測驗</span>`;
  return `<span class="tag">🎯 主題練習</span>`;
}
function renderQuiz(item) {
  const w = DB.map[item.id];
  if (!w) return advance();
  const type = item.type || chooseType(item);
  const q = buildQuestion(w, type);
  session.cur = { item, q, answered: false, hint: 1 };
  let prompt = "";
  const sub = { enzh: "選出正確的中文意思", zhen: "選出正確的英文單字", listen: "聽發音，選出正確的意思", spell: "拼出這個英文單字" }[type];
  if (type === "enzh") {
    prompt = `<div class="q-word en">${esc(w.w)}</div>
      <div class="q-sub"><span class="kk">[${esc(w.kk)}]</span> <button class="speak sm" data-say="${esc(w.w)}" aria-label="朗讀">🔊</button></div>`;
  } else if (type === "zhen" || type === "spell") {
    prompt = `<div class="q-zh">${esc(w.zh)}</div><div class="q-sub en">${esc(w.pos)}</div>`;
  } else if (type === "listen") {
    prompt = `<button class="listen-btn" data-say="${esc(w.w)}" aria-label="再聽一次">🔊</button><div class="q-sub">點按鈕可以再聽一次</div>`;
  }
  let answerArea;
  if (type === "spell") {
    answerArea = `<div class="spell-box">
      <div class="spell-mask en" id="mask">${spellMask(w.w, 1)}</div>
      <input id="spellInput" class="spell-input en" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="輸入英文" aria-label="輸入英文拼字">
      <div class="btn-row">
        <button class="btn" data-act="hint">💡 多給一個字母</button>
        <button class="btn" data-say="${esc(w.w)}">🔊 聽發音</button>
      </div>
      <button class="btn primary block" data-act="spell-submit">確定</button>
    </div>`;
  } else {
    const show = (o) => (type === "zhen" ? `<span class="en">${esc(o.w)}</span>` : esc(o.zh));
    answerArea = `<div class="options">${q.options
      .map((o, i) => `<button class="opt" data-act="opt" data-i="${i}"><span class="k">${LETTERS[i]}</span><span>${show(o)}</span></button>`)
      .join("")}</div>`;
  }
  setBody(`<div class="q-type">${phaseTag(item)} <span class="tag">${TYPE_NAMES[type]}</span></div>
    <div class="q-prompt">${prompt}<div class="q-sub">${sub}</div></div>
    ${answerArea}
    <div style="text-align:center"><button class="link-btn" data-act="dontknow">我不知道，看答案</button></div>
    <div id="fb" class="feedback"></div>`);
  if (type === "listen" || (type === "enzh" && S.settings.autoSpeak)) TTS.speak(w.w);
  if (type === "spell") setTimeout(() => { const el = $("#spellInput"); el && el.focus(); }, 50);
}
function answerOption(i) {
  const cur = session.cur;
  if (!cur || cur.answered || cur.item.k !== "q") return;
  const buttons = document.querySelectorAll("#sBody .opt");
  buttons.forEach((b, j) => {
    b.disabled = true;
    if (j === cur.q.answer) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
  });
  const ok = i === cur.q.answer;
  quizResult(ok, ok ? 4 : 1);
}
function submitSpell(giveUp) {
  const cur = session.cur;
  if (!cur || cur.answered) return;
  const input = $("#spellInput");
  const val = giveUp ? "" : input.value;
  if (!giveUp && !val.trim()) return toast("請先輸入答案，或按「我不知道」");
  const ok = !giveUp && normSpell(val) === normSpell(cur.q.w.w);
  input.disabled = true;
  input.classList.add(ok ? "correct" : "wrong");
  $("#mask").innerHTML = spellMask(cur.q.w.w, 999);
  cur.typed = val;
  quizResult(ok, ok ? (cur.hint > 1 ? 3 : 5) : 1);
}
function giveUp() {
  const cur = session.cur;
  if (!cur || cur.answered) return;
  if (cur.item.k === "g") return answerGrammar(-1);
  if (cur.q.type === "spell") return submitSpell(true);
  answerOption(-1);
}
function quizResult(ok, quality) {
  const s = session;
  const cur = s.cur;
  const item = cur.item;
  const w = cur.q.w;
  cur.answered = true;
  if (item.srs) grade(item.id, quality);
  logAnswer("w", ok);
  if (!item.retry) {
    s.total++;
    if (ok) s.correct++;
  }
  if (!ok) {
    // 答錯的字：過幾題再練一次，直到答對
    s.queue.splice(Math.min(s.queue.length, s.pos + 4), 0, { k: "q", id: item.id, srs: false, retry: true, phase: item.phase, type: retryType(cur.q.type) });
  }
  save();
  const typed = cur.q.type === "spell" && !ok && cur.typed ? `<p class="hint">你的答案：<span class="en">${esc(cur.typed)}</span>　正確拼法：<b class="en">${esc(w.w)}</b></p>` : "";
  $("#fb").innerHTML = `<div class="fb-title ${ok ? "ok" : "ng"}">${ok ? "✓ " + pick(PRAISE) : "✗ 答錯了，沒關係！等一下會再練一次。"}</div>
    ${typed}${wordCardHTML(w)}
    <div class="sticky-next"><button class="btn primary block" data-act="next">下一題 →</button></div>`;
  const dk = $("#sBody .link-btn");
  if (dk) dk.remove();
  if (S.settings.autoSpeak && cur.q.type !== "enzh" && cur.q.type !== "listen") TTS.speak(w.w);
  $("#fb").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ----- 文法題 ----- */
function renderGrammarQ(item) {
  const q = item.q;
  session.cur = { item, answered: false };
  const parts = q.q.split("____");
  const sentence = parts.map(esc).join(`<span class="blank" id="blank">&nbsp;</span>`);
  setBody(`<div class="q-type"><span class="tag">✏️ ${esc(q.topic)}</span></div>
    <div class="g-sentence en">${sentence}</div>
    <div class="options">${q.options
      .map((o, i) => `<button class="opt" data-act="g-opt" data-i="${i}"><span class="k">(${LETTERS[i]})</span><span class="en">${esc(o)}</span></button>`)
      .join("")}</div>
    <div style="text-align:center"><button class="link-btn" data-act="dontknow">我不知道，看解析</button></div>
    <div id="fb" class="feedback"></div>`);
}
function answerGrammar(i) {
  const cur = session.cur;
  if (!cur || cur.answered || cur.item.k !== "g") return;
  cur.answered = true;
  const q = cur.item.q;
  const ok = i === q.answer;
  document.querySelectorAll("#sBody .opt").forEach((b, j) => {
    b.disabled = true;
    if (j === q.answer) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
  });
  $("#blank").textContent = q.options[q.answer];
  const r = S.grammar[q.id] || (S.grammar[q.id] = { ok: 0, ng: 0 });
  if (ok) r.ok++;
  else r.ng++;
  r.wrong = !ok;
  r.last = today();
  logAnswer("g", ok);
  session.total++;
  if (ok) session.correct++;
  save();
  const full = q.q.replace("____", q.options[q.answer]);
  $("#fb").innerHTML = `<div class="fb-title ${ok ? "ok" : "ng"}">${ok ? "✓ " + pick(PRAISE) : `✗ 正確答案是 (${LETTERS[q.answer]}) ${esc(q.options[q.answer])}`}</div>
    <div class="explain">
      <p class="full en">${esc(full)} <button class="speak sm" data-say="${esc(full)}" aria-label="朗讀句子">🔊</button></p>
      ${q.zh ? `<p class="zh">${esc(q.zh)}</p>` : ""}
      <p>💡 ${esc(q.explain)}</p>
    </div>
    <div class="sticky-next"><button class="btn primary block" data-act="next">${session.pos + 1 >= session.queue.length ? "看結果 →" : "下一題 →"}</button></div>`;
  const dk = $("#sBody .link-btn");
  if (dk) dk.remove();
  $("#fb").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ----- 結算 ----- */
function finishSession() {
  const s = session;
  s.done = true;
  s.cur = null;
  updateTop();
  $("#sBar").style.width = "100%";
  const rate = pct(s.correct, s.total);
  let html;
  if (s.mode === "daily") {
    checkDailyComplete();
    const done = isDailyDone();
    html = done
      ? `<div class="result"><div class="big-check" aria-hidden="true">✓</div>
          <p class="msg">${esc(S.daily.msg || DONE_MSGS[0])}</p>
          <p class="hint">這次答對 ${s.correct} / ${s.total} 題（${rate}%）</p></div>`
      : `<div class="result"><div class="score">${rate}%</div><p class="msg">這一輪完成了！</p>
          <p class="hint">答對 ${s.correct} / ${s.total} 題。回首頁看看今天還剩下什麼任務。</p></div>`;
  } else {
    const msg = rate >= 90 ? "太厲害了！🎉" : rate >= 70 ? "表現很好，繼續加油！💪" : rate >= 50 ? "不錯喔，再多練幾次會更熟！" : "沒關係，多看幾次解析就會進步！";
    html = `<div class="result"><div class="score">${s.correct} / ${s.total}</div><p class="msg">${msg}</p>
      <p class="hint">答對率 ${rate}%</p></div>`;
  }
  const again = s.mode === "grammar"
    ? `<button class="btn" data-act="grammar-start" data-topic="${esc(s.topic)}">再來 ${GRAMMAR_ROUND} 題</button>`
    : s.mode === "practice"
    ? `<button class="btn" data-act="practice" data-level="${s.level}" data-topic="${esc(s.topic)}">再練一次</button>`
    : "";
  setBody(html + `<div class="btn-row" style="margin-top:20px">${again}<button class="btn primary" data-act="close">完成</button></div>`);
}

/* ----- 開始各種練習 ----- */
function startDaily() {
  ensureDaily();
  const reviews = shuffle(dueIds());
  const news = S.daily.newIds.filter((id) => !S.words[id]);
  if (!reviews.length && !news.length) {
    toast("今天的任務都完成囉！");
    return render();
  }
  const queue = reviews.map((id) => ({ k: "q", id, srs: true, phase: "review" }));
  for (let i = 0; i < news.length; i += BATCH) {
    const group = news.slice(i, i + BATCH);
    queue.push({ k: "learn", ids: group, i: 0 });
    shuffle(group.slice()).forEach((id) => queue.push({ k: "q", id, srs: true, phase: "new" }));
  }
  openSession({ mode: "daily", queue });
}
function addExtra() {
  ensureDaily();
  const more = newPool().filter((id) => !S.daily.newIds.includes(id)).slice(0, BATCH);
  if (!more.length) return toast("沒有更多新單字了！");
  S.daily.newIds = S.daily.newIds.concat(more);
  S.daily.extra += more.length;
  S.daily.completed = false;
  save();
  startDaily();
}
function startPractice(level, topic) {
  const lv = DB.levels.find((l) => l.level === +level);
  if (!lv || !lv.topics[topic]) return;
  const ids = lv.topics[topic];
  const learned = ids.filter((id) => S.words[id]);
  const pool = learned.length >= 10 ? learned : learned.concat(shuffle(ids.filter((id) => !S.words[id])).slice(0, 10 - learned.length));
  const queue = shuffle(pool.slice()).slice(0, 10).map((id) => ({
    k: "q", id, srs: false, phase: "practice", type: S.words[id] ? undefined : "enzh",
  }));
  openSession({ mode: "practice", level: lv.level, topic, queue });
}
function startGrammar(topic) {
  let pool = topic === "wrong" ? GQ.filter((q) => (S.grammar[q.id] || {}).wrong)
    : GQ.filter((q) => topic === "all" || q.topic === topic);
  if (!pool.length) return toast("沒有可以練習的題目");
  const score = (q) => {
    const r = S.grammar[q.id];
    return !r ? 0 : r.wrong ? 1 : 2;
  };
  pool = shuffle(pool.slice()).sort((a, b) => score(a) - score(b)).slice(0, GRAMMAR_ROUND);
  openSession({ mode: "grammar", topic, queue: shuffle(pool).map((q) => ({ k: "g", q })) });
}

/* ========== 備份：匯出／匯入 ========== */
function exportData() {
  S.lastExport = today();
  save();
  const data = JSON.stringify({ app: "toeic600", exportedAt: new Date().toISOString(), state: S }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `toeic-backup-${today()}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 1500);
  toast("已匯出備份檔");
  render();
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let st = null;
    try {
      const o = JSON.parse(reader.result);
      st = o && o.app === "toeic600" && o.state && typeof o.state.words === "object" ? o.state : null;
    } catch (e) {
      st = null;
    }
    if (!st) return alert("這不是有效的備份檔。請選擇從本 App「匯出備份」產生的 JSON 檔。");
    const n = Object.keys(st.words).length;
    if (!confirm(`要匯入這份備份嗎？\n\n備份裡有 ${n} 個單字的學習紀錄。\n⚠️ 目前這台裝置上的紀錄會被覆蓋。`)) return;
    S = migrate(st);
    save();
    applyTheme();
    toast("✅ 匯入成功！");
    render();
  };
  reader.onerror = () => alert("讀取檔案失敗，請再試一次。");
  reader.readAsText(file);
}

/* ========== 事件處理 ========== */
function onClick(e) {
  const tabBtn = e.target.closest("[data-tab]");
  if (tabBtn) return setTab(tabBtn.dataset.tab);
  const sayBtn = e.target.closest("[data-say]");
  if (sayBtn) return TTS.speak(sayBtn.dataset.say);
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const d = el.dataset;
  switch (d.act) {
    case "start-daily": return startDaily();
    case "extra": return addExtra();
    case "go-grammar": return setTab("grammar");
    case "exit":
      if (!session || session.done || confirm("要離開練習嗎？\n已作答的進度都會保存。")) closeSession();
      return;
    case "close": return closeSession();
    case "learn-next": {
      const item = session.queue[session.pos];
      if (item.i < item.ids.length - 1) {
        item.i++;
        renderLearn(item);
      } else advance();
      return;
    }
    case "learn-prev": {
      const item = session.queue[session.pos];
      item.i = Math.max(0, item.i - 1);
      return renderLearn(item);
    }
    case "opt": return answerOption(+d.i);
    case "g-opt": return answerGrammar(+d.i);
    case "spell-submit": return submitSpell(false);
    case "hint": {
      const cur = session.cur;
      if (!cur || cur.answered) return;
      const letters = cur.q.w.w.replace(/[^a-z]/gi, "").length;
      if (cur.hint < letters - 1) cur.hint++;
      $("#mask").innerHTML = spellMask(cur.q.w.w, cur.hint);
      return;
    }
    case "dontknow": return giveUp();
    case "next": return advance();
    case "practice": return startPractice(d.level, d.topic);
    case "grammar-start": return startGrammar(d.topic);
    case "words-level":
      wordsView.level = +d.level;
      wordsView.topic = null;
      return render();
    case "words-topic":
      wordsView.topic = d.topic;
      wordsView.open = null;
      render();
      return window.scrollTo(0, 0);
    case "words-back":
      wordsView.topic = null;
      return render();
    case "open-word": {
      const opening = wordsView.open !== d.id;
      wordsView.open = opening ? d.id : null;
      const y = window.scrollY;
      render();
      window.scrollTo(0, y);
      if (opening && S.settings.autoSpeak) TTS.speak(DB.map[d.id].w);
      return;
    }
    case "col": return showColTip(+d.i);
    case "toggle-table":
      showTable = !showTable;
      return render();
    case "stats-level":
      statsLevel = d.level;
      return render();
    case "set-new":
      S.settings.newPerDay = +d.n;
      refreshDailyNew();
      save();
      toast(`每日新單字改為 ${d.n} 個`);
      return render();
    case "set-rate":
      S.settings.rate = +d.v;
      save();
      render();
      return TTS.speak("Good morning");
    case "set-theme":
      S.settings.theme = d.v;
      save();
      applyTheme();
      return render();
    case "export": return exportData();
    case "import": return $("#importFile").click();
    case "reset":
      if (!confirm("確定要清除所有學習紀錄嗎？")) return;
      if (!confirm("真的確定嗎？這個動作無法復原。\n（建議先匯出備份）")) return;
      S = Object.assign(defaultState(), { settings: S.settings });
      save();
      toast("已清除所有學習紀錄");
      return render();
  }
}
function onChange(e) {
  const t = e.target;
  if (t.id === "importFile") {
    if (t.files && t.files[0]) importData(t.files[0]);
    t.value = "";
    return;
  }
  const k = t.dataset.set;
  if (!k) return;
  if (k === "newLevel") {
    S.settings.newLevel = t.value === "all" ? "all" : +t.value;
    refreshDailyNew();
  } else if (k === "type") {
    S.settings.types[t.dataset.k] = t.checked;
    if (!TYPE_KEYS.some((x) => S.settings.types[x])) {
      S.settings.types[t.dataset.k] = true;
      t.checked = true;
      return toast("至少要保留一種題型");
    }
  } else if (k === "autoSpeak") S.settings.autoSpeak = t.checked;
  save();
  toast("設定已儲存");
}
function onInput(e) {
  if (e.target.dataset.input === "search") {
    wordsView.query = e.target.value;
    wordsView.open = null;
    const pos = e.target.selectionStart;
    render();
    const box = $(".search");
    box.focus();
    try { box.setSelectionRange(pos, pos); } catch (err) { /* ignore */ }
  }
}
function onKey(e) {
  if (!session || session.done) return;
  const cur = session.cur;
  const inInput = e.target && e.target.tagName === "INPUT";
  if (e.key === "Enter") {
    if (cur && cur.answered) {
      e.preventDefault();
      return advance();
    }
    if (inInput) {
      e.preventDefault();
      return submitSpell(false);
    }
    const item = session.queue[session.pos];
    if (item && item.k === "learn") {
      e.preventDefault();
      $('[data-act="learn-next"]').click();
    }
    return;
  }
  if (inInput || !cur || cur.answered) return;
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
  const i = map[e.key.toLowerCase()];
  if (i === undefined) return;
  if (cur.item.k === "g") answerGrammar(i);
  else if (cur.q && cur.q.options) answerOption(i);
}

/* ========== 啟動 ========== */
let started = false;
function startApp() {
  if (started) return;
  started = true;
  buildDB();
  if (DB.problems.length) console.warn("資料檢查發現問題：", DB.problems);
  load();
  applyTheme();
  TTS.init();
  document.addEventListener("click", onClick);
  document.addEventListener("change", onChange);
  document.addEventListener("input", onInput);
  document.addEventListener("keydown", onKey);
  // 跨日時（例如過了午夜再回到 App）重新整理今日任務
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !session && S.daily && S.daily.date !== today()) render();
  });
  render();
}
window.startApp = startApp;
