/*
 * 文法練習題（多益 Part 5 風格，全部為原創題目）
 *
 * 每題格式：
 * {
 *   topic: "詞性" | "時態" | "介系詞" | "連接詞",
 *   q: "題目（空格用 ____ 表示）",
 *   options: ["選項A", "選項B", "選項C", "選項D"],
 *   answer: 正確選項的位置（0=A、1=B、2=C、3=D）,
 *   zh: "完整句子的中文翻譯",
 *   explain: "中文解析"
 * }
 */
addGrammarQuestions([
  // ===== 詞性 =====
  {
    topic: "詞性",
    q: "Ms. Tanaka spoke ____ about the new product at the meeting.",
    options: ["confident", "confidently", "confidence", "confide"],
    answer: 1,
    zh: "田中小姐在會議上很有自信地介紹新產品。",
    explain: "空格要修飾動詞 spoke（說），修飾動詞要用「副詞」。confidently（有自信地）是副詞；confident 是形容詞、confidence 是名詞、confide 是動詞。"
  },
  {
    topic: "詞性",
    q: "The ____ of the new factory will take about two years.",
    options: ["construct", "constructive", "construction", "constructed"],
    answer: 2,
    zh: "新工廠的興建大約需要兩年。",
    explain: "空格前面是冠詞 The，後面是介系詞 of，中間一定要放「名詞」。construction（建造）是名詞，名詞常見字尾有 -tion。"
  },
  {
    topic: "詞性",
    q: "All employees must wear ____ glasses in the factory.",
    options: ["protect", "protective", "protection", "protectively"],
    answer: 1,
    zh: "所有員工在工廠裡都必須戴護目鏡。",
    explain: "空格後面是名詞 glasses，用來形容名詞的是「形容詞」。protective（保護的）是形容詞，常見形容詞字尾有 -ive。"
  },
  {
    topic: "詞性",
    q: "Our sales team worked very ____ to meet the deadline.",
    options: ["hard", "hardly", "hardness", "hardest"],
    answer: 0,
    zh: "我們的業務團隊非常努力地工作，以趕上截止期限。",
    explain: "hard 本身就可以當副詞，意思是「努力地」，用來修飾 worked。要小心 hardly 的意思是「幾乎不」，意思完全不同！very 後面也不能接最高級 hardest。"
  },
  {
    topic: "詞性",
    q: "The hotel offers ____ rooms at reasonable prices.",
    options: ["comfort", "comfortable", "comfortably", "comforts"],
    answer: 1,
    zh: "這家飯店以合理的價格提供舒適的房間。",
    explain: "空格後面是名詞 rooms，所以要用「形容詞」來形容它。comfortable（舒適的）是形容詞，常見形容詞字尾有 -able。"
  },
  {
    topic: "詞性",
    q: "Please read the instructions ____ before you use the machine.",
    options: ["careful", "care", "carefully", "carefulness"],
    answer: 2,
    zh: "使用機器前請仔細閱讀說明。",
    explain: "空格修飾動詞 read（閱讀），要用「副詞」。carefully（仔細地）是副詞，副詞常見字尾是 -ly。"
  },
  {
    topic: "詞性",
    q: "Mr. Wang's ____ to the project was very important.",
    options: ["contribute", "contribution", "contributed", "contributing"],
    answer: 1,
    zh: "王先生對這個專案的貢獻非常重要。",
    explain: "空格前面是所有格 Mr. Wang's（王先生的），所有格後面要接「名詞」。contribution（貢獻）是名詞。"
  },
  {
    topic: "詞性",
    q: "The new software is ____ easy to use.",
    options: ["surprise", "surprising", "surprisingly", "surprised"],
    answer: 2,
    zh: "這個新軟體出乎意料地好用。",
    explain: "空格後面是形容詞 easy，用來修飾形容詞的是「副詞」。surprisingly（出乎意料地）是副詞。"
  },
  {
    topic: "詞性",
    q: "We need to ____ our customer service.",
    options: ["improvement", "improve", "improved", "improving"],
    answer: 1,
    zh: "我們需要改善我們的客戶服務。",
    explain: "need to 後面要接「原形動詞」。improve（改善）是原形動詞；improvement 是名詞，不能放在 to 後面當動詞用。"
  },
  {
    topic: "詞性",
    q: "The manager was very ____ with the results of the survey.",
    options: ["satisfy", "satisfying", "satisfied", "satisfaction"],
    answer: 2,
    zh: "經理對問卷調查的結果非常滿意。",
    explain: "描述「人」的感受要用 -ed 形容詞：satisfied（感到滿意的）。-ing 形容詞 satisfying 是形容「事物」令人滿意，例如 a satisfying result。"
  },
  {
    topic: "詞性",
    q: "Applicants should have some ____ in sales or marketing.",
    options: ["experience", "experienced", "experiencing", "experiential"],
    answer: 0,
    zh: "應徵者應該要有一些業務或行銷方面的經驗。",
    explain: "some（一些）後面要接「名詞」，而且是 have 的受詞。experience（經驗）在這裡是名詞。"
  },
  {
    topic: "詞性",
    q: "The company's profits increased ____ last year.",
    options: ["significant", "significance", "significantly", "signify"],
    answer: 2,
    zh: "公司的利潤去年大幅增加。",
    explain: "空格修飾動詞 increased（增加），要用「副詞」。significantly（大幅地、顯著地）是副詞。"
  },
  {
    topic: "詞性",
    q: "Ms. Lopez is one of the most ____ designers in our company.",
    options: ["create", "creative", "creatively", "creation"],
    answer: 1,
    zh: "羅培茲小姐是我們公司最有創意的設計師之一。",
    explain: "the most + 形容詞 + 名詞 是最高級的句型。空格後面是名詞 designers，所以要用形容詞 creative（有創意的）。"
  },

  // ===== 時態 =====
  {
    topic: "時態",
    q: "Mr. Kim ____ to Tokyo on business last week.",
    options: ["go", "goes", "went", "will go"],
    answer: 2,
    zh: "金先生上週去東京出差。",
    explain: "看到 last week（上週）表示動作發生在過去，要用「過去式」。go 的過去式是不規則變化 went。"
  },
  {
    topic: "時態",
    q: "The new branch ____ next month.",
    options: ["opened", "will open", "has opened", "was opening"],
    answer: 1,
    zh: "新分店將在下個月開幕。",
    explain: "看到 next month（下個月）表示未來，要用「未來式」will + 原形動詞。其他選項都是過去或完成的時態。"
  },
  {
    topic: "時態",
    q: "Ms. Chen ____ for this company since 2018.",
    options: ["works", "worked", "has worked", "will work"],
    answer: 2,
    zh: "陳小姐從 2018 年起就在這家公司工作。",
    explain: "since（自從…）表示從過去某個時間一直持續到現在，要用「現在完成式」have / has + 過去分詞。主詞是單數，所以用 has worked。"
  },
  {
    topic: "時態",
    q: "Right now, the technicians ____ the broken printer.",
    options: ["repair", "are repairing", "repaired", "have repaired"],
    answer: 1,
    zh: "技術人員現在正在修理壞掉的印表機。",
    explain: "Right now（現在、此刻）表示動作正在進行，要用「現在進行式」am / is / are + V-ing。主詞 technicians 是複數，所以用 are repairing。"
  },
  {
    topic: "時態",
    q: "Our team usually ____ a meeting every Monday morning.",
    options: ["have", "has", "having", "is had"],
    answer: 1,
    zh: "我們團隊通常每週一早上開會。",
    explain: "usually、every Monday 表示習慣或固定發生的事，要用「現在簡單式」。主詞 Our team 是單數（第三人稱單數），動詞要用 has。"
  },
  {
    topic: "時態",
    q: "By the time we arrived at the station, the train ____.",
    options: ["leaves", "has left", "had left", "will leave"],
    answer: 2,
    zh: "等我們到車站時，火車已經開走了。",
    explain: "兩件過去的事情中，「比較早」發生的要用「過去完成式」had + 過去分詞。火車先開走，我們後到，所以用 had left。"
  },
  {
    topic: "時態",
    q: "If it ____ tomorrow, the outdoor event will be canceled.",
    options: ["rains", "will rain", "rained", "raining"],
    answer: 0,
    zh: "如果明天下雨，戶外活動將會取消。",
    explain: "if（如果）引導的條件子句，就算講的是未來，也要用「現在式」代替未來式。主詞 it 是第三人稱單數，所以用 rains。"
  },
  {
    topic: "時態",
    q: "The report ____ by the accounting team yesterday.",
    options: ["finished", "was finished", "is finishing", "has finished"],
    answer: 1,
    zh: "這份報告昨天由會計團隊完成。",
    explain: "報告是「被」完成的，要用被動語態 be + 過去分詞；yesterday 表示過去，be 動詞用 was，所以是 was finished。"
  },
  {
    topic: "時態",
    q: "We ____ the contract two days ago.",
    options: ["sign", "have signed", "signed", "will sign"],
    answer: 2,
    zh: "我們兩天前簽了合約。",
    explain: "ago（…以前）表示過去某個明確的時間點，要用「過去式」signed。注意：有 ago 的句子不能用現在完成式。"
  },
  {
    topic: "時態",
    q: "I ____ you as soon as I get the results.",
    options: ["call", "called", "will call", "have called"],
    answer: 2,
    zh: "我一拿到結果就會打電話給你。",
    explain: "as soon as（一…就…）子句用現在式 get 表示未來；主要子句說的是未來會做的事，要用「未來式」will call。"
  },
  {
    topic: "時態",
    q: "When the manager came in, we ____ about the budget.",
    options: ["talk", "are talking", "were talking", "will talk"],
    answer: 2,
    zh: "經理進來的時候，我們正在討論預算。",
    explain: "過去某個時間點（經理進來時）「正在進行」的動作，要用「過去進行式」was / were + V-ing。主詞 we 用 were talking。"
  },
  {
    topic: "時態",
    q: "The company ____ three new products so far this year.",
    options: ["launches", "launched", "has launched", "will launch"],
    answer: 2,
    zh: "公司今年到目前為止已經推出了三項新產品。",
    explain: "so far（到目前為止）表示從過去到現在的累積結果，要用「現在完成式」。主詞 The company 是單數，用 has launched。"
  },
  {
    topic: "時態",
    q: "Mr. Lee ____ the office at six o'clock every day.",
    options: ["leave", "leaves", "leaving", "is left"],
    answer: 1,
    zh: "李先生每天六點離開辦公室。",
    explain: "every day（每天）表示習慣，要用「現在簡單式」。主詞 Mr. Lee 是第三人稱單數，動詞要加 s，所以是 leaves。"
  },

  // ===== 介系詞 =====
  {
    topic: "介系詞",
    q: "The meeting will start ____ 10 a.m.",
    options: ["in", "on", "at", "for"],
    answer: 2,
    zh: "會議將在上午十點開始。",
    explain: "幾點幾分這種「時刻」要用 at，例如 at 10 a.m.、at noon。"
  },
  {
    topic: "介系詞",
    q: "Our office is closed ____ Sundays.",
    options: ["in", "on", "at", "for"],
    answer: 1,
    zh: "我們的辦公室星期日不上班。",
    explain: "「星期幾」和「特定日期」要用 on，例如 on Sundays、on May 5。"
  },
  {
    topic: "介系詞",
    q: "The new product will be released ____ March.",
    options: ["in", "on", "at", "to"],
    answer: 0,
    zh: "新產品將在三月推出。",
    explain: "「月份、年份、季節」這種比較長的時間要用 in，例如 in March、in 2025、in summer。"
  },
  {
    topic: "介系詞",
    q: "Please submit your report ____ Friday.",
    options: ["by", "until", "since", "during"],
    answer: 0,
    zh: "請在星期五之前交報告。",
    explain: "by 表示「在某時間之前（截止期限）」完成；until 表示動作「一直持續到」某時間，例如 wait until Friday（一直等到週五）。交報告是期限，所以用 by。"
  },
  {
    topic: "介系詞",
    q: "The store will be closed ____ the holiday.",
    options: ["while", "during", "since", "among"],
    answer: 1,
    zh: "這家店在假期期間將停止營業。",
    explain: "during（在…期間）是介系詞，後面接名詞 the holiday。while 也是「在…期間」，但它是連接詞，後面要接完整句子（主詞＋動詞）。"
  },
  {
    topic: "介系詞",
    q: "Ms. Park has worked here ____ ten years.",
    options: ["since", "for", "at", "in"],
    answer: 1,
    zh: "朴小姐已經在這裡工作十年了。",
    explain: "for + 一段時間（ten years 十年）；since + 起始時間點（since 2015 自從 2015 年）。ten years 是一段時間，所以用 for。"
  },
  {
    topic: "介系詞",
    q: "The printer is ____ the copy machine and the window.",
    options: ["among", "between", "through", "across"],
    answer: 1,
    zh: "印表機在影印機和窗戶之間。",
    explain: "between A and B 表示「在 A 和 B 兩者之間」。among 用在「三者以上」之間。"
  },
  {
    topic: "介系詞",
    q: "We usually travel to the factory ____ train.",
    options: ["by", "on", "in", "with"],
    answer: 0,
    zh: "我們通常搭火車去工廠。",
    explain: "表示搭乘交通工具時用 by + 交通工具（中間不加 a 或 the），例如 by train、by bus、by car。"
  },
  {
    topic: "介系詞",
    q: "The manager is responsible ____ hiring new staff.",
    options: ["to", "of", "for", "with"],
    answer: 2,
    zh: "經理負責僱用新員工。",
    explain: "be responsible for（負責…）是固定用法，要整組記起來。for 後面接名詞或 V-ing，所以是 for hiring。"
  },
  {
    topic: "介系詞",
    q: "The hotel is located ____ the train station.",
    options: ["near", "between", "during", "among"],
    answer: 0,
    zh: "飯店位於火車站附近。",
    explain: "near（在…附近）後面接一個地點即可。between 需要兩個東西（A and B），among 需要三個以上，during 是用在時間。"
  },
  {
    topic: "介系詞",
    q: "____ the bad weather, the flight left on time.",
    options: ["Because of", "Despite", "Although", "Due to"],
    answer: 1,
    zh: "儘管天氣不好，班機仍準時起飛。",
    explain: "前後意思相反（天氣不好 ↔ 準時起飛），要用「儘管」。Despite 是介系詞，後面接名詞 the bad weather；Although 雖然也是「儘管」，但它是連接詞，後面要接句子。Because of、Due to 是「因為」，意思不對。"
  },
  {
    topic: "介系詞",
    q: "Please send the documents ____ Mr. Lin in the sales department.",
    options: ["at", "to", "of", "by"],
    answer: 1,
    zh: "請把文件寄給業務部的林先生。",
    explain: "send something to someone（把某物寄給某人）是常見用法，to 表示「給、到（某人）」。"
  },

  // ===== 連接詞 =====
  {
    topic: "連接詞",
    q: "I called Mr. Chen, ____ he did not answer.",
    options: ["and", "but", "or", "so"],
    answer: 1,
    zh: "我打電話給陳先生，但他沒有接。",
    explain: "前後意思相反（打了電話 ↔ 沒有接），要用表示「但是」的 but。"
  },
  {
    topic: "連接詞",
    q: "The shop was crowded, ____ we went to another one.",
    options: ["so", "but", "because", "although"],
    answer: 0,
    zh: "那家店很擠，所以我們去了另一家。",
    explain: "前面是原因（店很擠），後面是結果（去另一家），要用表示「所以」的 so。"
  },
  {
    topic: "連接詞",
    q: "Please call me ____ you arrive at the airport.",
    options: ["when", "but", "so", "or"],
    answer: 0,
    zh: "你到機場的時候請打電話給我。",
    explain: "when（當…的時候）用來表示時間。注意 when 子句講未來也用現在式（arrive）。"
  },
  {
    topic: "連接詞",
    q: "We canceled the picnic ____ it was raining.",
    options: ["because", "although", "so", "but"],
    answer: 0,
    zh: "因為正在下雨，我們取消了野餐。",
    explain: "後半句（正在下雨）是前半句（取消野餐）的原因，要用 because（因為）。"
  },
  {
    topic: "連接詞",
    q: "____ the restaurant is small, it is always busy.",
    options: ["Because", "Although", "So", "Unless"],
    answer: 1,
    zh: "雖然那家餐廳很小，但總是生意很好。",
    explain: "前後意思相反（店很小 ↔ 總是很忙），要用 Although（雖然）。注意：英文用了 although 就不能再加 but。"
  },
  {
    topic: "連接詞",
    q: "You can contact us by phone ____ by email.",
    options: ["or", "but", "so", "because"],
    answer: 0,
    zh: "您可以用電話或電子郵件聯絡我們。",
    explain: "表示「二選一」要用 or（或者）。電話或電子郵件都可以，選一種即可。"
  },
  {
    topic: "連接詞",
    q: "Both the manager ____ her assistant will attend the conference.",
    options: ["or", "and", "nor", "but"],
    answer: 1,
    zh: "經理和她的助理都會出席這場會議。",
    explain: "both A and B（A 和 B 兩者都）是固定搭配。看到 both 就要想到 and。"
  },
  {
    topic: "連接詞",
    q: "Either Mr. Lee ____ Ms. Wu will lead the training.",
    options: ["and", "or", "nor", "but"],
    answer: 1,
    zh: "李先生或吳小姐其中一人會帶領這次培訓。",
    explain: "either A or B（不是 A 就是 B）是固定搭配。看到 either 就要想到 or；neither 才搭配 nor。"
  },
  {
    topic: "連接詞",
    q: "Visitors cannot enter the lab ____ they wear a safety badge.",
    options: ["unless", "because", "so", "and"],
    answer: 0,
    zh: "除非訪客配戴安全識別證，否則不能進入實驗室。",
    explain: "unless（除非）= if not。意思是「沒戴識別證就不能進入」。"
  },
  {
    topic: "連接詞",
    q: "Please turn off the lights ____ you leave the office.",
    options: ["before", "unless", "although", "but"],
    answer: 0,
    zh: "離開辦公室之前請關燈。",
    explain: "before（在…之前）表示時間的先後：先關燈，再離開辦公室。"
  },
  {
    topic: "連接詞",
    q: "The new phone is not only cheap ____ also easy to use.",
    options: ["and", "but", "or", "so"],
    answer: 1,
    zh: "這支新手機不但便宜，而且好用。",
    explain: "not only A but also B（不但 A 而且 B）是固定搭配。看到 not only 就要想到 but also。"
  },
  {
    topic: "連接詞",
    q: "We will wait here ____ the bus comes.",
    options: ["until", "during", "because of", "despite"],
    answer: 0,
    zh: "我們會在這裡一直等到公車來。",
    explain: "until（直到…為止）在這裡當連接詞，後面接句子 the bus comes。during、because of、despite 都是介系詞，後面只能接名詞，不能接句子。"
  }
]);
