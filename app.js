const $ = (id) => document.getElementById(id);
const titles = {
  number: ['Number theory', 'GCD & LCM finder', '04'],
  prime: ['Prime checker', 'Prime number checker', '01'],
  complex: ['Complex roots', 'Complex square roots', '02'],
  quadratic: ['Quadratics', 'Quadratic equation solver', '03']
};
const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const clean = (x) => Math.abs(x) < 1e-11 ? 0 : x;
const fmtNum = (x) => { x = clean(x); return Number.isInteger(x) ? String(x) : String(Number(x.toPrecision(9))); };
let lastNumberResult = null;
let numberHistory = [];
let toastTimer;

$('date').textContent = new Intl.DateTimeFormat(undefined, {weekday:'short', month:'short', day:'numeric'}).format(new Date()).toUpperCase();
if (localStorage.getItem('number-theory-theme') === 'light') document.documentElement.dataset.theme = 'light';
$('theme').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('number-theory-theme', next);
});
function toast(message) { const el=$('toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2200); }
function setTool(name) {
  document.querySelectorAll('.tool-view').forEach(el=>el.classList.toggle('active',el.id===`view-${name}`));
  document.querySelectorAll('.nav a[data-tool]').forEach(el=>el.classList.toggle('active',el.dataset.tool===name));
  $('crumb').textContent=titles[name][0]; $('view-title').textContent=titles[name][1]; $('view-index').textContent=titles[name][2];
}
document.querySelectorAll('.nav a[data-tool]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();setTool(el.dataset.tool);}));

function integerInput(id, label, maxDigits=100) {
  const raw=$(id).value.trim().replaceAll(',','');
  if(!/^[+-]?\d+$/.test(raw)) throw new Error(`${label} must be a whole number.`);
  if(raw.replace(/^[+-]/,'').length>maxDigits) throw new Error(`${label} can be up to ${maxDigits} digits.`);
  return BigInt(raw);
}
function setError(id, message) { $(id).textContent=message; }
function euclid(a,b) { const rows=[]; let x=a<0n?-a:a, y=b<0n?-b:b; while(y){const q=x/y,r=x%y;rows.push({x,y,q,r});[x,y]=[y,r];} return {g:x,rows}; }
function factorize(value) {
  let n=value; const factors=new Map();
  for(let p=2;p*p<=n;p+=p===2?1:2) while(n%p===0){factors.set(p,(factors.get(p)||0)+1);n/=p;}
  if(n>1) factors.set(n,(factors.get(n)||0)+1);
  return factors;
}
function renderFactorVenn(a,b) {
  const box=$('number-venn');
  if(a>1000000000000n||b>1000000000000n){box.innerHTML='<div class="empty"><div class="o">∞</div>These values are too large to visualise prime factors.</div>';return;}
  const fa=factorize(Number(a)),fb=factorize(Number(b)),common=[],onlyA=[],onlyB=[];
  new Set([...fa.keys(),...fb.keys()]).forEach(p=>{const ea=fa.get(p)||0,eb=fb.get(p)||0,m=Math.min(ea,eb);for(let i=0;i<m;i++)common.push(p);for(let i=0;i<ea-m;i++)onlyA.push(p);for(let i=0;i<eb-m;i++)onlyB.push(p);});
  const list=arr=>{const s=arr.join(' · ');return s.length>18?s.slice(0,17)+'…':(s||'—');};
  box.innerHTML=`<svg class="venn" viewBox="0 0 560 250" role="img" aria-label="Venn diagram of prime factors"><defs><radialGradient id="ga"><stop offset="0" stop-color="#6ee7b7" stop-opacity=".35"/><stop offset="1" stop-color="#6ee7b7" stop-opacity=".08"/></radialGradient><radialGradient id="gb"><stop offset="0" stop-color="#a78bfa" stop-opacity=".35"/><stop offset="1" stop-color="#a78bfa" stop-opacity=".08"/></radialGradient></defs><circle cx="210" cy="125" r="108" fill="url(#ga)" stroke="#6ee7b7" stroke-opacity=".7"/><circle cx="350" cy="125" r="108" fill="url(#gb)" stroke="#a78bfa" stroke-opacity=".7"/><text class="cap" x="150" y="40">${fmt(a)}</text><text class="cap" x="410" y="40">${fmt(b)}</text><text x="148" y="130">${list(onlyA)}</text><text x="280" y="122" style="font-size:15px;font-weight:600;fill:var(--mint)">${list(common)}</text><text class="cap" x="280" y="145">SHARED</text><text x="412" y="130">${list(onlyB)}</text></svg><div class="legend"><span><i style="background:#6ee7b7"></i>Only in ${fmt(a)}</span><span><i style="background:var(--mint)"></i>Shared → GCD</span><span><i style="background:#a78bfa"></i>Only in ${fmt(b)}</span></div>`;
}
function renderNumberSteps(rows) {
  $('number-steps').innerHTML=rows.map((r,i)=>`<li class="${i===rows.length-1?'last':''}" style="animation-delay:${i*100}ms"><span class="dot">${String(i+1).padStart(2,'0')}</span><span class="eq"><b>${fmt(r.x)}</b> <span class="op">=</span> ${fmt(r.y)} <span class="op">×</span> ${fmt(r.q)} <span class="op">+</span> <span class="r">${fmt(r.r)}</span></span></li>`).join('')||'<li class="static-step"><span class="dot">01</span><span>The GCD is the number itself.</span></li>';
}
function computeNumber() {
  try {
    setError('number-error',''); const a=integerInput('number-a','First integer'),b=integerInput('number-b','Second integer');
    if(a<=0n||b<=0n) throw new Error('Enter positive whole numbers.');
    const {g,rows}=euclid(a,b),l=a/g*b; lastNumberResult={a,b,g,l};
    $('number-status').textContent='FOUND'; $('number-gcd').textContent=fmt(g); $('number-lcm').textContent=fmt(l);
    $('number-meta').innerHTML=`<span class="pill">coprime <b>${g===1n?'yes':'no'}</b></span><span class="pill">a ÷ gcd <b>${fmt(a/g)}</b></span><span class="pill">b ÷ gcd <b>${fmt(b/g)}</b></span>`;
    renderFactorVenn(a,b); renderNumberSteps(rows);
    $('number-check').innerHTML=`gcd × lcm = <b>${fmt(g)}</b> × <b>${fmt(l)}</b> = ${fmt(g*l)}<br>a × b &nbsp;&nbsp;&nbsp;= ${fmt(a)} × ${fmt(b)} = ${fmt(a*b)} ✓`;
    const key=`${a},${b}`; numberHistory=[key,...numberHistory.filter(x=>x!==key)].slice(0,4);
    $('number-history').innerHTML=numberHistory.map(k=>{const[x,y]=k.split(',');return `<button class="chip" data-example="number" data-value="${x},${y}">${fmt(BigInt(x))} &amp; ${fmt(BigInt(y))}</button>`;}).join('');
  } catch(e) { $('number-status').textContent='CHECK INPUT'; setError('number-error',e.message); toast(e.message); }
}
$('number-form').addEventListener('submit',e=>{e.preventDefault();computeNumber();});
$('number-swap').addEventListener('click',()=>{const a=$('number-a').value;$('number-a').value=$('number-b').value;$('number-b').value=a;computeNumber();});
$('number-copy').addEventListener('click',async()=>{if(!lastNumberResult)return;const{a,b,g,l}=lastNumberResult;try{await navigator.clipboard.writeText(`GCD(${a}, ${b}) = ${g}; LCM = ${l}`);$('number-copy').textContent='Copied ✓';}catch{$('number-copy').textContent='Copy unavailable';}setTimeout(()=>$('number-copy').textContent='Copy result',1500);});

function modPow(base,exponent,modulus){let out=1n;base%=modulus;while(exponent>0n){if(exponent&1n)out=out*base%modulus;base=base*base%modulus;exponent>>=1n;}return out;}
function primeCheck(n){
  if(n<2n)return{prime:false,reason:'Numbers below 2 are not prime.'};
  const small=[2n,3n,5n,7n,11n,13n,17n,19n,23n,29n,31n,37n];
  for(const p of small){if(n===p)return{prime:true,exact:true};if(n%p===0n)return{prime:false,factor:p};}
  let d=n-1n,s=0;while(d%2n===0n){d/=2n;s++;}
  const bases=[2n,325n,9375n,28178n,450775n,9780504n,1795265022n,41n,43n,47n,53n,59n,61n,67n,71n,73n];
  for(const base of bases){if(base%n===0n)continue;let x=modPow(base,d,n);if(x===1n||x===n-1n)continue;let witness=true;for(let r=1;r<s;r++){x=x*x%n;if(x===n-1n){witness=false;break;}}if(witness)return{prime:false};}
  return{prime:true,exact:n<(1n<<64n)};
}
function renderPrimeVisual(n,result){
  const tests=[2n,3n,5n,7n,11n,13n,17n,19n,23n,29n],checks=tests.map(p=>({p,divides:n>p&&n%p===0n}));
  $('prime-visual').innerHTML=`<div class="prime-meter">${checks.map(({p,divides})=>`<div class="prime-meter-line"><span>${p}</span><span class="meter"><i style="--width:${divides?'100%':(32+Number(p%5n)*9)+'%'}"></i></span><b>${divides?'divides':'clear'}</b></div>`).join('')}</div><div class="legend"><span><i style="background:var(--mint)"></i>${result.prime?'No small divisor found':'Small factors checked'} · through 29</span></div>`;
}
function renderPrimeSteps(n,result){
  const lines=[`Check that ${fmt(n)} is greater than 1.`, 'Test divisibility by small prime numbers through 37.', result.prime?'Use repeated-squaring primality rounds.':result.factor?`Found a divisor: ${fmt(result.factor)}.`:'A repeated-squaring witness proves it composite.', result.prime?'No tested divisor divides it.':`${fmt(n)} is composite.`];
  $('prime-steps').innerHTML=lines.map((s,i)=>`<li class="${i===lines.length-1?'last':''}" style="animation-delay:${i*90}ms"><span class="dot">${String(i+1).padStart(2,'0')}</span><span class="eq">${s}</span></li>`).join('');
}
function computePrime(value){
  try{
    setError('prime-error','');const n=integerInput('prime-input','The number');const result=primeCheck(n);$('prime-value').textContent=fmt(n);$('prime-answer').textContent=result.prime?(result.exact?'PRIME':'PROBABLE'):'NO';$('prime-summary').textContent=result.prime?(result.exact?'Exactly prime':'Passed 16 strong probable-prime rounds'):(result.reason||'Composite number');$('prime-status').textContent=result.prime?(result.exact?'PRIME':'PROBABLE PRIME'):'COMPOSITE';$('prime-meta').innerHTML=`<span class="pill">greater than 1 <b>${n>1n?'yes':'no'}</b></span>${result.factor?`<span class="pill">divisor <b>${fmt(result.factor)}</b></span>`:''}<span class="pill">checked <b>BigInt</b></span>`;renderPrimeVisual(n,result);renderPrimeSteps(n,result);
  }catch(e){$('prime-status').textContent='CHECK INPUT';setError('prime-error',e.message);toast(e.message);}
}
$('prime-form').addEventListener('submit',e=>{e.preventDefault();computePrime();});

function complexText(re,im){re=clean(re);im=clean(im);if(!im)return fmtNum(re);if(!re)return `${fmtNum(im)}i`;return `${fmtNum(re)} ${im<0?'−':'+'} ${fmtNum(Math.abs(im))}i`;}
function drawComplex(a,b,u,v){
  const scale=Math.max(1,Math.abs(u),Math.abs(v),Math.abs(a),Math.abs(b))*1.15;
  const x=z=>280+z/scale*220,y=z=>125-z/scale*88;
  $('complex-visual').innerHTML=`<svg class="venn" viewBox="0 0 560 250" role="img" aria-label="Complex plane showing the roots and their square"><line x1="35" y1="125" x2="525" y2="125" stroke="var(--border-strong)"/><line x1="280" y1="20" x2="280" y2="230" stroke="var(--border-strong)"/><circle cx="${x(u)}" cy="${y(v)}" r="7" fill="#6ee7b7"/><circle cx="${x(-u)}" cy="${y(-v)}" r="7" fill="#a78bfa"/><circle cx="${x(a)}" cy="${y(b)}" r="5" fill="#ff9d7a"/><text class="cap" x="${x(u)}" y="${Math.max(15,y(v)-14)}">√z</text><text class="cap" x="${x(-u)}" y="${Math.min(240,y(-v)+22)}">−√z</text><text class="cap" x="${Math.min(500,x(a)+20)}" y="${Math.max(15,y(b)-13)}">z</text><text class="cap" x="510" y="115">Re</text><text class="cap" x="290" y="25">Im</text></svg><div class="legend"><span><i style="background:#6ee7b7"></i>First root</span><span><i style="background:#a78bfa"></i>Opposite root</span><span><i style="background:#ff9d7a"></i>Original number</span></div>`;
}
function computeComplex(){
  try{
    setError('complex-error','');const a=Number($('complex-a').value),b=Number($('complex-b').value);if(!Number.isFinite(a)||!Number.isFinite(b))throw new Error('Enter finite real and imaginary parts.');if(Math.max(Math.abs(a),Math.abs(b))>1e150)throw new Error('Please use values smaller than 10¹⁵⁰.');
    const r=Math.hypot(a,b);let u,v;if(b===0&&a<0){u=0;v=Math.sqrt(-a);}else{u=Math.sqrt(Math.max(0,(r+a)/2));v=Math.sign(b||1)*Math.sqrt(Math.max(0,(r-a)/2));}
    $('complex-status').textContent='2 ROOTS';$('complex-answer').innerHTML=`<div class="root-pair"><div class="root-value"><small>First root</small><strong>${complexText(u,v)}</strong></div><div class="root-value second"><small>Opposite root</small><strong>${complexText(-u,-v)}</strong></div></div>`;$('complex-meta').innerHTML=`<span class="pill">modulus <b>${fmtNum(r)}</b></span><span class="pill">two opposite roots</span>`;
    $('complex-steps').innerHTML=[`|z| = √(a² + b²) = ${fmtNum(r)}`,`Real part = √((|z| + a) / 2) = ${fmtNum(u)}`,`Imaginary part = sign(b) · √((|z| − a) / 2) = ${fmtNum(v)}`,'Squaring either root returns the original number.'].map((s,i)=>`<li class="${i===3?'last':''}" style="animation-delay:${i*100}ms"><span class="dot">${String(i+1).padStart(2,'0')}</span><span class="eq">${s}</span></li>`).join('');drawComplex(a,b,u,v);
  }catch(e){$('complex-status').textContent='CHECK INPUT';setError('complex-error',e.message);toast(e.message);}
}
$('complex-form').addEventListener('submit',e=>{e.preventDefault();computeComplex();});

function computeQuadratic(){
  try{
    setError('quadratic-error','');const a=Number($('quad-a').value),b=Number($('quad-b').value),c=Number($('quad-c').value);if(![a,b,c].every(Number.isFinite))throw new Error('Enter finite coefficients.');if(Math.max(Math.abs(a),Math.abs(b),Math.abs(c))>1e150)throw new Error('Please use coefficients smaller than 10¹⁵⁰.');
    if(a===0){if(b===0)throw new Error(c===0?'Every value of x is a solution.':'This equation has no solution.');const x=-c/b;$('quadratic-status').textContent='LINEAR';$('quadratic-answer').innerHTML=`<div class="root-pair"><div class="root-value"><small>Solution</small><strong>x = ${fmtNum(x)}</strong></div></div>`;$('quadratic-meta').innerHTML='<span class="pill">linear equation <b>a = 0</b></span>';$('quadratic-steps').innerHTML=[`Since a = 0, solve bx + c = 0.`,`x = −c / b = ${fmtNum(x)}`].map((s,i)=>`<li class="${i===1?'last':''}"><span class="dot">0${i+1}</span><span class="eq">${s}</span></li>`).join('');$('quadratic-visual').innerHTML='<div class="empty"><div class="o">x</div>This simplifies to a linear equation.</div>';return;}
    const d=b*b-4*a*c,den=2*a;$('quadratic-status').textContent=d<0?'2 COMPLEX ROOTS':d===0?'REPEATED ROOT':'2 REAL ROOTS';$('quadratic-meta').innerHTML=`<span class="pill">discriminant <b>Δ = ${fmtNum(d)}</b></span><span class="pill">${d<0?'complex roots':'real roots'}</span>`;
    let rootText,step;
    if(d>=0){const x1=(-b+Math.sqrt(d))/den,x2=(-b-Math.sqrt(d))/den;rootText=Math.abs(x1-x2)<1e-10?`x = ${fmtNum(x1)}`:`x = ${fmtNum(x1)} and ${fmtNum(x2)}`;step=d===0?'The repeated root is −b / 2a.':'Use x = (−b ± √Δ) / 2a.';$('quadratic-answer').innerHTML=`<div class="root-pair"><div class="root-value"><small>${d===0?'Repeated root':'First root'}</small><strong>${fmtNum(x1)}</strong></div>${d===0?'':`<div class="root-value second"><small>Second root</small><strong>${fmtNum(x2)}</strong></div>`}</div>`;}
    else{const re=-b/den,im=Math.sqrt(-d)/Math.abs(den);rootText=`${complexText(re,im)} · ${complexText(re,-im)}`;step=`√Δ = ${fmtNum(Math.sqrt(-d))}i; divide by 2a = ${fmtNum(den)}.`;$('quadratic-answer').innerHTML=`<div class="root-pair"><div class="root-value"><small>First root</small><strong>${complexText(re,im)}</strong></div><div class="root-value second"><small>Conjugate root</small><strong>${complexText(re,-im)}</strong></div></div>`;}
    $('quadratic-steps').innerHTML=[`Δ = b² − 4ac = ${fmtNum(d)}`,d<0?step:'Use x = (−b ± √Δ) / 2a.',`Divide by 2a = ${fmtNum(den)}.`,`Solutions: ${rootText}`].map((s,i)=>`<li class="${i===3?'last':''}" style="animation-delay:${i*90}ms"><span class="dot">${String(i+1).padStart(2,'0')}</span><span class="eq">${s}</span></li>`).join('');
    $('quadratic-visual').innerHTML=`<div class="prime-meter"><div class="prime-meter-line"><span>Δ</span><span class="meter"><i style="--width:${d<0?'28%':d===0?'54%':'100%'}"></i></span><b>${d<0?'negative':d===0?'zero':'positive'}</b></div><div class="check">${d<0?'Negative → two complex roots.':d===0?'Zero → one repeated real root.':'Positive → two real roots.'}</div></div>`;
  }catch(e){$('quadratic-status').textContent='CHECK INPUT';setError('quadratic-error',e.message);toast(e.message);}
}
$('quadratic-form').addEventListener('submit',e=>{e.preventDefault();computeQuadratic();});

document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{
  const type=button.dataset.example,values=button.dataset.value.split(',');
  if(type==='number'){$('number-a').value=values[0];$('number-b').value=values[1];computeNumber();}
  if(type==='prime'){$('prime-input').value=values[0];setTool('prime');computePrime();}
  if(type==='complex'){$('complex-a').value=values[0];$('complex-b').value=values[1];setTool('complex');computeComplex();}
  if(type==='quadratic'){$('quad-a').value=values[0];$('quad-b').value=values[1];$('quad-c').value=values[2];setTool('quadratic');computeQuadratic();}
}));

computeNumber();
setTool('number');
