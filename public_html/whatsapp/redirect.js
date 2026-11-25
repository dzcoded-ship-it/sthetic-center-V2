(function(){
  'use strict';
  const generic='Olá, Sthetic Center! Gostaria de agendar uma avaliação em Águas Claras.';
  const text=new URLSearchParams(location.search).get('text')||generic;
  const destination='https://wa.me/5561996113976?text='+encodeURIComponent(text.slice(0,2000));
  let scheduled=false;
  function afterScriptsLoaded(){
    if(scheduled)return;
    scheduled=true;
    window.setTimeout(()=>window.location.replace(destination),3000);
  }
  // The load event waits for the page's resources and asynchronous scripts,
  // including the Google tag, to finish loading (or report a loading error).
  if(document.readyState==='complete')afterScriptsLoaded();
  else window.addEventListener('load',afterScriptsLoaded,{once:true});
})();
