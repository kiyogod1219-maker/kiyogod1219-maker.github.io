// サイト設定。ここを書き換えるだけでSNSや連絡先を変更できます。
// 書き換えたあとは `node scripts/build.mjs` でページを作り直します（GitHub上では自動）。
window.SITE_CONFIG = {
  // 公開先のURL（末尾の / は付けない）。検索エンジン向けの情報に使われます。
  siteUrl: "https://kiyogod1219-maker.github.io",

  x: "kiyotaka_no_uji",
  instagram: "kiyotaka_uji",
  youtube: { handle: "KiyotakaUji", channelId: "UCgTlFW8LMc6OUoBfzMd0YNQ" },

  // お仕事の依頼用メールアドレス。空にするとSNSのDMへの案内だけになります。
  contactEmail: "kiyotaka.uji.official@gmail.com",

  // Google Search Console / Bing Webmaster Tools の所有権確認コード（取得したら貼る）
  googleSiteVerification: "",
  bingSiteVerification: ""
};
