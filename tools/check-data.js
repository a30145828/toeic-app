#!/usr/bin/env node
/*
 * 資料檢查工具：檢查所有 words-levelN.js 與 grammar.js 的格式。
 * 使用方式（需安裝 Node.js）：在專案資料夾執行  node tools/check-data.js
 * 不想安裝 Node.js 的話，也可以直接在 App 的「設定 → 資料檢查」看結果。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const levels = [];
const sandbox = {
  addWordLevel: (data) => levels.push(data),
  addGrammarQuestions: (list) => { sandbox.grammar = list; },
  grammar: null,
  console,
};
vm.createContext(sandbox);

let n = 1;
while (fs.existsSync(path.join(root, `words-level${n}.js`))) {
  const file = `words-level${n}.js`;
  try {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  } catch (e) {
    console.error(`❌ ${file} 有語法錯誤：${e.message}`);
    process.exit(1);
  }
  n++;
}
vm.runInContext(fs.readFileSync(path.join(root, "grammar.js"), "utf8"), sandbox, { filename: "grammar.js" });

const TOPICS = ["office", "meeting", "hr", "travel", "restaurant", "shopping", "finance", "manufacturing", "marketing"];
const errors = [];
const seen = new Map();
let total = 0;

for (const lv of levels) {
  let count = 0;
  const perTopic = [];
  for (const [topic, words] of Object.entries(lv.topics || {})) {
    if (!TOPICS.includes(topic)) errors.push(`Level ${lv.level}: 未知主題「${topic}」`);
    perTopic.push(`${topic} ${words.length}`);
    words.forEach((w, i) => {
      const where = `Level ${lv.level} / ${topic} 第 ${i + 1} 個`;
      if (!Array.isArray(w) || w.length !== 6) {
        errors.push(`${where}：必須剛好 6 個欄位 → ${JSON.stringify(w)}`);
        return;
      }
      if (w.some((f) => typeof f !== "string" || !f.trim())) errors.push(`${where}（${w[0]}）：有空白欄位`);
      if (!/^[a-z][a-z\- ]*$/.test(w[0])) errors.push(`${where}：英文單字格式怪怪的「${w[0]}」`);
      if (!/^(n|v|adj|adv|prep|conj|pron)\.(\/(n|v|adj|adv|prep|conj|pron)\.)*$/.test(w[1])) errors.push(`${where}（${w[0]}）：詞性格式錯誤「${w[1]}」`);
      if (/[\[\]\/]/.test(w[3])) errors.push(`${where}（${w[0]}）：音標請不要加 [ ] 或 / /`);
      if (!/[.?!]["']?$/.test(w[4])) errors.push(`${where}（${w[0]}）：例句結尾缺少標點`);
      if (/[a-zA-Z]{3,}/.test(w[2])) errors.push(`${where}（${w[0]}）：中文意思裡有英文`);
      const key = w[0].toLowerCase();
      if (seen.has(key)) errors.push(`重複單字「${w[0]}」：${seen.get(key)} 和 ${where}`);
      else seen.set(key, where);
      count++;
    });
  }
  total += count;
  console.log(`Level ${lv.level}（${lv.name}）：${count} 個  [${perTopic.join(", ")}]`);
}
console.log(`單字總數：${total}`);

const g = sandbox.grammar || [];
const gTopics = {};
g.forEach((q, i) => {
  const where = `文法第 ${i + 1} 題`;
  gTopics[q.topic] = (gTopics[q.topic] || 0) + 1;
  if (!["詞性", "時態", "介系詞", "連接詞", "代名詞", "被動語態", "不定詞與動名詞", "比較級", "關係代名詞"].includes(q.topic)) errors.push(`${where}：主題錯誤「${q.topic}」`);
  if (!q.q || !q.q.includes("____")) errors.push(`${where}：題目要有 ____ 空格`);
  if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`${where}：要有 4 個選項`);
  else if (new Set(q.options).size !== 4) errors.push(`${where}：選項重複`);
  if (!(q.answer >= 0 && q.answer <= 3)) errors.push(`${where}：answer 必須是 0~3`);
  if (!q.explain) errors.push(`${where}：缺少中文解析`);
});
console.log(`文法題：${g.length} 題  ${JSON.stringify(gTopics)}`);

if (errors.length) {
  console.log(`\n❌ 發現 ${errors.length} 個問題：`);
  errors.forEach((e) => console.log("  - " + e));
  process.exit(1);
}
console.log("\n✅ 資料檢查通過，沒有發現問題！");
