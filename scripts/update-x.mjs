// Xの最新投稿を取得して data/x.json と data/x/*.jpg を更新する。
// GitHub Actions から自動実行される（手元では `node scripts/update-x.mjs`）。
//
// 投稿の集め方（すべて無料・ログイン不要のX公式埋め込み用データ）:
//   1. アカウントのタイムライン … Xが返すのは約100件で、直近の投稿が含まれないことがある
//   2. x-posts.txt に貼られたURL … 1 で拾えない投稿を確実に載せるための手動指定
//   3. 前回の data/x.json       … 取得に失敗した回でも表示を保つ
// これらを合わせて新しい順に並べ、先頭の数件を表示用に保存する。
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const SCREEN_NAME = "kiyotaka_no_uji";
const ROOT = new URL("../", import.meta.url);
const OUT = new URL("data/x.json", ROOT);
const IMAGE_DIR = new URL("data/x/", ROOT);
const PINS = new URL("x-posts.txt", ROOT);
const MAX_POSTS = 3;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// Node の fetch だとX側に拒否されることがあるため curl で取得する
const curl = (args) => execFileSync("curl", ["-sS", "--fail", "--max-time", "30", "-A", UA, ...args], { maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });

// 失敗の理由（curl のメッセージ）を1行で取り出す
const reason = (error) => String(error.stderr ?? "").trim() || String(error.message).split("\n")[0];

const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// Xのデータを表示用の形にそろえる。本文からは画像用の短縮URLを除き、リンクは元の表記に戻す
const toPost = (t) => {
  let text = t.full_text ?? t.text ?? "";
  for (const m of t.entities?.media ?? []) text = text.replace(m.url, "");
  for (const u of t.entities?.urls ?? []) text = text.replace(u.url, u.display_url ?? u.expanded_url);
  const media = (t.mediaDetails ?? t.extended_entities?.media ?? t.entities?.media)?.[0];
  return {
    id: t.id_str,
    url: `https://x.com/${SCREEN_NAME}/status/${t.id_str}`,
    date: new Date(t.created_at).toISOString(),
    text: decode(text).trim(),
    imageSource: media?.media_url_https?.startsWith("https://pbs.twimg.com/") ? media.media_url_https : null,
  };
};

const found = new Map();

// 3. 前回の内容
const previous = await readFile(OUT, "utf8").then(JSON.parse).catch(() => null);
for (const p of previous?.posts ?? []) found.set(p.id, p);

// 1. タイムライン（引数に保存済みのHTMLファイルを渡すと、Xにアクセスせずそれを使う）
try {
  const html = process.argv[2]
    ? await readFile(process.argv[2], "utf8")
    : curl([`https://syndication.twitter.com/srv/timeline-profile/screen-name/${SCREEN_NAME}`]).toString("utf8");
  const json = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  const entries = JSON.parse(json[1]).props?.pageProps?.timeline?.entries ?? [];
  for (const { content } of entries) {
    const t = content?.tweet;
    // 本人の投稿のみ（リポスト・返信は除く）
    if (t && t.user?.screen_name === SCREEN_NAME && !t.retweeted_status && !t.in_reply_to_status_id_str) found.set(t.id_str, toPost(t));
  }
  console.log(`Timeline: ${entries.length} entries.`);
} catch (error) {
  console.log("Timeline unavailable this time:", reason(error));
}

// 2. x-posts.txt に貼られたURL
const pinned = (await readFile(PINS, "utf8").catch(() => ""))
  .split("\n")
  .filter((line) => !line.trim().startsWith("#"))
  .map((line) => line.match(/status\/(\d+)/)?.[1])
  .filter(Boolean);
for (const id of pinned) {
  if (found.has(id)) continue;
  try {
    const token = ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
    const t = JSON.parse(curl([`https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${token}`]).toString("utf8"));
    if (t.user?.screen_name === SCREEN_NAME) found.set(id, toPost(t));
  } catch (error) {
    console.log(`Could not load pinned post ${id}:`, reason(error));
  }
}

// 投稿IDは時系列順の番号なので、大きい順 = 新しい順
const latest = [...found.values()].sort((a, b) => (BigInt(b.id) > BigInt(a.id) ? 1 : -1)).slice(0, MAX_POSTS);
if (!latest.length) throw new Error("No posts found.");

await mkdir(IMAGE_DIR, { recursive: true });
const posts = [];
for (const { imageSource, ...post } of latest) {
  if (imageSource) {
    post.image = `data/x/${post.id}.jpg`;
    await writeFile(new URL(`${post.id}.jpg`, IMAGE_DIR), curl([`${imageSource}?format=jpg&name=small`]));
  }
  posts.push({ image: null, ...post });
}

// 使わなくなった画像を消す
const keep = new Set(posts.filter((p) => p.image).map((p) => `${p.id}.jpg`));
for (const file of await readdir(IMAGE_DIR)) {
  if (!keep.has(file)) await rm(new URL(file, IMAGE_DIR));
}

// 変化が無ければ書き換えない（無駄なコミットを作らないため）
if (previous && JSON.stringify(previous.posts) === JSON.stringify(posts)) {
  console.log("No changes.");
} else {
  await writeFile(OUT, JSON.stringify({ updated: new Date().toISOString(), posts }, null, 2) + "\n");
  console.log("Wrote", posts.map((p) => p.id).join(", "));
}
