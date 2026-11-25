(function () {
  'use strict';

  // Executado antes do conteudo da home; outras rotas nao entram neste fluxo.
  if (!/^https?:$/.test(window.location.protocol)) return;
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

  const key = 'sthetic.openning.completed.v1';
  const url = new URL(window.location.href);
  // O marcador de retorno tambem funciona quando sessionStorage esta bloqueado.
  if (url.searchParams.get('__sc_openning') === 'done') {
    try { window.sessionStorage.setItem(key, '1'); } catch (_) {}
    url.searchParams.delete('__sc_openning');
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    return;
  }

  try {
    if (window.sessionStorage.getItem(key) === '1') return;
  } catch (_) {}

  window.location.replace('/openning/' + window.location.search + window.location.hash);
})();
