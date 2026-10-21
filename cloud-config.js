/*
 * 雲端同步設定（選用）
 *
 * 想用 Google 帳號登入、把學習紀錄同步到雲端，請先建立免費的 Firebase 專案，
 * 再把 Firebase 給你的設定貼到下面（步驟請看 README 的「雲端同步設定」）。
 *
 * 還沒設定的話保持空白即可，App 會只把紀錄存在這台裝置。
 *
 * 註：這些值會出現在網頁原始碼裡，這是正常的（Firebase 的 apiKey 不是密碼）。
 *     資料的安全是靠 Firestore 的「安全規則」保護，請務必照 README 設定規則。
 */
window.CLOUD_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: ""
};
