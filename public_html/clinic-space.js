'use strict';
(function(){
 const dialog=document.getElementById('spaceDialog'),data=document.getElementById('clinicSpacePhotos');
 if(!dialog||!data)return;
 const photos=JSON.parse(data.textContent),image=document.getElementById('spaceDialogImage'),title=document.getElementById('spaceDialogTitle'),caption=document.getElementById('spaceDialogCaption');
 let index=0,origin;
 function announce(){caption.textContent='Foto '+(index+1)+' de '+photos.length+' · '+photos[index].title;image.parentElement.setAttribute('aria-busy','false');}
 image.addEventListener('load',announce);
 image.addEventListener('error',()=>{image.parentElement.setAttribute('aria-busy','false');caption.textContent='Não foi possível carregar esta foto. Use Anterior ou Próxima para continuar na galeria.';});
 function show(next){index=(next+photos.length)%photos.length;const p=photos[index];image.parentElement.setAttribute('aria-busy','true');caption.textContent='Carregando foto '+(index+1)+' de '+photos.length+'…';image.src='assets/clinica/'+p.name+'.webp';image.alt=p.alt;image.width=p.width;image.height=p.height;title.textContent=p.title;if(image.complete&&image.naturalWidth)announce();}
 document.querySelectorAll('[data-space-photo]').forEach(link=>link.addEventListener('click',event=>{
  if(typeof dialog.showModal!=='function')return;
  event.preventDefault();origin=link;show(Number(link.dataset.spacePhoto));dialog.showModal();document.body.classList.add('clinic-space-open');dialog.querySelector('[data-space-close]').focus();
 }));
 dialog.querySelector('[data-space-prev]').addEventListener('click',()=>show(index-1));
 dialog.querySelector('[data-space-next]').addEventListener('click',()=>show(index+1));
 dialog.querySelector('[data-space-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}else if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('clinic-space-open');origin?.focus({preventScroll:true});});
})();
