const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const entry = fs.readFileSync('public_html/entry.js', 'utf8');
const opening = fs.readFileSync('public_html/openning/openning.js', 'utf8');
function page(href, storage = new Map(), blocked = false, readyState = 'loading') {
  let current = new URL(href);
  const calls = [], timers = [], listeners = {};
  const window = {
    get location() { return {href:current.href,protocol:current.protocol,pathname:current.pathname,search:current.search,hash:current.hash,origin:current.origin,replace(url){calls.push(url);}}; },
    sessionStorage: {getItem(k){if(blocked)throw Error('SecurityError');return storage.get(k)||null;},setItem(k,v){if(blocked)throw Error('SecurityError');storage.set(k,v);}},
    history: {state:{keep:true},replaceState(state,unused,url){current=new URL(url,current);}},
    setTimeout(fn,delay){timers.push({fn,delay});},
    addEventListener(event,fn,opts){listeners[event]={fn,opts};}
  };
  const document = {readyState,body:{classList:{add(){}}}};
  return {run(code){vm.runInNewContext(code,{window,document,URL});},window,calls,timers,listeners};
}
for (const blocked of [false,true]) {
 test('complete flow, blocked storage = '+blocked,()=>{
  const storage=new Map();
  const home=page('https://www.stheticcenter.com.br/?utm_source=ads&gclid=abc#equipe',storage,blocked);
  home.run(entry);assert.equal(home.calls[0],'/openning/?utm_source=ads&gclid=abc#equipe');
  const intro=page('https://www.stheticcenter.com.br'+home.calls[0],storage,blocked);
  intro.run(opening);assert.equal(intro.timers.length,0);
  intro.listeners.load.fn();intro.listeners.load.fn();assert.equal(intro.timers.length,2);
  assert.equal(intro.timers[1].delay,1500);assert.equal(intro.calls.length,0);
  intro.timers[1].fn();
  const returned=page('https://www.stheticcenter.com.br'+intro.calls[0],storage,blocked);
  returned.run(entry);assert.equal(returned.calls.length,0);
  assert.equal(returned.window.location.href,'https://www.stheticcenter.com.br/?utm_source=ads&gclid=abc#equipe');
  if(!blocked){const again=page(returned.window.location.href,storage);again.run(entry);assert.equal(again.calls.length,0);}
 });
}
test('direct intro, already loaded scripts',()=>{
 const intro=page('https://www.stheticcenter.com.br/openning/',new Map(),false,'complete');
 intro.run(opening);assert.equal(intro.timers[1].delay,1500);intro.timers[1].fn();
 const home=page('https://www.stheticcenter.com.br'+intro.calls[0]);home.run(entry);assert.equal(home.calls.length,0);assert.equal(home.window.location.href,'https://www.stheticcenter.com.br/');
});
test('only home routes trigger opening',()=>{
 for(const route of ['/procedimentos/laser-lavieen-aguas-claras/','/whatsapp/','/openning/']){
  const p=page('https://www.stheticcenter.com.br'+route);p.run(entry);assert.equal(p.calls.length,0);
 }
 const alias=page('https://www.stheticcenter.com.br/index.html');alias.run(entry);assert.equal(alias.calls[0],'/openning/');
 const file=page('file:///site/index.html');file.run(entry);assert.equal(file.calls.length,0);
});
test('new tab/session gets opening, completed session skips it',()=>{
 const fresh=page('https://www.stheticcenter.com.br/');fresh.run(entry);assert.equal(fresh.calls[0],'/openning/');
 const done=page('https://www.stheticcenter.com.br/',new Map([['sthetic.openning.completed.v1','1']]));done.run(entry);assert.equal(done.calls.length,0);
});
test('entry script precedes home assets and is not on other routes',()=>{
 const html=fs.readFileSync('public_html/index.html','utf8');assert(html.indexOf('/entry.js?')<html.indexOf('style.css'));
 assert(!fs.readFileSync('public_html/openning/index.html','utf8').includes('/entry.js'));
});
