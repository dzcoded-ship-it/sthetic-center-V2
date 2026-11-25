'use strict';
(function(){
 const root=document.documentElement;
 document.addEventListener('pointerdown',()=>{root.dataset.input='pointer';},{passive:true});
 document.addEventListener('keydown',()=>{root.dataset.input='keyboard';});
 // Keep the mobile booking shortcut clear of the final contact section.
 const contact=document.getElementById('contato'),floating=document.querySelector('.floating-contact');
 if(contact&&floating&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{floating.hidden=entries[0].isIntersecting;},{threshold:.15});observer.observe(contact);
 }
})();
