/* 首页地图：原生链接始终保留，筛选不依赖外部服务。 */
(() => {
  const input = document.querySelector('#map-search');
  if (!input) return;
  const links = [...document.querySelectorAll('[data-map-link]')];
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let count = 0;
    links.forEach(link => {
      link.hidden = !link.textContent.toLowerCase().includes(query);
      if (!link.hidden) count++;
    });
    document.querySelectorAll('.map-group').forEach(group => {
      group.hidden = ![...group.querySelectorAll('[data-map-link]')].some(link => !link.hidden);
      if (query && !group.hidden) group.open = true;
    });
    document.querySelector('#map-count').textContent = `显示${count}份参考。`;
  });
})();
