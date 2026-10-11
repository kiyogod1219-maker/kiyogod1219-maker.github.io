# 宇治清高 Official Site

俳優・宇治清高のオフィシャルサイト。サーバー不要の静的サイトで、GitHub Pages を使えば**ドメイン・サーバーとも無料**で公開できます。

- 対応言語：日本語 `/`、English `/en/`、简体中文 `/zh/`、한국어 `/ko/`（言語ごとに独立したページ。右上のボタンで切替）
- プロフィール・出演情報：Wikipedia日本語版「宇治清高」をもとに作成

## 公開方法（無料・GitHub Pages）

1. <https://github.com> で無料アカウントを作成（ユーザー名がURLになります。例：`kiyotaka-uji`）
2. 右上の「＋」→ **New repository**
   - Repository name：`ユーザー名.github.io`（例：`kiyotaka-uji.github.io`）
   - **Public** を選んで Create
3. 「uploading an existing file」をクリックし、このフォルダの中身を**すべて**ドラッグ＆ドロップ → **Commit changes**
   - `.github` フォルダは隠しフォルダです。Finder で `⌘ + Shift + .` を押すと表示されます（これが無いとXの自動更新とページの自動作り直しが動きません）
4. リポジトリの **Settings → Pages** で Source を「Deploy from a branch」、Branch を `main` / `(root)` にして Save
5. 1〜2分後、`https://ユーザー名.github.io/` で公開されます

## SNSのプレビュー（自動更新）

| SNS | 仕組み | 費用 |
| --- | --- | --- |
| Instagram | Instagram公式のプロフィール埋め込み。プロフィールと最新6件の投稿が常に最新の状態で表示されます | 無料 |
| YouTube | YouTube公式プレーヤー。チャンネルの最新の動画（ショートを除く）が自動で表示されます | 無料 |
| X | GitHub Actions が6時間ごとに投稿（本文・日付・写真）を取り込み、新しい順に3件をサイト内のカードとして表示します | 無料 |

### Xだけは「投稿直後」が自動で出ないことがあります

InstagramやYouTubeと違い、Xは最新の投稿一覧を無料では提供していません（有料API、またはXにログインした状態でのみ取得できます）。
このサイトが無料で取得できるのは、Xが選んだ約100件の投稿だけで、投稿したばかりのポストはそこに含まれないことがあります。

**確実に載せたい投稿があるとき**は、`x-posts.txt` にポストのURLを1行貼って保存（Commit）してください。無料で、保存すると数分でサイトに反映されます。

リポスト・返信は表示しません。

## 検索エンジン対策（SEO）

サイト側で入れてあるもの：

- 言語ごとの独立したページと、言語同士を結び付ける指定（hreflang / canonical）
- 本文・出演作品をすべてHTMLに書き出し（検索エンジンがそのまま読める）
- 言語ごとのタイトル・説明文、SNSで共有されたときの画像と文面（OGP / X カード）
- 人物情報の構造化データ（氏名・別表記・生年月日・職業・公式SNS・Wikipedia との紐付け）
- `sitemap.xml`（画像・言語情報つき）、`robots.txt`、404ページ、サイトアイコン
- 画像の遅延読み込み、SNS埋め込みの後読みによる表示の高速化

**公開後にご本人の操作が必要なもの**（効果が大きい順）：

1. **Google Search Console に登録**（無料）： <https://search.google.com/search-console> で「URLプレフィックス」にサイトのURLを入れ、確認方法「HTMLタグ」に表示される `content="..."` の中身を `assets/config.js` の `googleSiteVerification` に貼って保存。確認後、「サイトマップ」に `sitemap.xml` と入力して送信します。
2. **各SNSのプロフィールにサイトのURLを載せる**：Instagram・X・YouTube のプロフィール欄のリンクを新しいサイトに変更します。「公式」と認識されるうえで最も効きます。
3. **Wikipedia の「外部リンク」を新しいURLに更新**：現在は旧サイト（Wix）が載っています。ご本人が編集する場合は、ノートページで依頼するのが Wikipedia の作法です。
4. **旧サイト（Wix）から新サイトへリンク、または旧サイトを閉じる**：同じ内容のサイトが2つあると評価が分かれます。
5. Bing Webmaster Tools（任意）： <https://www.bing.com/webmasters> で同様に登録し、コードを `bingSiteVerification` に貼ります。

検索結果に反映されるまで、通常は数日〜数週間かかります。

## 更新のしかた

| やりたいこと | 編集するファイル |
| --- | --- |
| 出演作品を追加する | `assets/works.js`（1行追加。`url` を書くと公式ページへのリンクになります） |
| プロフィール・略歴・検索用の説明文を直す | `assets/i18n.js`（言語ごと） |
| SNSアカウント・連絡先メール・サイトURLを変える | `assets/config.js` |
| Xの投稿を確実に載せる | `x-posts.txt`（ポストのURLを貼る） |
| トップの写真を差し替える | `images/hero.jpg`（横長） |
| プロフィール写真を差し替える | `images/profile.jpg`（縦長） |
| 略歴の写真を差し替える | `images/portrait.jpg`（縦長） |

GitHub 上でファイルを開き、鉛筆アイコンから編集 → Commit すると、数分でサイトに反映されます。
`index.html` や `en/index.html` などのページは上のファイルから自動で作り直されるので、直接は編集しません。

## 手元で確認する

```bash
node scripts/build.mjs
```

でページを作り直し、

```bash
python3 -m http.server 4173
```

を実行して <http://localhost:4173> を開きます。
