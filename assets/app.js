// ページの本文は scripts/build.mjs がHTMLに書き出している。
// ここでは画面上の動き（タブ・メニュー・SNSの埋め込みなど）だけを扱う。
(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG;
  var html = document.documentElement;
  var lang = html.getAttribute("data-lang") || "ja";
  var root = html.getAttribute("data-root") || "";
  var LANG_PATHS = { ja: "", en: "en/", zh: "zh/", ko: "ko/" };
  var DATE_LOCALE = { ja: "ja-JP", en: "en-US", zh: "zh-CN", ko: "ko-KR" };

  // 以前の形式のURL（?lang=en など）で来た場合は、その言語のページへ移動する
  var requested = new URLSearchParams(location.search).get("lang");
  if (requested && requested !== lang && LANG_PATHS.hasOwnProperty(requested)) {
    location.replace(root + LANG_PATHS[requested] + location.hash);
    return;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function externalLink(href, cls, text) {
    var a = el("a", cls, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  // 出演作品のタブ: HTMLには全カテゴリが書かれているので、選ばれたカテゴリだけを表示する
  var tabs = document.querySelectorAll("#work-tabs .tab");
  var groups = document.querySelectorAll(".work-group");
  function showCategory(cat) {
    tabs.forEach(function (tab) { tab.setAttribute("aria-selected", String(tab.getAttribute("data-cat") === cat)); });
    groups.forEach(function (group) { group.hidden = group.getAttribute("data-cat") !== cat; });
  }
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { showCategory(tab.getAttribute("data-cat")); });
  });
  if (tabs.length) {
    html.classList.add("has-tabs");
    showCategory(tabs[0].getAttribute("data-cat"));
  }

  // Xの最新投稿（data/x.json を GitHub Actions が自動更新）をカードで表示する。
  // X公式ウィジェットは広告ブロック等で表示されないことが多いため、自前で描画している。
  function renderX(posts) {
    var box = document.getElementById("x-embed");
    box.textContent = "";
    if (!posts || !posts.length) {
      box.appendChild(el("p", "embed-empty", "@" + CONFIG.x));
      return;
    }
    posts.forEach(function (post) {
      var a = externalLink(post.url, "x-post");
      if (post.image) {
        var img = document.createElement("img");
        img.src = root + post.image;
        img.alt = "";
        img.loading = "lazy";
        a.appendChild(img);
      }
      var body = el("div", "x-post-body");
      var time = el("time", null, new Date(post.date).toLocaleDateString(DATE_LOCALE[lang], { year: "numeric", month: "short", day: "numeric" }));
      time.dateTime = post.date;
      body.appendChild(time);
      var text = el("p", null, post.text);
      text.lang = "ja";
      body.appendChild(text);
      a.appendChild(body);
      box.appendChild(a);
    });
  }

  function loadScript(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.body.appendChild(s);
  }

  // Instagram・YouTubeの公式埋め込み。投稿すると自動で最新の内容になる。
  // ページの表示を遅くしないよう、SNSセクションが近づいたときに1回だけ読み込む。
  function loadEmbeds() {
    var igUrl = "https://www.instagram.com/" + CONFIG.instagram + "/";
    var ig = el("blockquote", "instagram-media");
    ig.setAttribute("data-instgrm-permalink", igUrl);
    ig.setAttribute("data-instgrm-version", "14");
    ig.appendChild(externalLink(igUrl, null, "@" + CONFIG.instagram));
    document.getElementById("ig-embed").appendChild(ig);
    loadScript("https://www.instagram.com/embed.js");

    // チャンネルのアップロード一覧（ショートを除く）を指定しているので、
    // 新しい動画を公開すると自動でそれが先頭に表示される。
    var yt = document.createElement("iframe");
    yt.src = "https://www.youtube-nocookie.com/embed/videoseries?list=UULF" + CONFIG.youtube.channelId.slice(2);
    yt.title = "YouTube";
    yt.loading = "lazy";
    yt.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    yt.allowFullscreen = true;
    yt.referrerPolicy = "strict-origin-when-cross-origin";
    document.getElementById("yt-embed").appendChild(yt);

    fetch(root + "data/x.json", { cache: "no-cache" })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) { renderX(data && data.posts); })
      .catch(function () { renderX(null); });
  }

  // ヘッダー: スクロールで背景を付ける / スマホ用メニュー
  var header = document.querySelector(".site-header");
  var menuButton = document.getElementById("menu-button");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }
  menuButton.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
  document.querySelectorAll("#nav a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // スクロールに合わせたフェードイン
  if ("IntersectionObserver" in window) {
    html.classList.add("has-reveal");
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); reveal.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (node) { reveal.observe(node); });

    var sns = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { sns.disconnect(); loadEmbeds(); }
    }, { rootMargin: "600px 0px" });
    sns.observe(document.getElementById("sns"));
  } else {
    loadEmbeds();
  }
})();
