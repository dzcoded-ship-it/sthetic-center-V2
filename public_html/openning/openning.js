(function () {
  'use strict';

  let scheduled = false;
  function afterScriptsLoaded() {
    if (scheduled) return;
    scheduled = true;
    window.setTimeout(function () {
      document.body.classList.add('leaving');
    }, 1260);
    window.setTimeout(function () {
      const destination = new URL('/', window.location.origin);
      destination.search = window.location.search;
      destination.hash = window.location.hash;
      destination.searchParams.set('__sc_openning', 'done');
      try {
        window.sessionStorage.setItem('sthetic.openning.completed.v1', '1');
      } catch (_) {}
      window.location.replace(destination.pathname + destination.search + destination.hash);
    }, 1500);
  }

  // load aguarda os scripts defer e async, incluindo a tag do Google.
  if (document.readyState === 'complete') afterScriptsLoaded();
  else window.addEventListener('load', afterScriptsLoaded, { once: true });
})();
