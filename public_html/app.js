'use strict';
(function () {
  const D = window.StheticData, U = window.StheticUtils;
  const $ = id => document.getElementById(id);
  const state = {category:'todos',query:'',expanded:false,procedure:null,guideStep:0,goal:null,preference:''};
  const serviceById = new Map(D.services.map(s=>[s.id,s]));
  const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const grid = $('procedureGrid');
  const menu = $('mainNav'), menuToggle = $('menuToggle');
  let modalOrigin = null;
  let hoursTimer;

  function closeMenu() { menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu'); }
  menuToggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu.classList.contains('open')){closeMenu();menuToggle.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  if(window.matchMedia){const media=window.matchMedia('(max-width: 900px)');media.addEventListener?.('change',()=>{if(!media.matches)closeMenu();});}

  function renderServices() {
    const results = U.filterServices(D.services,state.category,state.query);
    const visible = state.expanded ? results : results.slice(0,6);
    document.querySelectorAll('[data-category]').forEach(b=>{const on=b.dataset.category===state.category;b.setAttribute('aria-pressed',String(on));b.classList.toggle('active',on);});
    $('resultCount').textContent = results.length ? (results.length===1 ? '1 procedimento encontrado' : (visible.length===results.length ? results.length+' procedimentos encontrados' : visible.length+' de '+results.length+' procedimentos')) : 'Nenhum procedimento encontrado';
    $('showMore').hidden = results.length<=6;
    $('showMore').innerHTML = state.expanded ? 'Mostrar menos <span aria-hidden="true">'+U.icon("dash")+'</span>' : 'Ver todos os '+results.length+' procedimentos <span aria-hidden="true">'+U.icon("plus")+'</span>';
    $('resetFilters').hidden = state.category==='todos' && !state.query;
    if(!results.length) {
      grid.innerHTML='<div class="empty-results"><h3>Vamos encontrar outro caminho?</h3><p>Tente buscar por pele, massagem ou sobrancelhas. Se preferir, nossa equipe pode orientar você.</p><button type="button" class="button button-outline" data-clear>Limpar busca e filtros</button></div>';
      return;
    }
    grid.innerHTML = results.map((s,index)=>U.procedureCardHTML(s,D.categories[s.category],!state.expanded && index>=6)).join('');
  }
  function setCategory(category) { state.category=category;state.query='';state.expanded=false;$('searchInput').value='';renderServices(); }
  document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
  $('searchInput').addEventListener('input',e=>{state.query=e.target.value;state.expanded=true;renderServices();});
  $('resetFilters').addEventListener('click',()=>{setCategory('todos');$('searchInput').focus();});
  grid.addEventListener('click',e=>{if(e.target.closest('[data-clear]')){setCategory('todos');$('searchInput').focus();}});
  $('showMore').addEventListener('click',()=>{const wasExpanded=state.expanded;state.expanded=!wasExpanded;renderServices();if(wasExpanded){$('procedimentos').scrollIntoView({block:'start'});}});
  document.querySelectorAll('[data-team-category]').forEach(b=>b.addEventListener('click',()=>{setCategory(b.dataset.teamCategory);$('procedimentos').scrollIntoView({block:'start'});$('searchInput').focus({preventScroll:true});}));

  function openDialog(id,origin) { modalOrigin=origin || document.activeElement;const dialog=$(id);if(typeof dialog.showModal==='function')dialog.showModal();else {dialog.setAttribute('open','');dialog.scrollIntoView({block:'center'});} }
  function closeDialog(id) { const dialog=$(id);if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open'); }
  document.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.dataset.closeDialog)));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog.id);}});
    dialog.addEventListener('close',()=>{if(modalOrigin?.isConnected)modalOrigin.focus({preventScroll:true});});
  });
  const careTabs=[...document.querySelectorAll('[data-step]')];
  function showCareStep(index,focus=false) {
    if(index<0||index>2)return;
    $('journeyTrack').toggleAttribute('data-instant',focus);
    $('journeyTrack').style.transform='translateX(-'+index*100+'%)';
    careTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;const panel=$('carePanel'+i);panel.inert=i!==index;panel.setAttribute('aria-hidden',String(i!==index));panel.tabIndex=i===index?0:-1;});
    if(focus)careTabs[index].focus();
  }
  careTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>showCareStep(index));
    tab.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight')next=(index+1)%3;else if(e.key==='ArrowLeft')next=(index+2)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;e.preventDefault();showCareStep(next,true);});
  });

  const preferences=[{id:'avaliacao',label:'Quero minha primeira avaliação',hint:'Entender meu caso com a profissional'},{id:'informacao',label:'Quero conhecer as possibilidades',hint:'Tirar dúvidas antes de agendar'},{id:'retorno',label:'Quero retomar meu cuidado',hint:'Conversar sobre continuidade e retorno'}];
  const guideContent=$('guideContent');
  function renderGuide(focus=true) {
    document.querySelectorAll('.guide-progress span').forEach((span,i)=>span.classList.toggle('done',i<=state.guideStep));
    if(state.guideStep===0) {
      guideContent.innerHTML='<h2 id="guideTitle" tabindex="-1">O que você gostaria de cuidar?</h2><p class="guide-subtitle">Escolha o que mais se aproxima do seu objetivo.</p><div class="guide-options">'+D.goals.map(g=>'<button type="button" class="guide-option" data-goal="'+g.id+'"><span class="option-title">'+escape(g.label)+'</span><span class="option-description">'+escape(g.hint)+'</span></button>').join('')+'</div><p class="guide-result-note">Este guia organiza áreas de atendimento. A indicação do tratamento acontece na avaliação profissional.</p>';
    } else if(state.guideStep===1) {
      guideContent.innerHTML='<h2 id="guideTitle" tabindex="-1">Como você quer começar?</h2><p class="guide-subtitle">Seu objetivo: '+escape(state.goal.label)+'.</p><div class="guide-options">'+preferences.map(p=>'<button type="button" class="guide-option" data-preference="'+p.id+'"><span class="option-title">'+escape(p.label)+'</span><span class="option-description">'+escape(p.hint)+'</span></button>').join('')+'</div><button type="button" class="small-link guide-back" data-guide-back>'+U.icon("arrow-left")+' Mudar meu objetivo</button>';
    } else {
      const g=state.goal;
      guideContent.innerHTML='<h2 id="guideTitle" tabindex="-1">Um ponto de partida para você.</h2><p class="guide-subtitle">'+escape(g.explanation)+'</p><div class="guide-result-meta"><h3>'+escape(g.team)+'</h3><p>'+escape(g.professional)+'<br>'+escape(g.label)+' · '+escape(state.preference)+'</p></div>'+(g.services.length?'<div class="guide-related"><p>Serviços que você pode conhecer e discutir na avaliação:</p>'+g.services.map(id=>'<a class="related-button" href="'+escape(serviceById.get(id).page)+'">'+escape(serviceById.get(id).name)+'<span aria-hidden="true">'+U.icon("arrow-up-right")+'</span></a>').join('')+'</div>':'')+'<div class="guide-result-actions"><a class="button button-gold" href="'+escape(U.whatsappURL(D.whatsapp,g.label,state.preference))+'" target="_self" rel="noopener noreferrer" data-guide-contact>Conversar pelo WhatsApp <span aria-hidden="true">'+U.icon("arrow-up-right")+'</span></a><button type="button" class="text-link" data-guide-catalogue>Explorar essa área <span aria-hidden="true">'+U.icon("arrow-up-right")+'</span></button></div><p class="guide-result-note">O guia não faz diagnóstico nem indica um procedimento para o seu caso. A profissional responsável define o cuidado com você.</p><button type="button" class="small-link guide-back" data-guide-restart>'+U.icon("arrow-left")+' Começar de novo</button>';
    }
    $('guideDialog').scrollTop=0;
    if(focus)$('guideTitle').focus({preventScroll:true});
  }
  document.querySelectorAll('[data-open-guide]').forEach(b=>b.addEventListener('click',()=>{state.guideStep=0;state.goal=null;state.preference='';renderGuide(false);openDialog('guideDialog',b);$('guideTitle').focus();}));
  guideContent.addEventListener('click',e=>{
    const goal=e.target.closest('[data-goal]');const pref=e.target.closest('[data-preference]');
    if(goal){state.goal=D.goals.find(g=>g.id===goal.dataset.goal);state.guideStep=1;renderGuide();}
    else if(pref){state.preference=preferences.find(p=>p.id===pref.dataset.preference).label;state.guideStep=2;renderGuide();}
    else if(e.target.closest('[data-guide-back]')){state.guideStep=0;renderGuide();}
    else if(e.target.closest('[data-guide-restart]')){state.guideStep=0;state.goal=null;renderGuide();}
    else if(e.target.closest('[data-guide-contact]')){closeDialog('guideDialog');}
    else if(e.target.closest('[data-guide-catalogue]')){const category=state.goal.category;closeDialog('guideDialog');setCategory(category);$('procedimentos').scrollIntoView({block:'start'});$('searchInput').focus({preventScroll:true});}
  });

  async function copyText(text) {
    try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true;}}catch(error){/* Use a user-triggered local fallback. */}
    const origin=document.activeElement;const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';area.setAttribute('aria-label','Texto para copiar');document.body.append(area);area.select();let copied=false;try{copied=document.execCommand('copy');}catch(error){copied=false;}area.remove();origin?.focus({preventScroll:true});return copied;
  }
  $('copyAddress').addEventListener('click',async()=>{$('addressStatus').textContent=await copyText(D.address)?'Endereço copiado.':'Selecione o endereço acima e copie manualmente.';});
  function refreshHours(){const hours=U.getHours(new Date());$('hoursStatus').textContent=hours.text;$('hoursStatus').classList.toggle('in-hours',hours.open);}
  refreshHours();hoursTimer=window.setInterval(refreshHours,60000);
  window.addEventListener('pagehide',()=>window.clearInterval(hoursTimer));
  window.addEventListener('pageshow',e=>{if(e.persisted){refreshHours();hoursTimer=window.setInterval(refreshHours,60000);}});
  $('year').textContent=new Date().getFullYear();
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){menu.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-20% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
  renderServices();
})();
