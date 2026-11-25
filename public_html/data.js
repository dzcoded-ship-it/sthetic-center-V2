/* Conteúdo institucional. Não substitui avaliação nem define indicação clínica. */
(function (root) {
  const categories = {
    facial: { label: 'Estética facial', team: 'Biomedicina estética · Dra. Josy Araújo', icon: 'stars' },
    corporal: { label: 'Corporal & terapias', team: 'Corporal e fisioterapia · equipe Sthetic Center', icon: 'flower1' },
    design: { label: 'Sobrancelhas', team: 'Design de sobrancelhas · Ingrid', icon: 'eye' }
  };
  const services = [
    {id:'lavieen',name:'Laser Lavieen',category:'facial',goal:'Pele e rejuvenescimento',tags:['laser','pele','textura','viço','thulium'],description:'Converse sobre a tecnologia Lavieen e um plano de cuidado para a sua pele.'},
    {id:'toxina',name:'Toxina botulínica',category:'facial',goal:'Linhas de expressão',tags:['botox','rugas','expressão','facial'],description:'Um atendimento para conversar sobre linhas de expressão e naturalidade.'},
    {id:'bioestimuladores',name:'Bioestimuladores de colágeno',category:'facial',goal:'Firmeza e qualidade da pele',tags:['colágeno','firmeza','flacidez','pele'],description:'Explore opções de bioestimuladores e esclareça suas expectativas na avaliação.'},
    {id:'drenagem',name:'Drenagem linfática',category:'corporal',goal:'Cuidado corporal',tags:['corpo','drenagem','bem-estar','corporal'],description:'Um momento para conversar sobre seu cuidado corporal e seu bem-estar.'},
    {id:'design',name:'Design de sobrancelhas',category:'design',goal:'Desenho e acabamento do olhar',tags:['sobrancelhas','design','olhar'],description:'Um desenho pensado a partir das suas características e preferências.'},
    {id:'preenchimento',name:'Preenchimento facial',category:'facial',goal:'Contorno e harmonia facial',tags:['contorno','harmonia','lábios','mento','preenchimento','facial'],description:'Converse sobre contorno, proporções e um planejamento que respeite sua identidade.'},
    {id:'skinbooster',name:'Skinbooster / PDRN',category:'facial',goal:'Qualidade e cuidado da pele',tags:['skinbooster','pdrn','pele','viço'],description:'Leve suas dúvidas sobre skinbooster e PDRN para a avaliação individual.'},
    {id:'microagulhamento',name:'Microagulhamento',category:'facial',goal:'Textura e cuidado da pele',tags:['microagulhamento','textura','pele'],description:'Conheça as possibilidades do atendimento e os cuidados definidos para seu caso.'},
    {id:'microfocado',name:'Ultrassom microfocado',category:'facial',goal:'Firmeza e contorno',tags:['ultrassom','microfocado','firmeza','contorno'],description:'Explore o atendimento com ultrassom microfocado a partir de uma avaliação.'},
    {id:'radiofrequencia',name:'Radiofrequência',category:'facial',goal:'Cuidado facial e corporal',tags:['radiofrequência','firmeza','corpo','pele'],description:'Converse com a equipe sobre o uso da tecnologia no seu plano de cuidado.'},
    {id:'limpeza',name:'Limpeza de pele',category:'facial',goal:'Rotina de cuidado da pele',tags:['limpeza','pele','rotina','skincare'],description:'Um atendimento de cuidado da pele, com atenção às suas necessidades.'},
    {id:'revitalizacao',name:'Revitalização facial',category:'facial',goal:'Cuidado e viço da pele',tags:['revitalização','viço','pele'],description:'Converse sobre sua rotina e as possibilidades de cuidado facial na clínica.'},
    {id:'hidragloss',name:'Hidra Gloss',category:'facial',goal:'Cuidado dos lábios',tags:['hidra gloss','hidratação','lábios'],description:'Conheça o Hidra Gloss e converse sobre seu cuidado labial.'},
    {id:'plasma',name:'Jato de plasma',category:'facial',goal:'Cuidado individual da pele',tags:['jato','plasma','pele'],description:'Esclareça suas dúvidas sobre indicação e cuidados com a profissional responsável.'},
    {id:'modeladora',name:'Massagem modeladora',category:'corporal',goal:'Cuidado corporal',tags:['massagem','modeladora','corpo','corporal'],description:'Converse sobre seu objetivo e conheça o atendimento de massagem modeladora.'},
    {id:'massagem',name:'Massagem',category:'corporal',goal:'Bem-estar e relaxamento',tags:['massagem','relaxamento','bem-estar','corpo'],description:'Um atendimento voltado ao cuidado corporal e ao seu momento de bem-estar.'},
    {id:'dry',name:'Dry Needling',category:'corporal',goal:'Tensão e cuidado muscular',tags:['dry needling','dor','tensão','músculos','fisioterapia'],description:'Leve suas queixas e dúvidas para uma avaliação fisioterapêutica individual.'},
    {id:'ventosas',name:'Ventosaterapia',category:'corporal',goal:'Cuidado corporal e bem-estar',tags:['ventosa','ventosaterapia','tensão','bem-estar'],description:'Conheça essa possibilidade de terapia e converse sobre o seu caso.'},
    {id:'posoperatorio',name:'Acompanhamento pós-operatório',category:'corporal',goal:'Cuidado no pós-operatório',tags:['pós-operatório','cirurgia','fisioterapia','recuperação'],description:'Organize sua avaliação fisioterapêutica e converse sobre o acompanhamento após cirurgia.'},
    {id:'lpf',name:'LPF',category:'corporal',goal:'Cuidado corporal e movimento',tags:['lpf','low pressure fitness','corpo','postura','movimento'],description:'Conheça o atendimento com LPF e converse com a equipe sobre seus objetivos.'},
    {id:'eletroterapia',name:'Eletroterapia',category:'corporal',goal:'Cuidado fisioterapêutico',tags:['eletroterapia','fisioterapia','tensão','dor'],description:'Uma possibilidade a ser discutida no seu plano fisioterapêutico individual.'},
    {id:'auriculoterapia',name:'Auriculoterapia',category:'corporal',goal:'Cuidado e bem-estar',tags:['auriculoterapia','bem-estar','terapia'],description:'Converse sobre o atendimento de auriculoterapia e suas necessidades.'},
    {id:'henna',name:'Design com henna',category:'design',goal:'Desenho e acabamento',tags:['henna','sobrancelhas','design','olhar'],description:'Explore possibilidades de desenho e acabamento para suas sobrancelhas.'},
    {id:'brow',name:'Brow lamination',category:'design',goal:'Estilo e alinhamento das sobrancelhas',tags:['brow lamination','sobrancelhas','olhar'],description:'Converse sobre o estilo que você procura e conheça o brow lamination.'}
  ];
  const imageDescriptions = {
    lavieen:'Atendimento ilustrativo com laser facial e proteção ocular',
    toxina:'Avaliação ilustrativa da região da testa para toxina botulínica',
    bioestimuladores:'Avaliação facial e materiais ilustrativos de bioestimuladores',
    drenagem:'Cuidado ilustrativo de drenagem linfática na perna',
    design:'Desenho ilustrativo de sobrancelha com lápis de marcação',
    preenchimento:'Avaliação ilustrativa do contorno facial e dos lábios',
    skinbooster:'Ampola e atendimento facial ilustrativos de skinbooster',
    microagulhamento:'Caneta e atendimento facial ilustrativos de microagulhamento',
    microfocado:'Atendimento ilustrativo com ponteira de ultrassom no rosto',
    radiofrequencia:'Atendimento facial ilustrativo com ponteira de radiofrequência',
    limpeza:'Limpeza facial ilustrativa com algodão e faixa de cabelo',
    revitalizacao:'Cuidado facial ilustrativo com aplicação de máscara',
    hidragloss:'Aplicação ilustrativa de sérum nos lábios com aplicador',
    plasma:'Ponteira e materiais ilustrativos de jato de plasma',
    modeladora:'Atendimento corporal ilustrativo de massagem modeladora',
    massagem:'Atendimento ilustrativo de massagem e relaxamento',
    dry:'Materiais estéreis ilustrativos para dry needling',
    ventosas:'Ventosas transparentes em uma sessão ilustrativa de terapia corporal',
    posoperatorio:'Consulta fisioterapêutica ilustrativa para acompanhamento pós-operatório',
    lpf:'Atendimento ilustrativo de postura e respiração em LPF',
    eletroterapia:'Eletrodos e equipamento ilustrativos de eletroterapia',
    auriculoterapia:'Atendimento ilustrativo de auriculoterapia com sementes na orelha',
    henna:'Aplicação ilustrativa de henna na sobrancelha',
    brow:'Escovação ilustrativa dos fios em brow lamination'
  };
  services.forEach(service => {
    const slug=service.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/₂/g,'2').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    service.page='procedimentos/'+slug+'-aguas-claras/';
    service.image = 'assets/procedimentos/' + service.id + '.webp';
    service.imageSmall = 'assets/procedimentos/' + service.id + '-480.webp';
    service.imageAlt = imageDescriptions[service.id];
  });
  const goals = [
    {id:'pele',label:'Pele e rejuvenescimento',hint:'Textura, viço e qualidade da pele',category:'facial',team:'Biomedicina estética',professional:'Dra. Josy Araújo',services:['lavieen','skinbooster'],explanation:'Comece com uma avaliação facial e leve suas dúvidas sobre sua pele e sua rotina.'},
    {id:'harmonia',label:'Contorno e expressão',hint:'Naturalidade e harmonia facial',category:'facial',team:'Biomedicina estética',professional:'Dra. Josy Araújo',services:['preenchimento','toxina','bioestimuladores'],explanation:'Converse sobre suas características, seus objetivos e suas expectativas na avaliação facial.'},
    {id:'corpo',label:'Corpo e bem-estar',hint:'Cuidado corporal e relaxamento',category:'corporal',team:'Corporal e fisioterapia',professional:'Equipe Sthetic Center',services:['drenagem','modeladora','massagem'],explanation:'Conte o que gostaria de cuidar para a equipe organizar o atendimento corporal adequado.'},
    {id:'terapias',label:'Tensão e movimento',hint:'Avaliação fisioterapêutica',category:'corporal',team:'Fisioterapia',professional:'Dra. Waldirene Aquino',services:['dry','eletroterapia','lpf'],explanation:'Comece pela avaliação fisioterapêutica e converse sobre sua rotina e suas queixas.'},
    {id:'pos',label:'Pós-operatório',hint:'Acompanhamento fisioterapêutico',category:'corporal',team:'Fisioterapia',professional:'Dra. Waldirene Aquino',services:['posoperatorio'],explanation:'Organize sua avaliação com a fisioterapeuta e leve as orientações da equipe que realizou sua cirurgia.'},
    {id:'olhar',label:'Sobrancelhas e olhar',hint:'Desenho, estilo e acabamento',category:'design',team:'Design de sobrancelhas',professional:'Ingrid',services:['design','henna','brow'],explanation:'Converse sobre seu estilo e suas preferências com nossa designer de sobrancelhas.'},
    {id:'orientacao',label:'Quero orientação',hint:'Ainda estou descobrindo meu objetivo',category:'todos',team:'Avaliação e orientação',professional:'Equipe Sthetic Center',services:[],explanation:'Você pode começar por uma conversa. A equipe ajuda a entender sua procura e organizar uma avaliação.'}
  ];
  const data = {categories,services,goals,whatsapp:'5561996113976',address:'QS 1, Rua 210, lotes 34 e 36, bloco E, loja 26 · LED Office · Águas Claras, Brasília, DF'};
  root.StheticData = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(globalThis);
