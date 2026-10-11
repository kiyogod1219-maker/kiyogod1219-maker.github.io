// サイトのページを生成する。
//   node scripts/build.mjs
// assets/i18n.js（文言）・assets/works.js（出演作品）・assets/config.js（設定）から、
// 言語ごとのページ（/ , /en/ , /zh/ , /ko/）、404.html、sitemap.xml、robots.txt を作る。
// 検索エンジンが内容を読み取れるよう、本文はすべてHTMLに書き出す。
// GitHub上では上記ファイルを書き換えると自動で実行される。
import { mkdir, writeFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url);
globalThis.window = {};
await import(new URL("assets/config.js", ROOT));
await import(new URL("assets/i18n.js", ROOT));
await import(new URL("assets/works.js", ROOT));
const { SITE_CONFIG: CONFIG, I18N, WORKS } = globalThis.window;

const SITE = CONFIG.siteUrl.replace(/\/+$/, "");
const LANGS = [
  { code: "ja", path: "", label: "日本語" },
  { code: "en", path: "en/", label: "EN" },
  { code: "zh", path: "zh/", label: "中文" },
  { code: "ko", path: "ko/", label: "한국어" },
];
const CATS = ["tv", "film", "stage", "web", "video", "variety", "cm", "mv"];
const MARQUEE = ["Ultraman Ginga S", "Kamen Rider Fourze", "Another", "Lesson of the Evil", "Ultra Fight Victory", "Kamen Rider Revice", "Mirrorion"];
const SECTIONS = [["profile", "profile"], ["biography", "biography"], ["works", "works"], ["sns", "sns"], ["contact", "contact"]];

const X_URL = `https://x.com/${CONFIG.x}`;
const IG_URL = `https://www.instagram.com/${CONFIG.instagram}/`;
const YT_URL = `https://www.youtube.com/@${CONFIG.youtube.handle}`;
const SAME_AS = [
  "https://ja.wikipedia.org/wiki/宇治清高",
  "https://ko.wikipedia.org/wiki/우지_키요타카",
  X_URL,
  IG_URL,
  YT_URL,
];

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pageUrl = (lang) => `${SITE}/${lang.path}`;

