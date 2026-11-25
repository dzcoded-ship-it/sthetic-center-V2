(function(){
  if(location.protocol!=='file:')return;
  const bridge=new URL('whatsapp/',document.currentScript.src);
  document.querySelectorAll('a[href^="/whatsapp/"]').forEach(link=>{
    const incoming=new URL(link.getAttribute('href'),'https://local.invalid');
    const local=new URL(bridge);local.search=incoming.search;link.href=local.href;
  });
})();
