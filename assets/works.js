// 出演作品データ（出典：Wikipedia日本語版「宇治清高」）
// 1行 = 1作品。新しい作品はここに1行追加するだけで全言語のページに反映されます。
//   c: カテゴリ (tv / film / stage / web / video / variety / cm / mv)
//   y: 年   t: タイトル   r: 役名   ep: 話数   net: 放送局・劇場など
//   main: 主演・メインキャスト   voice: 声の出演   featured: 代表作として大きく表示
//   url: 公式ページ（あればタイトルがリンクになります）
// t と r は { ja, en, zh, ko }。zh / ko を省略すると自動で ja か en を表示します。
window.WORKS = [
  // ── テレビドラマ ──
  { c: "tv", y: "2008", t: { ja: "私が子どもだったころ〜田中裕二篇〜", en: "Watashi ga Kodomo Datta Koro: Yuji Tanaka" }, net: { ja: "NHKデジタル衛星ハイビジョン", en: "NHK BS Hi-Vision" } },
  { c: "tv", y: "2009", t: { ja: "Goro's Barドラマスペシャル〜世界に一つだけの花サカス!?〜", en: "Goro's Bar Drama Special" }, net: { ja: "TBS", en: "TBS" } },
  { c: "tv", y: "2010", t: { ja: "満福少女ドラゴネット", en: "Manpuku Shojo Dragonet" }, r: { ja: "蒲生 / 怪盗ダルメシアン", en: "Gamo / Phantom Thief Dalmatian" }, net: { ja: "テレビ神奈川", en: "tvk" } },
  { c: "tv", y: "2011", t: { ja: "桜からの手紙 〜AKB48 それぞれの卒業物語〜", en: "Sakura Kara no Tegami: AKB48 Sorezore no Sotsugyo Monogatari" }, r: { ja: "柏木", en: "Kashiwagi" }, net: { ja: "日本テレビ", en: "NTV" } },
  { c: "tv", y: "2011", featured: true, url: "https://www.kamen-rider-official.com/series/fourze/", t: { ja: "仮面ライダーフォーゼ", en: "Kamen Rider Fourze", zh: "假面骑士Fourze", ko: "가면라이더 포제" }, r: { ja: "新田 / ユニコーン・ゾディアーツ", en: "Nitta / Unicorn Zodiarts", zh: "新田 / 独角兽黄道魔", ko: "닛타 / 유니콘 조디아츠" }, ep: "5・6", net: { ja: "テレビ朝日", en: "TV Asahi" } },
  { c: "tv", y: "2012", t: { ja: "ブラックボード〜時代と戦った教師たち〜 第2夜", en: "Blackboard: Jidai to Tatakatta Kyoshitachi (Night 2)" }, r: { ja: "古沢", en: "Furusawa" }, net: { ja: "TBS", en: "TBS" } },
  { c: "tv", y: "2012", t: { ja: "超再現!ミステリー「風少女」", en: "Cho Saigen! Mystery: “Kaze Shojo”" }, r: { ja: "斎木", en: "Saiki" }, net: { ja: "日本テレビ", en: "NTV" } },
  { c: "tv", y: "2012", t: { ja: "ビギナーズ!", en: "Beginners!" }, ep: "7", net: { ja: "TBS", en: "TBS" } },
  { c: "tv", y: "2013", t: { ja: "斉藤さん2", en: "Saito-san 2" }, r: { ja: "木津", en: "Kizu" }, net: { ja: "日本テレビ", en: "NTV" } },
  { c: "tv", y: "2014", main: true, featured: true, t: { ja: "ウルトラマンギンガS", en: "Ultraman Ginga S", zh: "银河奥特曼S", ko: "울트라맨 긴가 S" }, r: { ja: "ショウ", en: "Sho", zh: "翔", ko: "쇼" }, net: { ja: "テレビ東京", en: "TV Tokyo" } },
  { c: "tv", y: "2014", t: { ja: "世にも奇妙な物語 2014年 秋の特別編「捨てられない女」", en: "Tales of the Unusual: Autumn 2014 Special", zh: "世界奇妙物语 2014年秋季特别篇", ko: "기묘한 이야기 2014 가을 특별편" }, r: { ja: "男", en: "Man", zh: "男人", ko: "남자" }, net: { ja: "フジテレビ", en: "Fuji TV" } },
  { c: "tv", y: "2015", main: true, t: { ja: "ウルトラファイトビクトリー", en: "Ultra Fight Victory", zh: "奥特格斗 维克特利", ko: "울트라 파이트 빅토리" }, r: { ja: "ショウ", en: "Sho", zh: "翔", ko: "쇼" }, net: { ja: "テレビ東京", en: "TV Tokyo" } },
  { c: "tv", y: "2015", t: { ja: "ウルトラマンX", en: "Ultraman X", zh: "艾克斯奥特曼", ko: "울트라맨 엑스" }, r: { ja: "ショウ", en: "Sho", zh: "翔", ko: "쇼" }, ep: "13・14", net: { ja: "テレビ東京", en: "TV Tokyo" } },
  { c: "tv", y: "2018", t: { ja: "トレース〜科捜研の男〜", en: "Trace: Kasoken no Otoko" }, ep: "7" },
  { c: "tv", y: "2020", t: { ja: "ハイポジ 1986年、二度目の青春。", en: "Hi-Posi: 1986, Nidome no Seishun" }, r: { ja: "トラオ", en: "Torao" }, net: { ja: "テレビ大阪・BSテレ東", en: "TV Osaka / BS TV Tokyo" } },
  { c: "tv", y: "2022", url: "https://www.kamen-rider-official.com/series/revice/", t: { ja: "仮面ライダーリバイス", en: "Kamen Rider Revice", zh: "假面骑士Revice", ko: "가면라이더 리바이스" }, r: { ja: "田淵", en: "Tabuchi", ko: "타부치" }, ep: "19・20", net: { ja: "テレビ朝日", en: "TV Asahi" } },

  // ── 映画 ──
  { c: "film", y: "2009", t: { ja: "ちゃんと伝える", en: "Be Sure to Share" }, r: { ja: "北（青年時代）", en: "Kita (young)" } },
  { c: "film", y: "2010", t: { ja: "誰かが私にキスをした", en: "Memoirs of a Teenage Amnesiac" } },
  { c: "film", y: "2011", t: { ja: "嘘つきみーくんと壊れたまーちゃん", en: "Usotsuki Mii-kun to Kowareta Maa-chan" }, r: { ja: "菅原", en: "Sugawara" } },
  { c: "film", y: "2011", t: { ja: "劇場版 神聖かまってちゃん ロックンロールは鳴り止まないっ", en: "Ringing in Their Ears" } },
  { c: "film", y: "2012", t: { ja: "Another", en: "Another" }, r: { ja: "勅使河原", en: "Teshigawara" } },
  { c: "film", y: "2012", t: { ja: "仮面ライダーフォーゼ THE MOVIE みんなで宇宙キターッ!", en: "Kamen Rider Fourze the Movie: Space, Here We Come!", zh: "假面骑士Fourze THE MOVIE 大家的宇宙来了！", ko: "가면라이더 포제 THE MOVIE" }, r: { ja: "新田（友情出演）", en: "Nitta (cameo)", zh: "新田（友情出演）", ko: "닛타 (우정 출연)" } },
  { c: "film", y: "2012", t: { ja: "悪の教典", en: "Lesson of the Evil", zh: "恶之教典", ko: "악의 교전" }, r: { ja: "松井", en: "Matsui" } },
  { c: "film", y: "2015", main: true, t: { ja: "劇場版 ウルトラマンギンガS 決戦!ウルトラ10勇士!!", en: "Ultraman Ginga S The Movie: Showdown! Ultra 10 Warriors!!", zh: "银河奥特曼S剧场版 决战！奥特10勇士！！", ko: "극장판 울트라맨 긴가 S: 결전! 울트라 10용사!!" }, r: { ja: "ショウ", en: "Sho", zh: "翔", ko: "쇼" } },
  { c: "film", y: "2016", t: { ja: "ドクムシ", en: "Dokumushi" }, r: { ja: "トシオ", en: "Toshio" } },
  { c: "film", y: "2017", voice: true, url: "https://m-78.jp/orb/movie/", t: { ja: "劇場版 ウルトラマンオーブ 絆の力、おかりします!", en: "Ultraman Orb The Movie: Lend Me the Power of Bonds!", zh: "欧布奥特曼剧场版 羁绊之力，拜托了！", ko: "극장판 울트라맨 오브: 인연의 힘, 빌리겠습니다!" }, r: { ja: "ウルトラマンビクトリー", en: "Ultraman Victory", zh: "维克特利奥特曼", ko: "울트라맨 빅토리" } },
  { c: "film", y: "2020", url: "https://m-78.jp/taiga/", t: { ja: "劇場版 ウルトラマンタイガ ニュージェネクライマックス", en: "Ultraman Taiga The Movie: New Generation Climax", zh: "泰迦奥特曼剧场版 新世代之巅", ko: "극장판 울트라맨 타이가: 뉴 제네레이션 클라이맥스" }, r: { ja: "ショウ", en: "Sho", zh: "翔", ko: "쇼" } },
  { c: "film", y: "2021", t: { ja: "唐人街探偵 東京MISSION", en: "Detective Chinatown 3", zh: "唐人街探案3" }, r: { ja: "刑事", en: "Detective", zh: "刑警", ko: "형사" } },
  { c: "film", y: "2021", url: "https://utsukushiki-yuwaku.jp/", t: { ja: "美しき誘惑-現代の「画皮」-", en: "Beautiful Lure: A Modern Tale of “Painted Skin”" }, r: { ja: "長田", en: "Nagata" } },
  { c: "film", y: "2022", url: "https://www.he-low.com/", t: { ja: "HE-LOW THE FINAL", en: "HE-LOW THE FINAL" } },

  // ── 舞台 ──
  { c: "stage", y: "2018", main: true, t: { ja: "SEPT Vol.8「MIRRORION」", en: "SEPT Vol.8 “MIRRORION”" }, r: { ja: "成瀬", en: "Naruse" }, net: { ja: "銀座・博品館劇場", en: "Hakuhinkan Theater, Ginza" } },

  // ── ウェブドラマ ──
  { c: "web", y: "2019", voice: true, t: { ja: "ウルトラギャラクシーファイト ニュージェネレーションヒーローズ", en: "Ultra Galaxy Fight: New Generation Heroes", zh: "奥特银河格斗 新世代英雄", ko: "울트라 갤럭시 파이트: 뉴 제너레이션 히어로즈" }, r: { ja: "ウルトラマンビクトリー", en: "Ultraman Victory", zh: "维克特利奥特曼", ko: "울트라맨 빅토리" } },
  { c: "web", y: "2021–22", voice: true, url: "https://m-78.jp/galaxy-fight/tdc/", t: { ja: "ウルトラギャラクシーファイト 運命の衝突", en: "Ultra Galaxy Fight: The Destined Crossroad", zh: "奥特银河格斗 命运的冲突", ko: "울트라 갤럭시 파이트: 운명의 충돌" }, r: { ja: "ウルトラマンビクトリー", en: "Ultraman Victory", zh: "维克特利奥特曼", ko: "울트라맨 빅토리" } },

  // ── オリジナルビデオ ──
  { c: "video", y: "2023", t: { ja: "リバイスForward 仮面ライダーライブ&エビル&デモンズ", en: "Revice Forward: Kamen Rider Live & Evil & Demons" }, r: { ja: "田淵", en: "Tabuchi", ko: "타부치" } },

  // ── バラエティ ──
  { c: "variety", y: "2010–11", t: { ja: "不可思議探偵団", en: "Fukashigi Tanteidan" }, net: { ja: "日本テレビ", en: "NTV" } },

  // ── CM ──
  { c: "cm", y: "2008", t: { ja: "全日本空輸", en: "ANA (All Nippon Airways)" } },
  { c: "cm", y: "2008", t: { ja: "市進学院", en: "Ichishin Gakuin" } },
  { c: "cm", y: "2010", t: { ja: "資生堂「シーブリーズ」", en: "Shiseido “Sea Breeze”" } },
  { c: "cm", y: "2014", t: { ja: "ヤクルト本社「ヤクルトの乳性飲料 ミルージュ」", en: "Yakult “Mirouge”" } },
  { c: "cm", y: "2014", t: { ja: "バンダイ「DXビクトリーランサー」", en: "Bandai “DX Victory Lancer”" } },
  { c: "cm", y: "2014–15", t: { ja: "JR東日本 JR SKI SKI「ぜんぶ雪のせいだ。」篇", en: "JR East “JR SKI SKI”" } },
  { c: "cm", y: "2015", t: { ja: "バンダイ「DXナイトティンバー」", en: "Bandai “DX Knight Timbre”" } },

  // ── ミュージックビデオ ──
  { c: "mv", y: "2008", t: { ja: "GReeeeN「キセキ」", en: "GReeeeN “Kiseki”" } },
  { c: "mv", y: "2008", t: { ja: "アンジェラ・アキ「手紙 〜拝啓 十五の君へ〜」", en: "Angela Aki “Tegami ~Haikei Jugo no Kimi e~”" } },
  { c: "mv", y: "2010", t: { ja: "SEAMO「始まりと終わり」", en: "SEAMO “Hajimari to Owari”" } },
  { c: "mv", y: "2010", t: { ja: "LOVE「わたしあうもの」", en: "LOVE “Watashi Au Mono”" } },
  { c: "mv", y: "2012", t: { ja: "INFINITY16 welcomez MINMI & JAY'ED「雨のち晴れ」", en: "INFINITY16 welcomez MINMI & JAY'ED “Ame Nochi Hare”" } }
];