function page(lang) {
  const t = I18N[lang.code];
  const root = lang.path ? "../" : "";
  const url = pageUrl(lang);

  // 作品名・役名: 指定言語が無ければ、中国語は漢字のみの日本語表記、それ以外は英語表記を使う
  const pick = (text) => {
    if (!text) return "";
    if (text[lang.code]) return text[lang.code];
    if (lang.code === "zh" && text.ja && !/[\u3040-\u30ff]/.test(text.ja)) return text.ja;
    return text.en || text.ja;
  };
  const role = (w) => {
    const r = pick(w.r);
    return r && w.voice ? `${r} (${t.works.voice})` : r;
  };
  const byYear = (a, b) => b.y.localeCompare(a.y);
  const ext = 'target="_blank" rel="noopener"';

  const alternates = [
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${I18N[l.code].htmlLang}" href="${pageUrl(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(LANGS[0])}">`,
  ].join("\n");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: t.seo.siteName,
        inLanguage: LANGS.map((l) => I18N[l.code].htmlLang),
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.title,
        description: t.seo.description,
        inLanguage: t.htmlLang,
        isPartOf: { "@id": `${SITE}/#website` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/images/og.jpg`, width: 1200, height: 630 },
        mainEntity: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: lang.code === "en" ? "Kiyotaka Uji" : lang.code === "ko" ? "우지 키요타카" : "宇治清高",
        alternateName: ["宇治清高", "宇治 清高", "Kiyotaka Uji", "うじ きよたか", "ウジ キヨタカ", "우지 키요타카"],
        url: `${SITE}/`,
        image: [`${SITE}/images/profile.jpg`, `${SITE}/images/hero.jpg`, `${SITE}/images/portrait.jpg`],
        description: t.seo.description,
        birthDate: "1993-12-19",
        birthPlace: { "@type": "Place", name: "Tokyo, Japan" },
        nationality: { "@type": "Country", name: "Japan" },
        gender: "Male",
        height: { "@type": "QuantitativeValue", value: 182, unitCode: "CMT" },
        jobTitle: ["Actor", "Model"],
        hasOccupation: [
          { "@type": "Occupation", name: "Actor" },
          { "@type": "Occupation", name: "Model" },
        ],
        sameAs: SAME_AS,
      },
    ],
  };

  const verification = [
    CONFIG.googleSiteVerification && `<meta name="google-site-verification" content="${esc(CONFIG.googleSiteVerification)}">`,
    CONFIG.bingSiteVerification && `<meta name="msvalidate.01" content="${esc(CONFIG.bingSiteVerification)}">`,
  ].filter(Boolean).join("\n");

  const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.seo.description)}">
<meta name="author" content="Kiyotaka Uji">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
${alternates}
<meta property="og:type" content="profile">
<meta property="og:site_name" content="${esc(t.seo.siteName)}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.seo.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/images/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.seo.alt)}">
<meta property="og:locale" content="${t.seo.ogLocale}">
${LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${I18N[l.code].seo.ogLocale}">`).join("\n")}
<meta property="profile:first_name" content="Kiyotaka">
<meta property="profile:last_name" content="Uji">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@${CONFIG.x}">
<meta name="twitter:creator" content="@${CONFIG.x}">
<meta name="twitter:title" content="${esc(t.title)}">
<meta name="twitter:description" content="${esc(t.seo.description)}">
<meta name="twitter:image" content="${SITE}/images/og.jpg">
<meta name="twitter:image:alt" content="${esc(t.seo.alt)}">
<meta name="theme-color" content="#f2f0eb">${verification ? "\n" + verification : ""}
<link rel="icon" type="image/png" sizes="96x96" href="${root}favicon.png">
<link rel="apple-touch-icon" href="${root}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${{ zh: "Noto+Serif+SC", ko: "Noto+Serif+KR" }[lang.code] ?? "Noto+Serif+JP"}:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="${root}images/hero.jpg" fetchpriority="high">
<link rel="stylesheet" href="${root}assets/style.css">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`;

  const nav = SECTIONS.map(([id, key]) => `<a href="#${id}">${esc(t.nav[key])}</a>`).join("\n    ");
  const langLinks = LANGS.map((l) => `<a href="${root}${l.path}" hreflang="${I18N[l.code].htmlLang}" lang="${I18N[l.code].htmlLang}"${l === lang ? ' aria-current="page"' : ""}>${l.label}</a>`).join("\n    ");

  const facts = t.profile.facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("\n          ");
  const timeline = t.bio.items.map(([y, text]) => `<li><span class="timeline-year">${esc(y)}</span><p>${esc(text)}</p></li>`).join("\n          ");

  const features = WORKS.filter((w) => w.featured).sort(byYear).map((w) => {
    const inner = `<span class="feature-label">${esc(t.works.featured)}</span><span class="feature-year">${esc(w.y)}</span><strong class="feature-title">${esc(pick(w.t))}</strong><span class="feature-role">${esc(role(w))}</span>`;
    return w.url
      ? `<a class="feature" href="${esc(w.url)}" ${ext}>${inner}<span class="feature-arrow" aria-hidden="true">↗</span></a>`
      : `<div class="feature">${inner}</div>`;
  }).join("\n      ");

  const cats = CATS.filter((c) => WORKS.some((w) => w.c === c));
  const tabs = cats.map((c) => `<button type="button" class="tab" role="tab" data-cat="${c}" aria-selected="${c === cats[0]}">${esc(t.works.cats[c])}<span class="tab-count">${WORKS.filter((w) => w.c === c).length}</span></button>`).join("\n      ");

  // 作品はカテゴリごとの見出し付きで全件をHTMLに書き出し、画面ではタブで1カテゴリずつ表示する
  const workGroups = cats.map((c) => {
    const items = WORKS.filter((w) => w.c === c).sort(byYear).map((w) => {
      const title = w.url
        ? `<a href="${esc(w.url)}" ${ext} title="${esc(t.works.official)}">${esc(pick(w.t))}<span class="work-arrow" aria-hidden="true">↗</span></a>`
        : esc(pick(w.t));
      const meta = [w.ep && t.works.ep.replace("{n}", w.ep), w.net && pick(w.net)].filter(Boolean).join(" · ");
      return `<li class="work${w.main ? " is-main" : ""}"><span class="work-year">${esc(w.y)}</span><div class="work-body"><p class="work-title">${title}${w.main ? `<span class="badge">${esc(t.works.main)}</span>` : ""}</p>${meta ? `<p class="work-meta">${esc(meta)}</p>` : ""}</div><span class="work-role">${esc(role(w))}</span></li>`;
    }).join("\n        ");
    return `<section class="work-group" data-cat="${c}">
      <h3 class="work-group-title">${esc(t.works.cats[c])}</h3>
      <ul class="work-list">
        ${items}
      </ul>
    </section>`;
  }).join("\n    ");

  const contact = [
    CONFIG.contactEmail && [`mailto:${CONFIG.contactEmail}`, t.contact.email, false],
    [IG_URL, t.contact.dmIg, true],
    [X_URL, t.contact.dmX, true],
  ].filter(Boolean).map(([href, label, external], i) => `<a class="button ${i === 0 ? "is-primary" : "is-ghost"}" href="${esc(href)}"${external ? " " + ext : ""}>${esc(label)}</a>`).join("\n        ");

  const heroName = t.hero.name.map((line) => `<span>${esc(line)}</span>`).join("");
  const marquee = [...MARQUEE, ...MARQUEE].map((m) => `<span>${m}</span>`).join("");

  return `<!doctype html>
<html lang="${t.htmlLang}" data-lang="${lang.code}" data-root="${root}">
<head>
${head}
</head>
<body>

<header class="site-header" id="top">
  <a class="brand" href="#top">Kiyotaka Uji</a>
  <nav class="nav" id="nav" aria-label="Main">
    ${nav}
  </nav>
  <nav class="lang" aria-label="Language">
    ${langLinks}
  </nav>
  <button type="button" class="menu-button" id="menu-button" aria-expanded="false" aria-controls="nav" aria-label="Menu"><span></span><span></span></button>
</header>

<main>
  <section class="hero" aria-labelledby="hero-name">
    <img class="hero-photo" src="${root}images/hero.jpg" alt="${esc(t.seo.alt)}" width="2000" height="1333" fetchpriority="high">
    <div class="hero-inner${t.hero.vertical ? "" : " is-stacked"}">
      <h1 id="hero-name" class="hero-name${t.hero.vertical ? " is-vertical" : ""}">${heroName}</h1>
      <div class="hero-text">
        <p class="hero-sub">${esc(t.hero.nameSub)}</p>
        <p class="hero-role">${esc(t.hero.role)}</p>
        <p class="hero-lead">${esc(t.hero.lead)}</p>
        <a class="hero-scroll" href="#profile"><span>${esc(t.hero.scroll)}</span></a>
      </div>
    </div>
    <p class="hero-side" aria-hidden="true">Actor / Model — Tokyo — Since 2008</p>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">${marquee}</div>
  </div>

  <section class="section" id="profile">
    <div class="section-head" data-reveal>
      <p class="eyebrow"><span>01</span>Profile</p>
      <h2>${esc(t.profile.title)}</h2>
    </div>
    <div class="profile-grid">
      <figure class="profile-photo" data-reveal>
        <img src="${root}images/profile.jpg" alt="${esc(t.seo.alt)}" width="1501" height="2000" loading="lazy" decoding="async">
      </figure>
      <div data-reveal>
        <p class="profile-intro">${esc(t.profile.intro)}</p>
        <dl class="facts">
          ${facts}
        </dl>
      </div>
    </div>
  </section>

  <section class="band" id="biography">
    <div class="band-inner">
      <figure class="bio-photo" data-reveal>
        <img src="${root}images/portrait.jpg" alt="${esc(t.seo.alt)}" width="1334" height="2000" loading="lazy" decoding="async">
      </figure>
      <div>
        <div class="section-head" data-reveal>
          <p class="eyebrow"><span>02</span>Biography</p>
          <h2>${esc(t.bio.title)}</h2>
        </div>
        <ol class="timeline">
          ${timeline}
        </ol>
      </div>
    </div>
  </section>

  <section class="section" id="works">
    <div class="section-head" data-reveal>
      <p class="eyebrow"><span>03</span>Works</p>
      <h2>${esc(t.works.title)}</h2>
    </div>
    <div class="features" data-reveal>
      ${features}
    </div>
    <div class="tabs" id="work-tabs" role="tablist">
      ${tabs}
    </div>
    ${workGroups}
    <p class="note"><span class="badge">${esc(t.works.main)}</span> <span>${esc(t.works.mainNote)}</span></p>
  </section>

  <section class="section" id="sns">
    <div class="section-head" data-reveal>
      <p class="eyebrow"><span>04</span>Social</p>
      <h2>${esc(t.sns.title)}</h2>
    </div>
    <p class="section-lead" data-reveal>${esc(t.sns.lead)}</p>
    <div class="sns-grid">
      <article class="card" data-reveal>
        <header class="card-head">
          <h3>Instagram</h3>
          <a href="${IG_URL}" ${ext}>@${esc(CONFIG.instagram)} ↗</a>
        </header>
        <div id="ig-embed" class="embed"></div>
        <a class="button" href="${IG_URL}" ${ext}>${esc(t.sns.igButton)}</a>
      </article>
      <article class="card" data-reveal>
        <header class="card-head">
          <h3>X</h3>
          <a href="${X_URL}" ${ext}>@${esc(CONFIG.x)} ↗</a>
        </header>
        <div id="x-embed" class="embed"></div>
        <a class="button" href="${X_URL}" ${ext}>${esc(t.sns.xButton)}</a>
      </article>
      <article class="card is-wide" data-reveal>
        <div class="video" id="yt-embed"></div>
        <div>
          <header class="card-head">
            <h3>YouTube</h3>
            <a href="${YT_URL}" ${ext}>@${esc(CONFIG.youtube.handle)} ↗</a>
          </header>
          <p class="card-text">${esc(t.sns.ytText)}</p>
          <a class="button" href="${YT_URL}" ${ext}>${esc(t.sns.ytButton)}</a>
        </div>
      </article>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="contact-inner" data-reveal>
      <p class="eyebrow"><span>05</span>Contact</p>
      <h2>${esc(t.contact.title)}</h2>
      <p class="contact-text">${esc(t.contact.text)}</p>
      <div class="contact-actions">
        ${contact}
      </div>
      ${CONFIG.contactEmail ? `<p class="contact-mail">${esc(CONFIG.contactEmail)}</p>` : ""}
    </div>
  </section>
</main>

<footer class="site-footer">
  <p class="footer-brand">Kiyotaka Uji</p>
  <p>© <span id="year">${new Date().getFullYear()}</span> Kiyotaka Uji</p>
  <p class="credit">${t.footer.credit}</p>
</footer>

<script src="${root}assets/config.js"></script>
<script src="${root}assets/app.js"></script>
</body>
</html>
`;
}

// 存在しないURL用のページ。GitHub Pages はどの階層でもこの1枚を返すので、絶対パスで参照する
const notFound = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 | Kiyotaka Uji</title>
<meta name="robots" content="noindex">
<link rel="icon" type="image/png" href="/favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<main class="not-found">
  <p class="eyebrow"><span>404</span>Not Found</p>
  <h1>${LANGS.map((l) => esc(I18N[l.code].notFound)).join("<br>")}</h1>
  <p>${LANGS.map((l) => `<a class="button" href="/${l.path}" lang="${I18N[l.code].htmlLang}">${esc(I18N[l.code].home)}</a>`).join("\n  ")}</p>
</main>
</body>
</html>
`;

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${LANGS.map((lang) => `  <url>
    <loc>${pageUrl(lang)}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${I18N[l.code].htmlLang}" href="${pageUrl(l)}"/>`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(LANGS[0])}"/>
${["hero", "profile", "portrait"].map((name) => `    <image:image><image:loc>${SITE}/images/${name}.jpg</image:loc></image:image>`).join("\n")}
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

for (const lang of LANGS) {
  if (lang.path) await mkdir(new URL(lang.path, ROOT), { recursive: true });
  await writeFile(new URL(`${lang.path}index.html`, ROOT), page(lang));
}
await writeFile(new URL("404.html", ROOT), notFound);
await writeFile(new URL("sitemap.xml", ROOT), sitemap);
await writeFile(new URL("robots.txt", ROOT), robots);

console.log(`Built ${LANGS.length} pages for ${SITE}`);
if (SITE.includes("USERNAME")) console.log("注意: assets/config.js の siteUrl が仮のままです。公開先のURLに書き換えてください。");
