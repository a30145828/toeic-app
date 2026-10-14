/*
 * 文法練習題（多益 Part 5 風格，全部為原創題目）
 *
 * 每題格式：
 * {
 *   topic: "詞性" | "時態" | "介系詞" | "連接詞" | "代名詞" | "被動語態" | "不定詞與動名詞" | "比較級" | "關係代名詞",
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
  },

  // ===== 詞性（續） =====
  {
    topic: "詞性",
    q: "The new manager made several ____ changes to the schedule.",
    options: ["import", "important", "importantly", "importance"],
    answer: 1,
    zh: "新經理對時間表做了幾項重要的更動。",
    explain: "空格後面是名詞 changes，形容名詞要用「形容詞」important（重要的）。importance 是名詞、importantly 是副詞。"
  },
  {
    topic: "詞性",
    q: "Please send your ____ to the HR department by Friday.",
    options: ["application", "applicant", "applied", "apply"],
    answer: 0,
    zh: "請在週五前把你的申請書寄到人資部。",
    explain: "所有格 your 後面要接名詞。applicant 雖然也是名詞，但意思是「應徵者（人）」，人不能被「寄出」，所以要用 application（申請書）。"
  },
  {
    topic: "詞性",
    q: "The factory has ____ increased its production this year.",
    options: ["steadiness", "steadily", "steady", "steadied"],
    answer: 1,
    zh: "這間工廠今年穩定地提高了產量。",
    explain: "空格在 has 和 increased 之間，用來修飾動詞 increased，要用「副詞」steadily（穩定地）。"
  },
  {
    topic: "詞性",
    q: "Our customers are very ____ with the new service.",
    options: ["pleasure", "pleased", "please", "pleasing"],
    answer: 1,
    zh: "我們的顧客對新服務非常滿意。",
    explain: "描述「人」的感受要用 -ed 形容詞：pleased（感到高興、滿意的）。pleasing 是形容「事物」令人愉快。"
  },
  {
    topic: "詞性",
    q: "The ____ will announce the winners tomorrow.",
    options: ["organized", "organizing", "organize", "organizers"],
    answer: 3,
    zh: "主辦單位明天將公布得獎者。",
    explain: "冠詞 The 後面要接名詞當主詞。organizers（主辦者）是名詞，常見表示「人」的字尾有 -er、-or。"
  },
  {
    topic: "詞性",
    q: "Mr. Park is ____ for checking all the invoices.",
    options: ["responsible", "responsibly", "responsibility", "response"],
    answer: 0,
    zh: "朴先生負責核對所有的請款單。",
    explain: "be 動詞 is 後面要接形容詞，而且 be responsible for（負責…）是固定用法。"
  },
  {
    topic: "詞性",
    q: "She answered all of the customer's questions ____.",
    options: ["politeness", "politely", "polite", "more polite"],
    answer: 1,
    zh: "她很有禮貌地回答了顧客所有的問題。",
    explain: "句子已經完整（主詞＋動詞＋受詞），最後的空格用來修飾動詞 answered，要用副詞 politely（有禮貌地）。"
  },
  {
    topic: "詞性",
    q: "We received many ____ about the slow delivery.",
    options: ["complaining", "complained", "complain", "complaints"],
    answer: 3,
    zh: "我們收到很多關於送貨太慢的投訴。",
    explain: "many（很多）後面要接「複數名詞」。complaints 是 complaint（投訴）的複數；complain 是動詞。"
  },
  {
    topic: "詞性",
    q: "The hotel staff were extremely ____.",
    options: ["helpfully", "helpful", "helps", "help"],
    answer: 1,
    zh: "飯店員工非常樂於助人。",
    explain: "副詞 extremely（非常）後面接形容詞。helpful（樂於助人的）是形容詞，常見形容詞字尾有 -ful。"
  },
  {
    topic: "詞性",
    q: "It is ____ to book your flight early during the holidays.",
    options: ["advice", "advise", "advisably", "advisable"],
    answer: 3,
    zh: "假期期間建議提早訂機票。",
    explain: "It is + 形容詞 + to V 是常見句型。advisable（明智的、可取的）是形容詞；advise 是動詞、advice 是名詞。"
  },
  {
    topic: "詞性",
    q: "The ____ of the new software took three hours.",
    options: ["installation", "installed", "installs", "install"],
    answer: 0,
    zh: "新軟體的安裝花了三個小時。",
    explain: "The ____ of… 的空格要放名詞。installation（安裝）是名詞，-tion 是常見的名詞字尾。"
  },
  {
    topic: "詞性",
    q: "Our sales team performed ____ well last quarter.",
    options: ["exceptionally", "exception", "exceptional", "except"],
    answer: 0,
    zh: "我們的業務團隊上一季表現得特別好。",
    explain: "空格後面是副詞 well，用來修飾副詞的也要是「副詞」：exceptionally（特別地）。"
  },
  {
    topic: "詞性",
    q: "The report was written ____ and clearly.",
    options: ["simplicity", "simplify", "simply", "simple"],
    answer: 2,
    zh: "這份報告寫得簡單又清楚。",
    explain: "and 連接兩個相同詞性的字。後面的 clearly 是副詞，所以空格也要用副詞 simply（簡單地）。"
  },
  {
    topic: "詞性",
    q: "There is a ____ demand for electric cars.",
    options: ["grows", "growing", "grow", "growth"],
    answer: 1,
    zh: "電動車的需求日益增加。",
    explain: "冠詞 a 和名詞 demand 之間要放形容詞。V-ing 形式 growing 可以當形容詞，意思是「日益增加的」。"
  },
  {
    topic: "詞性",
    q: "Ms. Kim gave a very ____ presentation about the market.",
    options: ["information", "informatively", "inform", "informative"],
    answer: 3,
    zh: "金小姐做了一場關於市場、內容非常豐富的簡報。",
    explain: "very 後面、名詞 presentation 前面要用形容詞。informative（提供資訊的、內容豐富的）是形容詞，-ive 是常見形容詞字尾。"
  },
  {
    topic: "詞性",
    q: "All ____ for the job must speak English.",
    options: ["applied", "applicants", "apply", "applications"],
    answer: 1,
    zh: "這份工作的所有應徵者都必須會說英文。",
    explain: "會「說英文」的一定是人，所以要用 applicants（應徵者）。applications 是申請書，不會說話。"
  },
  {
    topic: "詞性",
    q: "The new office is ____ large and bright.",
    options: ["extremely", "extreme", "extremity", "extremes"],
    answer: 0,
    zh: "新辦公室非常寬敞明亮。",
    explain: "空格後面是形容詞 large，修飾形容詞要用副詞 extremely（非常、極度地）。"
  },

  // ===== 時態（續） =====
  {
    topic: "時態",
    q: "The first train ____ at 6:30 every morning.",
    options: ["leaving", "leaves", "leave", "left"],
    answer: 1,
    zh: "首班火車每天早上六點半發車。",
    explain: "every morning 表示固定的時刻表或習慣，要用「現在簡單式」。主詞 The first train 是單數，動詞要加 s。"
  },
  {
    topic: "時態",
    q: "Next Monday, Mr. Chen ____ a training session for new staff.",
    options: ["will lead", "has led", "lead", "led"],
    answer: 0,
    zh: "下週一，陳先生將為新進員工主持一場培訓課程。",
    explain: "Next Monday（下週一）是未來的時間，要用「未來式」will + 原形動詞。"
  },
  {
    topic: "時態",
    q: "I ____ the sales report yet.",
    options: ["haven't finished", "won't finish", "don't finish", "didn't finish"],
    answer: 0,
    zh: "我還沒完成業績報告。",
    explain: "句尾的 yet（還沒）通常搭配「現在完成式」的否定句：haven't + 過去分詞。"
  },
  {
    topic: "時態",
    q: "Ms. Wang ____ the client yesterday afternoon.",
    options: ["has called", "calls", "will call", "called"],
    answer: 3,
    zh: "王小姐昨天下午打了電話給那位客戶。",
    explain: "yesterday afternoon（昨天下午）是過去明確的時間點，要用「過去式」called。"
  },
  {
    topic: "時態",
    q: "Please be quiet. The manager ____ on the phone.",
    options: ["talked", "talks", "has talked", "is talking"],
    answer: 3,
    zh: "請安靜，經理正在講電話。",
    explain: "請大家「現在」安靜，表示經理此刻正在講電話，要用「現在進行式」is + V-ing。"
  },
  {
    topic: "時態",
    q: "Our company ____ its first store in 1995.",
    options: ["opens", "opened", "will open", "has opened"],
    answer: 1,
    zh: "我們公司在 1995 年開了第一家店。",
    explain: "in 1995 是過去明確的年份，要用「過去式」opened。有明確過去時間時，不能用現在完成式。"
  },
  {
    topic: "時態",
    q: "By the end of next year, the factory ____ 10,000 cars.",
    options: ["has produced", "produces", "produced", "will have produced"],
    answer: 3,
    zh: "到明年年底，這間工廠將會生產一萬輛車。",
    explain: "By + 未來時間（到明年年底為止）表示「到那時會已經完成」，要用「未來完成式」will have + 過去分詞。"
  },
  {
    topic: "時態",
    q: "While I ____ lunch, my boss called me.",
    options: ["have eaten", "was eating", "eat", "ate"],
    answer: 1,
    zh: "我正在吃午餐的時候，老闆打電話給我。",
    explain: "while（當…的時候）表示過去「正在進行」的動作，被另一個動作（打電話）打斷，要用「過去進行式」was + V-ing。"
  },
  {
    topic: "時態",
    q: "Ms. Tanaka ____ to Korea three times.",
    options: ["has been", "is", "will be", "goes"],
    answer: 0,
    zh: "田中小姐去過韓國三次。",
    explain: "three times（三次）表示「到目前為止的經驗」，要用「現在完成式」has been（去過）。"
  },
  {
    topic: "時態",
    q: "If the weather ____ good tomorrow, we will have the party outside.",
    options: ["is", "will be", "be", "was"],
    answer: 0,
    zh: "如果明天天氣好，我們會在戶外辦派對。",
    explain: "if 條件子句即使講未來，也用「現在式」代替未來式。主詞 the weather 是單數，用 is。"
  },
  {
    topic: "時態",
    q: "When I arrived, the meeting ____ already started.",
    options: ["have", "had", "was", "has"],
    answer: 1,
    zh: "我到的時候，會議已經開始了。",
    explain: "會議開始比「我到達」更早發生，兩件都是過去的事，較早的那件用「過去完成式」had + 過去分詞。"
  },
  {
    topic: "時態",
    q: "We ____ the new system for two months now.",
    options: ["use", "have been using", "will use", "used"],
    answer: 1,
    zh: "我們使用這套新系統到現在已經兩個月了。",
    explain: "for two months now 表示從過去一直持續到現在、而且還在進行，要用「現在完成進行式」have been + V-ing。"
  },
  {
    topic: "時態",
    q: "Mr. Kim usually ____ to work, but today he is taking a taxi.",
    options: ["walks", "walked", "is walking", "walk"],
    answer: 0,
    zh: "金先生平常走路上班，但今天他搭計程車。",
    explain: "usually（通常）表示習慣，要用「現在簡單式」。主詞 Mr. Kim 是第三人稱單數，所以是 walks。"
  },
  {
    topic: "時態",
    q: "Prices ____ next month because of higher costs.",
    options: ["have risen", "will rise", "rise", "rose"],
    answer: 1,
    zh: "因為成本提高，下個月價格將會上漲。",
    explain: "next month（下個月）是未來，要用「未來式」will + 原形動詞。"
  },
  {
    topic: "時態",
    q: "Last week, the company ____ a new advertising campaign.",
    options: ["launched", "will launch", "is launching", "launches"],
    answer: 0,
    zh: "上週公司推出了新的廣告活動。",
    explain: "Last week（上週）是過去的時間，要用「過去式」launched。"
  },
  {
    topic: "時態",
    q: "I will call you after I ____ the meeting.",
    options: ["finishing", "finished", "finish", "will finish"],
    answer: 2,
    zh: "我開完會後會打電話給你。",
    explain: "after、before、when、as soon as 這類「時間」子句，講未來時要用「現在式」代替未來式，所以用 finish。"
  },
  {
    topic: "時態",
    q: "Sales ____ by 20% since we opened the online store.",
    options: ["increased", "have increased", "increase", "will increase"],
    answer: 1,
    zh: "自從我們開了網路商店，業績已經成長了 20%。",
    explain: "since（自從）表示從過去某時一直到現在，要用「現在完成式」have + 過去分詞。"
  },

  // ===== 介系詞（續） =====
  {
    topic: "介系詞",
    q: "The office is closed ____ Christmas Day.",
    options: ["in", "at", "by", "on"],
    answer: 3,
    zh: "辦公室在聖誕節當天不上班。",
    explain: "「特定的某一天」（節日當天、星期幾、日期）要用 on。"
  },
  {
    topic: "介系詞",
    q: "The seminar will be held ____ the third floor.",
    options: ["in", "to", "on", "at"],
    answer: 2,
    zh: "研討會將在三樓舉行。",
    explain: "「在第幾樓」要用 on，例如 on the third floor。"
  },
  {
    topic: "介系詞",
    q: "Mr. Ito will arrive ____ the airport at noon.",
    options: ["to", "at", "for", "on"],
    answer: 1,
    zh: "伊藤先生將在中午抵達機場。",
    explain: "arrive at + 地點（機場、車站等小地點）；arrive in + 城市或國家。注意 arrive 後面不能接 to。"
  },
  {
    topic: "介系詞",
    q: "We have worked with this supplier ____ 2015.",
    options: ["for", "at", "since", "during"],
    answer: 2,
    zh: "我們從 2015 年起就和這家供應商合作。",
    explain: "2015 是一個「起始時間點」，搭配現在完成式要用 since（自從）。for 後面要接一段時間，例如 for ten years。"
  },
  {
    topic: "介系詞",
    q: "The documents are ____ the top drawer.",
    options: ["over", "on", "in", "at"],
    answer: 2,
    zh: "文件在最上面的抽屜裡。",
    explain: "在抽屜、箱子、房間「裡面」要用 in。"
  },
  {
    topic: "介系詞",
    q: "The bus stop is right ____ the hotel.",
    options: ["during", "among", "between", "in front of"],
    answer: 3,
    zh: "公車站就在飯店的正前方。",
    explain: "in front of 是「在…前面」。between 需要兩個東西（A and B），among 需要三個以上，during 是用在時間。"
  },
  {
    topic: "介系詞",
    q: "The store is open ____ 10 p.m. on weekdays.",
    options: ["by", "until", "during", "since"],
    answer: 1,
    zh: "這家店平日營業到晚上十點。",
    explain: "until 表示動作或狀態「一直持續到」某個時間。營業是一直持續的狀態，所以用 until；by 是「最晚在…之前完成」。"
  },
  {
    topic: "介系詞",
    q: "____ the meeting, please turn off your phone.",
    options: ["Since", "During", "While", "Between"],
    answer: 1,
    zh: "開會期間請把手機關機。",
    explain: "During（在…期間）是介系詞，後面接名詞 the meeting。While 是連接詞，後面要接句子。"
  },
  {
    topic: "介系詞",
    q: "We will deliver your order ____ three days.",
    options: ["within", "since", "at", "on"],
    answer: 0,
    zh: "我們會在三天內送達您的訂單。",
    explain: "within + 一段時間 表示「在…之內」，是多益很常見的用法。"
  },
  {
    topic: "介系詞",
    q: "This product is very popular ____ young people.",
    options: ["of", "at", "by", "with"],
    answer: 3,
    zh: "這項產品很受年輕人歡迎。",
    explain: "be popular with + 人，表示「受某人歡迎」，是固定搭配。"
  },
  {
    topic: "介系詞",
    q: "Thank you ____ your quick reply.",
    options: ["about", "with", "for", "to"],
    answer: 2,
    zh: "謝謝你迅速的回覆。",
    explain: "thank you for + 名詞或 V-ing，表示「因為…而感謝」。"
  },
  {
    topic: "介系詞",
    q: "The manager is interested ____ your idea.",
    options: ["on", "at", "in", "for"],
    answer: 2,
    zh: "經理對你的想法很有興趣。",
    explain: "be interested in（對…有興趣）是固定搭配，要整組記起來。"
  },
  {
    topic: "介系詞",
    q: "Please reply ____ this email by Friday.",
    options: ["to", "for", "with", "at"],
    answer: 0,
    zh: "請在週五前回覆這封郵件。",
    explain: "reply to + 某人或某事，表示「回覆…」。"
  },
  {
    topic: "介系詞",
    q: "The final price depends ____ the size of the order.",
    options: ["on", "for", "in", "at"],
    answer: 0,
    zh: "最終價格取決於訂單的數量。",
    explain: "depend on（取決於、依賴）是固定搭配。"
  },
  {
    topic: "介系詞",
    q: "Our new product is quite different ____ the old model.",
    options: ["of", "than", "from", "with"],
    answer: 2,
    zh: "我們的新產品和舊款相當不同。",
    explain: "be different from（和…不同）是固定搭配。注意 than 是用在比較級後面，例如 better than。"
  },
  {
    topic: "介系詞",
    q: "Ms. Diaz is ____ charge of the sales team.",
    options: ["on", "at", "in", "for"],
    answer: 2,
    zh: "迪亞茲小姐負責管理業務團隊。",
    explain: "in charge of（負責、主管…）是固定用法。"
  },
  {
    topic: "介系詞",
    q: "The company was founded ____ 2010.",
    options: ["to", "at", "on", "in"],
    answer: 3,
    zh: "這家公司成立於 2010 年。",
    explain: "年份要用 in，例如 in 2010。"
  },
  {
    topic: "介系詞",
    q: "Employees must apply ____ vacation two weeks in advance.",
    options: ["at", "on", "for", "to"],
    answer: 2,
    zh: "員工必須在兩週前申請休假。",
    explain: "apply for + 想得到的東西（工作、休假、貸款），表示「申請…」；apply to 後面接的是申請的對象，例如公司或學校。"
  },

  // ===== 連接詞（續） =====
  {
    topic: "連接詞",
    q: "The task was very difficult, ____ we finished it on time.",
    options: ["because", "but", "so", "or"],
    answer: 1,
    zh: "這項任務非常困難，但我們還是準時完成了。",
    explain: "前後意思相反（很困難 ↔ 仍然準時完成），要用 but（但是）。"
  },
  {
    topic: "連接詞",
    q: "We cannot start the meeting ____ the manager arrives.",
    options: ["because", "so", "until", "although"],
    answer: 2,
    zh: "經理到之前，我們不能開始開會。",
    explain: "not … until（直到…才）是常見句型：直到經理到了，會議才能開始。"
  },
  {
    topic: "連接詞",
    q: "____ it was raining, the event was held outdoors.",
    options: ["Although", "If", "Because", "So"],
    answer: 0,
    zh: "雖然在下雨，活動仍在戶外舉行。",
    explain: "前後意思相反（下雨 ↔ 仍在戶外），要用 Although（雖然）。"
  },
  {
    topic: "連接詞",
    q: "The flight was delayed ____ the snow.",
    options: ["because", "although", "so", "because of"],
    answer: 3,
    zh: "班機因為下雪而延誤。",
    explain: "空格後面只有名詞 the snow，沒有動詞，所以要用介系詞片語 because of。because 是連接詞，後面要接完整句子。"
  },
  {
    topic: "連接詞",
    q: "Neither the manager ____ his assistant was at the meeting.",
    options: ["and", "but", "nor", "or"],
    answer: 2,
    zh: "經理和他的助理都沒有出席會議。",
    explain: "neither A nor B（A 和 B 都不）是固定搭配。看到 neither 就要想到 nor。"
  },
  {
    topic: "連接詞",
    q: "Please call me ____ you have any questions.",
    options: ["unless", "if", "although", "so"],
    answer: 1,
    zh: "如果有任何問題請打電話給我。",
    explain: "if（如果）表示條件：有問題的話就打給我。"
  },
  {
    topic: "連接詞",
    q: "The store will close early today ____ it is a holiday.",
    options: ["unless", "although", "or", "because"],
    answer: 3,
    zh: "因為今天是假日，商店會提早打烊。",
    explain: "「今天是假日」是「提早打烊」的原因，要用 because（因為）。"
  },
  {
    topic: "連接詞",
    q: "____ you finish the report, please send it to me.",
    options: ["Despite", "Although", "Unless", "As soon as"],
    answer: 3,
    zh: "你一完成報告，就請寄給我。",
    explain: "As soon as（一…就…）表示時間，後面接句子。Despite 是介系詞，不能接句子。"
  },
  {
    topic: "連接詞",
    q: "He prepared carefully, ____ the presentation went very well.",
    options: ["so", "although", "or", "but"],
    answer: 0,
    zh: "他準備得很仔細，所以簡報非常順利。",
    explain: "前面是原因（準備仔細），後面是結果（簡報順利），要用 so（所以）。"
  },
  {
    topic: "連接詞",
    q: "I will attend the conference ____ my boss says no.",
    options: ["unless", "so", "because", "if"],
    answer: 0,
    zh: "除非老闆不同意，否則我會參加會議。",
    explain: "unless（除非）= if not。意思是「如果老闆沒說不行，我就會去」。"
  },
  {
    topic: "連接詞",
    q: "The company hired more workers ____ it could finish the order on time.",
    options: ["because", "so that", "although", "unless"],
    answer: 1,
    zh: "公司僱用了更多工人，以便準時完成訂單。",
    explain: "so that（以便、為了）表示目的，後面常接 can / could。"
  },
  {
    topic: "連接詞",
    q: "____ the price is high, many customers buy this product.",
    options: ["Even though", "So", "Unless", "Because"],
    answer: 0,
    zh: "即使價格很高，還是有很多顧客購買這項產品。",
    explain: "前後意思相反（價格高 ↔ 很多人買），要用 Even though（即使、雖然）。"
  },
  {
    topic: "連接詞",
    q: "We will hold the event ____ the weather is good or bad.",
    options: ["whether", "if", "because", "unless"],
    answer: 0,
    zh: "不論天氣好壞，我們都會舉辦這場活動。",
    explain: "whether A or B（不論是 A 還是 B）是固定搭配。"
  },
  {
    topic: "連接詞",
    q: "____ she joined the company, she has been promoted twice.",
    options: ["Unless", "Since", "When", "Until"],
    answer: 1,
    zh: "自從她進公司以來，已經升遷兩次了。",
    explain: "主要子句是現在完成式（has been promoted），表示「從某時到現在」，要搭配 Since（自從）。"
  },
  {
    topic: "連接詞",
    q: "The meeting started ____ everyone arrived.",
    options: ["during", "because of", "after", "despite"],
    answer: 2,
    zh: "大家都到了之後，會議才開始。",
    explain: "空格後面是完整句子 everyone arrived，要用連接詞 after（在…之後）。during、despite、because of 都是介系詞，後面只能接名詞。"
  },
  {
    topic: "連接詞",
    q: "____ the CEO was speaking, everyone listened carefully.",
    options: ["During", "While", "Unless", "Despite"],
    answer: 1,
    zh: "執行長講話的時候，大家都仔細聆聽。",
    explain: "空格後面是句子（the CEO was speaking），要用連接詞 While（當…的時候）。During 是介系詞，後面只能接名詞。"
  },
  {
    topic: "連接詞",
    q: "The order was small; ____, we delivered it for free.",
    options: ["although", "because", "however", "but"],
    answer: 2,
    zh: "那筆訂單很小，不過我們還是免費送貨了。",
    explain: "分號（;）後面加逗號的位置要用「轉折副詞」however（然而）。but、although、because 是連接詞，不能放在「; ____ ,」這種位置。"
  },
  {
    topic: "連接詞",
    q: "Customers can pay ____ in cash or by credit card.",
    options: ["whether", "both", "either", "neither"],
    answer: 2,
    zh: "顧客可以用現金或信用卡付款。",
    explain: "either A or B（A 或 B 其中一個）是固定搭配。both 要搭配 and，neither 要搭配 nor。"
  },

  // ===== 代名詞 =====
  {
    topic: "代名詞",
    q: "Ms. Chen asked ____ assistant to book a hotel room.",
    options: ["she", "her", "hers", "herself"],
    answer: 1,
    zh: "陳小姐請她的助理預訂飯店房間。",
    explain: "空格後面是名詞 assistant，要用「所有格」her（她的）來修飾名詞。"
  },
  {
    topic: "代名詞",
    q: "This is not my umbrella. It is ____.",
    options: ["your", "you", "yourself", "yours"],
    answer: 3,
    zh: "這不是我的雨傘，是你的。",
    explain: "空格後面沒有名詞，要用「所有格代名詞」yours（你的東西）= your umbrella。"
  },
  {
    topic: "代名詞",
    q: "Mr. Lee prepared the whole presentation by ____.",
    options: ["himself", "his", "him", "he"],
    answer: 0,
    zh: "李先生獨自準備了整份簡報。",
    explain: "by oneself 表示「獨自、靠自己」。主詞是 Mr. Lee，所以用反身代名詞 himself。"
  },
  {
    topic: "代名詞",
    q: "Please give ____ the report when you finish it.",
    options: ["me", "my", "I", "mine"],
    answer: 0,
    zh: "你完成報告後請交給我。",
    explain: "空格在動詞 give 後面，是「受詞」位置，要用受格 me。"
  },
  {
    topic: "代名詞",
    q: "The company changed ____ logo last year.",
    options: ["itself", "it's", "its", "it"],
    answer: 2,
    zh: "這家公司去年更換了它的標誌。",
    explain: "空格後面是名詞 logo，要用所有格 its（它的）。注意 it's 是 it is 的縮寫，不是所有格。"
  },
  {
    topic: "代名詞",
    q: "Our team members always help ____ during the busy season.",
    options: ["other", "every other", "each other", "another"],
    answer: 2,
    zh: "我們的團隊成員在旺季時總是互相幫忙。",
    explain: "each other 表示「彼此、互相」，放在動詞 help 後面當受詞。"
  },
  {
    topic: "代名詞",
    q: "____ of the two plans is good, so we need a new one.",
    options: ["Neither", "Both", "Either", "All"],
    answer: 0,
    zh: "兩個計畫都不好，所以我們需要一個新的。",
    explain: "「兩者都不」要用 Neither。後面說「需要新計畫」，表示兩個都不行。Both 後面的動詞要用複數 are，All 用在三者以上。"
  },
  {
    topic: "代名詞",
    q: "If you need more paper, there is ____ in the cabinet.",
    options: ["few", "many", "any", "some"],
    answer: 3,
    zh: "如果你需要更多紙，櫃子裡還有一些。",
    explain: "肯定句中表示「一些」要用 some；any 多用在否定句和疑問句。paper（紙）是不可數名詞，不能用 many 或 few。"
  },
  {
    topic: "代名詞",
    q: "The new employees introduced ____ at the start of the meeting.",
    options: ["theirs", "their", "themselves", "them"],
    answer: 2,
    zh: "新進員工在會議一開始做了自我介紹。",
    explain: "主詞和受詞是同一群人（新員工介紹「自己」），要用反身代名詞 themselves。"
  },
  {
    topic: "代名詞",
    q: "We sent invitations to all of ____ clients.",
    options: ["we", "ours", "our", "us"],
    answer: 2,
    zh: "我們寄了邀請函給所有的客戶。",
    explain: "空格後面是名詞 clients，要用所有格 our（我們的）。"
  },
  {
    topic: "代名詞",
    q: "Mr. Tanaka and I will visit the factory. ____ will leave at 9 a.m.",
    options: ["Us", "We", "Ours", "Our"],
    answer: 1,
    zh: "田中先生和我要去參觀工廠，我們會在早上九點出發。",
    explain: "空格是句子的主詞，要用主格 We。"
  },
  {
    topic: "代名詞",
    q: "This phone is cheaper than ____ we sold last year.",
    options: ["the one", "these", "them", "it"],
    answer: 0,
    zh: "這支手機比我們去年賣的那支便宜。",
    explain: "the one 用來代替前面提過的「同類單數名詞」（phone），避免重複。這裡指「去年賣的那一支手機」。"
  },
  {
    topic: "代名詞",
    q: "Could you lend me a pen? I forgot ____.",
    options: ["myself", "mine", "my", "me"],
    answer: 1,
    zh: "你可以借我一支筆嗎？我忘了帶我的。",
    explain: "空格後面沒有名詞，要用所有格代名詞 mine（我的東西）= my pen。"
  },
  {
    topic: "代名詞",
    q: "The client called this morning, but I didn't talk to ____.",
    options: ["her", "she", "hers", "herself"],
    answer: 0,
    zh: "那位客戶今天早上打電話來，但我沒有跟她說到話。",
    explain: "介系詞 to 後面要接受格，所以用 her。"
  },
  {
    topic: "代名詞",
    q: "Ms. Park and ____ will attend the conference in Seoul.",
    options: ["I", "mine", "my", "me"],
    answer: 0,
    zh: "朴小姐和我將出席首爾的會議。",
    explain: "Ms. Park and ____ 一起當句子的主詞，要用主格 I。"
  },
  {
    topic: "代名詞",
    q: "We have two printers. One is new, and ____ is old.",
    options: ["other", "others", "another", "the other"],
    answer: 3,
    zh: "我們有兩台印表機，一台是新的，另一台是舊的。",
    explain: "只有兩個東西時，一個用 one，另一個用 the other。another 用在三個以上的「再另一個」。"
  },

  // ===== 被動語態 =====
  {
    topic: "被動語態",
    q: "The meeting room ____ every evening.",
    options: ["is cleaned", "has cleaned", "cleans", "cleaning"],
    answer: 0,
    zh: "會議室每天晚上都會被打掃。",
    explain: "房間不會自己打掃，是「被」打掃，要用被動語態 be + 過去分詞；every evening 是習慣，用現在式 is cleaned。"
  },
  {
    topic: "被動語態",
    q: "All orders ____ within three days.",
    options: ["ship", "are shipped", "have shipped", "shipping"],
    answer: 1,
    zh: "所有訂單都會在三天內出貨。",
    explain: "訂單是「被」寄出的，要用被動語態 are + 過去分詞 shipped。"
  },
  {
    topic: "被動語態",
    q: "The report ____ by Ms. Lin last week.",
    options: ["wrote", "writes", "is writing", "was written"],
    answer: 3,
    zh: "這份報告是林小姐上週寫的。",
    explain: "看到 by + 人（由某人），通常是被動語態。last week 是過去，所以用 was written。"
  },
  {
    topic: "被動語態",
    q: "Our company ____ in 1998.",
    options: ["founded", "was founded", "founds", "has founded"],
    answer: 1,
    zh: "我們公司成立於 1998 年。",
    explain: "公司是「被創立」的，要用被動語態；in 1998 是過去，所以用 was founded。"
  },
  {
    topic: "被動語態",
    q: "The machines ____ every month by our technicians.",
    options: ["check", "checking", "checked", "are checked"],
    answer: 3,
    zh: "機器每個月都由我們的技術人員檢查。",
    explain: "機器是「被」檢查的，by our technicians 表示由誰檢查。被動語態要有 be 動詞：are checked。"
  },
  {
    topic: "被動語態",
    q: "The contest winners ____ next Friday.",
    options: ["will be announced", "are announcing", "will announce", "announce"],
    answer: 0,
    zh: "比賽得獎者將於下週五公布。",
    explain: "得獎者是「被公布」的，要用被動；next Friday 是未來，所以用未來式被動 will be + 過去分詞。"
  },
  {
    topic: "被動語態",
    q: "Smoking is not ____ anywhere in the building.",
    options: ["allowed", "allow", "allowing", "allows"],
    answer: 0,
    zh: "整棟大樓內都不允許吸菸。",
    explain: "is not ____ 是被動語態，be 動詞後面要接過去分詞 allowed（被允許）。"
  },
  {
    topic: "被動語態",
    q: "The package has already ____.",
    options: ["be delivered", "been delivered", "delivered", "delivering"],
    answer: 1,
    zh: "包裹已經送達了。",
    explain: "包裹是「被」送達的，現在完成式的被動語態是 has been + 過去分詞。"
  },
  {
    topic: "被動語態",
    q: "This product ____ in Japan.",
    options: ["is made", "making", "makes", "made"],
    answer: 0,
    zh: "這項產品是日本製造的。",
    explain: "產品是「被製造」的，要用被動 is + made。單獨的 made 前面少了 be 動詞。"
  },
  {
    topic: "被動語態",
    q: "The new rules ____ to all staff yesterday.",
    options: ["explain", "were explained", "explained", "are explaining"],
    answer: 1,
    zh: "新規定昨天已向全體員工說明。",
    explain: "規定是「被說明」的，要用被動；yesterday 是過去、主詞 rules 是複數，所以是 were explained。"
  },
  {
    topic: "被動語態",
    q: "The conference room must ____ before 9 a.m.",
    options: ["book", "booked", "booking", "be booked"],
    answer: 3,
    zh: "會議室必須在上午九點前預訂。",
    explain: "助動詞 must 後面接原形動詞；被動語態的原形是 be + 過去分詞，所以是 must be booked。"
  },
  {
    topic: "被動語態",
    q: "The flight ____ because of the storm.",
    options: ["was canceled", "is canceling", "cancels", "canceled"],
    answer: 0,
    zh: "班機因為暴風雨而被取消了。",
    explain: "班機不會自己取消，是「被取消」的，要用被動語態 was canceled。"
  },
  {
    topic: "被動語態",
    q: "The project is being ____ by a new team.",
    options: ["manages", "managed", "manage", "managing"],
    answer: 1,
    zh: "這個專案正由一個新團隊負責管理。",
    explain: "is being + 過去分詞 是「現在進行式的被動語態」，表示「正在被…」。"
  },
  {
    topic: "被動語態",
    q: "English ____ in many countries around the world.",
    options: ["spoke", "speaking", "is spoken", "speaks"],
    answer: 2,
    zh: "世界上許多國家都說英文。",
    explain: "語言是「被人說」的，要用被動 is + spoken（speak 的過去分詞）。"
  },
  {
    topic: "被動語態",
    q: "The broken printer ____ yet.",
    options: ["hasn't been repaired", "didn't repair", "isn't repairing", "hasn't repaired"],
    answer: 0,
    zh: "壞掉的印表機還沒被修好。",
    explain: "印表機是「被修理」的，要用被動；yet（還沒）搭配現在完成式，所以是 hasn't been repaired。"
  },
  {
    topic: "被動語態",
    q: "The documents will ____ to you by courier.",
    options: ["send", "sending", "be sent", "sent"],
    answer: 2,
    zh: "文件將以快遞寄給您。",
    explain: "will 後面接原形；文件是「被寄送」的，所以用 will be + 過去分詞 sent。"
  },

  // ===== 不定詞與動名詞 =====
  {
    topic: "不定詞與動名詞",
    q: "We decided ____ a new office in Tainan.",
    options: ["opening", "opened", "open", "to open"],
    answer: 3,
    zh: "我們決定在台南開設新辦公室。",
    explain: "decide（決定）後面要接 to + 原形動詞（不定詞）。"
  },
  {
    topic: "不定詞與動名詞",
    q: "Would you mind ____ the window?",
    options: ["closing", "close", "closed", "to close"],
    answer: 0,
    zh: "你介意把窗戶關上嗎？",
    explain: "mind（介意）後面要接 V-ing（動名詞）。Would you mind V-ing? 是很禮貌的請求說法。"
  },
  {
    topic: "不定詞與動名詞",
    q: "I'm looking forward to ____ you next week.",
    options: ["see", "seeing", "seen", "saw"],
    answer: 1,
    zh: "我很期待下週見到你。",
    explain: "look forward to 的 to 是介系詞，後面要接 V-ing，不能接原形動詞。這是多益超常考的陷阱！"
  },
  {
    topic: "不定詞與動名詞",
    q: "Ms. Wu enjoys ____ with customers.",
    options: ["work", "to work", "working", "worked"],
    answer: 2,
    zh: "吳小姐喜歡和顧客一起工作。",
    explain: "enjoy（喜歡、享受）後面要接 V-ing（動名詞）。"
  },
  {
    topic: "不定詞與動名詞",
    q: "The manager asked us ____ the report by Friday.",
    options: ["finished", "finish", "finishing", "to finish"],
    answer: 3,
    zh: "經理要求我們在週五前完成報告。",
    explain: "ask + 人 + to V 表示「要求某人做某事」。"
  },
  {
    topic: "不定詞與動名詞",
    q: "He finished ____ the boxes at 5 p.m.",
    options: ["packed", "pack", "to pack", "packing"],
    answer: 3,
    zh: "他在下午五點把箱子打包完了。",
    explain: "finish（完成）後面要接 V-ing（動名詞）。"
  },
  {
    topic: "不定詞與動名詞",
    q: "We plan ____ our prices next month.",
    options: ["lowered", "to lower", "lowering", "lower"],
    answer: 1,
    zh: "我們計劃下個月降價。",
    explain: "plan（計劃）後面接 to + 原形動詞。"
  },
  {
    topic: "不定詞與動名詞",
    q: "Thank you for ____ our store.",
    options: ["to visit", "visiting", "visited", "visit"],
    answer: 1,
    zh: "感謝您光臨本店。",
    explain: "介系詞 for 後面要接名詞或 V-ing（動名詞）。"
  },
  {
    topic: "不定詞與動名詞",
    q: "It is important ____ your password secret.",
    options: ["keep", "keeping", "to keep", "kept"],
    answer: 2,
    zh: "保管好你的密碼很重要。",
    explain: "It is + 形容詞 + to V 是常見句型，真正的主詞是後面的 to keep your password secret。"
  },
  {
    topic: "不定詞與動名詞",
    q: "She is interested in ____ the sales team.",
    options: ["joined", "joining", "join", "to join"],
    answer: 1,
    zh: "她有興趣加入業務團隊。",
    explain: "be interested in 的 in 是介系詞，後面接 V-ing。"
  },
  {
    topic: "不定詞與動名詞",
    q: "The company hopes ____ its sales by 10%.",
    options: ["increasing", "to increase", "increased", "increase"],
    answer: 1,
    zh: "公司希望把業績提高 10%。",
    explain: "hope（希望）後面接 to + 原形動詞。"
  },
  {
    topic: "不定詞與動名詞",
    q: "Please avoid ____ personal calls during work hours.",
    options: ["to make", "make", "making", "made"],
    answer: 2,
    zh: "上班時間請避免打私人電話。",
    explain: "avoid（避免）後面要接 V-ing（動名詞）。"
  },
  {
    topic: "不定詞與動名詞",
    q: "I would like ____ a table for two.",
    options: ["reserved", "to reserve", "reserving", "reserve"],
    answer: 1,
    zh: "我想預訂兩人的位子。",
    explain: "would like（想要）後面接 to + 原形動詞。"
  },
  {
    topic: "不定詞與動名詞",
    q: "We are used to ____ overtime during the holidays.",
    options: ["work", "worked", "working", "works"],
    answer: 2,
    zh: "我們已經習慣在假期期間加班了。",
    explain: "be used to（習慣於）的 to 是介系詞，後面接 V-ing。注意和 used to V（以前常常…）不同。"
  },
  {
    topic: "不定詞與動名詞",
    q: "Use this coupon ____ 10% off your next order.",
    options: ["to get", "getting", "get", "got"],
    answer: 0,
    zh: "使用這張優惠券，下一筆訂單可享九折。",
    explain: "to + 原形動詞 可以表示「目的」（為了…）：使用優惠券「為了得到」折扣。"
  },
  {
    topic: "不定詞與動名詞",
    q: "He suggested ____ the meeting until Monday.",
    options: ["postponed", "to postpone", "postpone", "postponing"],
    answer: 3,
    zh: "他建議把會議延到週一。",
    explain: "suggest（建議）後面接 V-ing（動名詞），不能接 to V。"
  },

  // ===== 比較級 =====
  {
    topic: "比較級",
    q: "This laptop is ____ than the old one.",
    options: ["more light", "light", "lighter", "lightest"],
    answer: 2,
    zh: "這台筆電比舊的那台輕。",
    explain: "看到 than（比）就要用「比較級」。短的形容詞加 -er：light → lighter。"
  },
  {
    topic: "比較級",
    q: "This is the ____ hotel in the city.",
    options: ["most expensive", "expensiver", "more expensive", "expensive"],
    answer: 0,
    zh: "這是城裡最貴的飯店。",
    explain: "the + 最高級 + in 範圍（城裡最…）。長的形容詞最高級用 most：the most expensive。"
  },
  {
    topic: "比較級",
    q: "Online shopping is ____ convenient than shopping at a store.",
    options: ["most", "very", "much", "more"],
    answer: 3,
    zh: "網路購物比在店裡購物更方便。",
    explain: "有 than 要用比較級。convenient 是長的形容詞，比較級是 more convenient。"
  },
  {
    topic: "比較級",
    q: "Ms. Lin is the ____ salesperson in our department.",
    options: ["well", "best", "better", "good"],
    answer: 1,
    zh: "林小姐是我們部門最優秀的業務員。",
    explain: "the + 最高級 + in 範圍。good 的最高級是不規則變化 best（good → better → best）。"
  },
  {
    topic: "比較級",
    q: "This month's sales were ____ than last month's.",
    options: ["worse", "badly", "worst", "bad"],
    answer: 0,
    zh: "這個月的業績比上個月差。",
    explain: "有 than 要用比較級。bad 的比較級是不規則變化 worse（bad → worse → worst）。"
  },
  {
    topic: "比較級",
    q: "The new model is not as ____ as the old one.",
    options: ["cheaper", "cheap", "cheapest", "more cheap"],
    answer: 1,
    zh: "新款不像舊款那麼便宜。",
    explain: "as + 形容詞「原級」+ as 表示「和…一樣」，not as … as 是「不像…那麼」。中間不能用比較級。"
  },
  {
    topic: "比較級",
    q: "Prices here are much ____ than in Taipei.",
    options: ["low", "more low", "lowest", "lower"],
    answer: 3,
    zh: "這裡的物價比台北低很多。",
    explain: "much 可以放在比較級前面加強語氣（…得多）。有 than，所以用比較級 lower。"
  },
  {
    topic: "比較級",
    q: "Of all our products, this one sells the ____.",
    options: ["best", "better", "well", "good"],
    answer: 0,
    zh: "在我們所有產品中，這一款賣得最好。",
    explain: "Of all…（在所有…之中）表示三者以上比較，要用最高級。修飾動詞 sells 的副詞 well，最高級是 best。"
  },
  {
    topic: "比較級",
    q: "The more you practice, the ____ your English will become.",
    options: ["well", "good", "best", "better"],
    answer: 3,
    zh: "你練習得越多，英文就會變得越好。",
    explain: "The + 比較級…, the + 比較級… 表示「越…就越…」。good 的比較級是 better。"
  },
  {
    topic: "比較級",
    q: "This is one of the ____ popular restaurants in town.",
    options: ["much", "more", "very", "most"],
    answer: 3,
    zh: "這是城裡最受歡迎的餐廳之一。",
    explain: "one of the + 最高級 + 複數名詞（最…的其中之一）。popular 的最高級是 the most popular。"
  },
  {
    topic: "比較級",
    q: "The hotel is ____ from the airport than we thought.",
    options: ["far", "more far", "farther", "farthest"],
    answer: 2,
    zh: "飯店離機場比我們想的還遠。",
    explain: "有 than 要用比較級。far（遠）的比較級是 farther。"
  },
  {
    topic: "比較級",
    q: "Mr. Kim works ____ than anyone else in the office.",
    options: ["hard", "more hardly", "harder", "hardest"],
    answer: 2,
    zh: "金先生比辦公室裡的任何人都努力。",
    explain: "比較級 + than anyone else 表示「比其他任何人都…」。hard 當副詞時比較級是 harder。"
  },
  {
    topic: "比較級",
    q: "There are ____ people at the event this year than last year.",
    options: ["less", "little", "few", "fewer"],
    answer: 3,
    zh: "今年參加活動的人比去年少。",
    explain: "people 是可數名詞，「較少的」要用 fewer；less 用在不可數名詞，例如 less money。"
  },
  {
    topic: "比較級",
    q: "This year's sales event was ____ successful than last year's.",
    options: ["less", "least", "fewer", "little"],
    answer: 0,
    zh: "今年的特賣活動比去年的不成功。",
    explain: "less + 形容詞 + than 表示「比較不…」。fewer 只能接可數名詞，不能修飾形容詞。"
  },
  {
    topic: "比較級",
    q: "The new phone is twice as ____ as the old model.",
    options: ["faster", "fastly", "fast", "fastest"],
    answer: 2,
    zh: "新手機的速度是舊款的兩倍快。",
    explain: "倍數 + as + 原級 + as 表示「是…的幾倍」。as … as 中間要用原級 fast。"
  },
  {
    topic: "比較級",
    q: "Please send me the report as ____ as possible.",
    options: ["soonest", "soon", "more soon", "sooner"],
    answer: 1,
    zh: "請盡快把報告寄給我。",
    explain: "as + 原級 + as possible 表示「盡可能地…」，as soon as possible 就是「盡快」。"
  },

  // ===== 關係代名詞 =====
  {
    topic: "關係代名詞",
    q: "The woman ____ is talking to Mr. Lee is our new manager.",
    options: ["who", "which", "whom", "whose"],
    answer: 0,
    zh: "正在和李先生說話的那位女士是我們的新經理。",
    explain: "先行詞是「人」（The woman），而且空格後面直接接動詞 is talking（缺主詞），要用主格關係代名詞 who。"
  },
  {
    topic: "關係代名詞",
    q: "This is the report ____ I wrote last week.",
    options: ["which", "where", "whose", "who"],
    answer: 0,
    zh: "這是我上週寫的報告。",
    explain: "先行詞是「東西」（the report），要用 which（或 that）。who 只能用在人。"
  },
  {
    topic: "關係代名詞",
    q: "We need someone ____ can speak Japanese.",
    options: ["what", "which", "who", "whose"],
    answer: 2,
    zh: "我們需要一位會說日文的人。",
    explain: "先行詞 someone 是「人」，空格後面缺主詞（can speak），要用 who。"
  },
  {
    topic: "關係代名詞",
    q: "The company ____ products we sell is in Germany.",
    options: ["which", "that", "who", "whose"],
    answer: 3,
    zh: "我們所販售產品的那家公司在德國。",
    explain: "空格後面直接接名詞 products，表示「那家公司的產品」，要用所有格關係代名詞 whose。"
  },
  {
    topic: "關係代名詞",
    q: "The hotel ____ we stayed was near the beach.",
    options: ["who", "where", "whose", "which"],
    answer: 1,
    zh: "我們住的那家飯店在海灘附近。",
    explain: "先行詞是「地點」（The hotel），而且後面的句子（we stayed）已經完整、不缺受詞，要用關係副詞 where（= in which）。"
  },
  {
    topic: "關係代名詞",
    q: "Mr. Park is the person ____ you should talk to.",
    options: ["what", "whom", "which", "whose"],
    answer: 1,
    zh: "朴先生是你應該找的人。",
    explain: "先行詞是人，在後面的句子裡當介系詞 to 的受詞，要用受格 whom（口語也常用 who）。"
  },
  {
    topic: "關係代名詞",
    q: "____ you need right now is a good rest.",
    options: ["That", "What", "Which", "Who"],
    answer: 1,
    zh: "你現在需要的是好好休息。",
    explain: "What = the thing that（…的東西），前面沒有先行詞時使用。What you need（你需要的東西）當主詞。"
  },
  {
    topic: "關係代名詞",
    q: "I still remember the day ____ the store first opened.",
    options: ["when", "which", "who", "where"],
    answer: 0,
    zh: "我還記得這家店開幕的那一天。",
    explain: "先行詞是「時間」（the day），後面句子完整，要用關係副詞 when。"
  },
  {
    topic: "關係代名詞",
    q: "This is the machine ____ was repaired yesterday.",
    options: ["who", "where", "whose", "that"],
    answer: 3,
    zh: "這就是昨天修好的那台機器。",
    explain: "先行詞是「東西」（the machine），後面缺主詞，用 that（或 which）。"
  },
  {
    topic: "關係代名詞",
    q: "Employees ____ work overtime will receive extra pay.",
    options: ["whom", "who", "whose", "which"],
    answer: 1,
    zh: "加班的員工會領到額外的薪資。",
    explain: "先行詞 Employees 是人，後面缺主詞（work overtime），用主格 who。"
  },
  {
    topic: "關係代名詞",
    q: "The bag ____ I bought online arrived today.",
    options: ["where", "who", "that", "whose"],
    answer: 2,
    zh: "我在網路上買的包包今天到了。",
    explain: "先行詞是「東西」（The bag），在後面句子裡當 bought 的受詞，用 that（或 which）。"
  },
  {
    topic: "關係代名詞",
    q: "Ms. Chen, ____ office is on the fifth floor, is our manager.",
    options: ["who", "whose", "which", "that"],
    answer: 1,
    zh: "陳小姐是我們的經理，她的辦公室在五樓。",
    explain: "空格後面是名詞 office，表示「陳小姐的辦公室」，要用所有格 whose。"
  },
  {
    topic: "關係代名詞",
    q: "Taipei is the city ____ our headquarters is located.",
    options: ["which", "when", "where", "who"],
    answer: 2,
    zh: "台北是我們總部所在的城市。",
    explain: "先行詞是地點（the city），後面句子完整（our headquarters is located），用關係副詞 where。"
  },
  {
    topic: "關係代名詞",
    q: "Please tell me ____ you want for lunch.",
    options: ["what", "who", "which", "that"],
    answer: 0,
    zh: "請告訴我你午餐想吃什麼。",
    explain: "前面沒有先行詞，要用 what（…的東西）。what you want = the thing that you want。"
  },
  {
    topic: "關係代名詞",
    q: "The applicant ____ we interviewed yesterday has a lot of experience.",
    options: ["which", "whom", "whose", "where"],
    answer: 1,
    zh: "我們昨天面試的那位應徵者經驗很豐富。",
    explain: "先行詞是人（The applicant），在後面句子裡當 interviewed 的受詞，用受格 whom。"
  },
  {
    topic: "關係代名詞",
    q: "Our new office, ____ opened last month, is very modern.",
    options: ["which", "that", "who", "where"],
    answer: 0,
    zh: "我們的新辦公室是上個月啟用的，非常現代化。",
    explain: "逗號後面補充說明「東西」（非限定用法），只能用 which，不能用 that。"
  }
]);
