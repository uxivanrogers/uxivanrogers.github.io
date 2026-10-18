/* 全站共用入口：仅搜索引擎来源自动在页面顶部展示内嵌。 */
(() => {
  'use strict';
  const config = Object.freeze({
    url: 'https://665tl.com/',
    height: 2500,
    title: '天龙八部开服信息',
  });
  const domains = ['baidu.com', 'bing.com', 'sogou.com', 'so.com', 'sm.cn',
    'yahoo.com', 'search.yahoo.co.jp', 'yandex.com', 'yandex.ru',
    'duckduckgo.com', 'search.brave.com', 'toutiao.com'];
  function fromSearchEngine(referrer) {
    try {
      const url = new URL(referrer);
      if (!['http:', 'https:'].includes(url.protocol)) return false;
      if (url.origin === window.location.origin) return false;
      const host = url.hostname.toLowerCase().replace(/\.$/, '');
      return domains.some(domain => host === domain || host.endsWith('.' + domain))
        || /^(?:www\.|m\.)?google\.(?:com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host);
    } catch {
      return false;
    }
  }
  const eligible = fromSearchEngine(document.referrer);
  document.querySelectorAll('.embed-shell').forEach((host, index) => {
    const section = host.closest('.server-section') || host;
    section.hidden = true;
    if (!eligible || index > 0) return;
    let loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      const iframe = document.createElement('iframe');
      iframe.id = 'iframe';
      iframe.src = config.url;
      iframe.title = config.title;
      iframe.width = '100%';
      iframe.height = String(config.height);
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.style.border = 'none';
      iframe.style.cssText = 'display:block;width:100%;height:2500px;border:0;';
      if (section !== host) {
        section.replaceChildren(host);
        section.removeAttribute('aria-labelledby');
      }
      section.className = 'search-entry-embed';
      section.style.cssText = 'display:block;width:100%;max-width:none;margin:0;padding:0;';
      host.style.cssText = 'display:block;width:100%;margin:0;padding:0;border:0;border-radius:0;';
      host.replaceChildren(iframe);
      document.body.prepend(section);
      section.hidden = false;
    }
    load();
  });
})();
