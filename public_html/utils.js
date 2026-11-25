(function (root) {
  const icon=(root.StheticIcons || (typeof require!=='undefined'?require('./icons.js'):null)).icon;
  const bridge=(typeof document!=='undefined'&&location.protocol==='file:'&&document.currentScript)?new URL('whatsapp/index.html',document.currentScript.src).href:'/whatsapp/';
  function normalize(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/₂/g,'2').trim(); }
  function filterServices(services,category,query) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return services.filter(s => (category === 'todos' || s.category === category) && words.every(word => normalize([s.name,s.goal,s.description,...s.tags].join(' ')).includes(word)));
  }
  function whatsappURL(number,interest='',context='') {
    let message='Olá, Sthetic Center! Gostaria de agendar uma avaliação em Águas Claras.';
    if(interest)message='Olá, Sthetic Center! Tenho interesse em '+interest+' em Águas Claras. Gostaria de saber sobre a avaliação e a disponibilidade.';
    if(context)message+='\n\n'+context;
    return bridge+'?text='+encodeURIComponent(message);
  }
  function getHours(date) {
    const parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
    const values = Object.fromEntries(parts.map(p=>[p.type,p.value]));
    const day = values.weekday;
    const time = Number(values.hour)*60+Number(values.minute);
    const end = day==='Sat'?720:1140;
    const open = day!=='Sun' && time>=540 && time<end;
    const text = open ? 'Dentro do horário habitual · atendimento por agendamento' : 'Fora do horário habitual · você pode deixar sua mensagem';
    return {open,text,day};
  }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function procedureCardHTML(service,category,hidden=false) {
    const e=escapeHTML, s=service, c=category;
    return '<article class="procedure-card" id="procedimento-'+s.id+'"'+(hidden?' hidden':'')+'><a class="procedure-media" href="'+e(s.page)+'" aria-label="Ver imagem e detalhes de '+e(s.name)+'"><img src="'+e(s.image)+'" srcset="'+e(s.imageSmall)+' 480w, '+e(s.image)+' 800w" sizes="(max-width:650px) calc(100vw - 40px), (max-width:900px) calc((100vw - 64px)/2), 400px" alt="'+e(s.imageAlt)+'" width="800" height="500" loading="lazy" decoding="async"><span class="image-label">Imagem ilustrativa</span></a><div class="card-content"><div class="card-top"><span class="card-category">'+e(c.label)+'</span><span class="card-icon" aria-hidden="true">'+icon(c.icon)+'</span></div><h3>'+e(s.name)+'</h3><p>'+e(s.description)+'</p><div class="card-bottom"><span class="card-tag">'+e(s.goal)+'</span><a class="text-link card-details" href="'+e(s.page)+'" aria-label="Conhecer '+e(s.name)+'">Conhecer <span aria-hidden="true">'+icon("arrow-up-right")+'</span></a></div></div></article>';
  }
  const utils = {icon,normalize,filterServices,whatsappURL,getHours,escapeHTML,procedureCardHTML};
  root.StheticUtils = utils;
  if(typeof module !== 'undefined' && module.exports) module.exports = utils;
})(globalThis);
