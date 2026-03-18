// =============================================================================
// CYB ENGINE (Stage 9A — inlined for MINI)
// Modules: SignalInterpreter + RouteResolver + MessageEngine
// =============================================================================

// ── SIGNAL INTERPRETER ──────────────────────────────────────────────
function interpretSignals(mini, ans) {
  mini = mini || {}; ans = ans || {};
  const moment=mini.moment, activity=mini.activity, sleep=ans.q5, stress=ans.q6,
        emoEat=ans.q15, water=ans.q16, diets=ans.q17, motiv=ans.q21,
        exp=ans.q13, limits=ans.q12||[], time=ans.q8;
  const signals = {};
  // overwhelmed
  signals.overwhelmed = (moment===3||moment===4) || (sleep===3&&stress>=2) || (stress===3);
  // selfBlame
  if ((emoEat===0&&diets>=3)||moment===1) signals.selfBlame='high';
  else if (emoEat<=1||diets===2) signals.selfBlame='medium';
  else signals.selfBlame='low';
  // actionCapacity
  if (signals.overwhelmed||(sleep>=2&&time<=1)) signals.actionCapacity='low';
  else if (sleep>=2||time<=1||stress>=2) signals.actionCapacity='medium';
  else signals.actionCapacity='high';
  // shameRisk
  const limCount=(limits.filter(l=>l>0)).length;
  if (moment===4||(emoEat===0&&limCount>=3)||(diets>=3&&emoEat===0)) signals.shameRisk='high';
  else if (limCount>=1||diets>=2||emoEat<=1) signals.shameRisk='medium';
  else signals.shameRisk='low';
  // structureNeed
  const meals=ans.q14, irregMeals=(meals===3), lowM=(motiv!==undefined&&motiv<=4), hiM=(motiv!==undefined&&motiv>=8);
  if (exp<=1||irregMeals||lowM) signals.structureNeed='high';
  else if (exp===2||(motiv>=5&&motiv<=7)) signals.structureNeed='medium';
  else if (exp>=3&&hiM) signals.structureNeed='low';
  else signals.structureNeed='medium';
  // pressureTolerance
  if (moment===4||moment===3||signals.overwhelmed) signals.pressureTolerance='low';
  else if (moment===0||moment===1||moment===2) signals.pressureTolerance='medium';
  else if (signals.actionCapacity!=='low') signals.pressureTolerance='high';
  else signals.pressureTolerance='medium';
  // motivationStyle
  if (signals.pressureTolerance==='low') signals.motivationStyle='gentle';
  else if (signals.pressureTolerance==='medium'||signals.structureNeed==='high') signals.motivationStyle='structured';
  else signals.motivationStyle='direct';
  return signals;
}

// ── ROUTE RESOLVER ──────────────────────────────────────────────────
const ROUTES={POSTPARTUM:'POSTPARTUM',DIVORCE:'DIVORCE',HORMONAL:'HORMONAL',BURNOUT:'BURNOUT',LOSS:'LOSS',GENERAL:'GENERAL'};
const MOMENT_TO_ROUTE={0:ROUTES.POSTPARTUM,1:ROUTES.DIVORCE,2:ROUTES.HORMONAL,3:ROUTES.BURNOUT,4:ROUTES.LOSS,5:ROUTES.GENERAL};

function resolveRoute(mini, signals) {
  mini=mini||{}; signals=signals||{};
  const base=MOMENT_TO_ROUTE[mini.moment];
  if (base===ROUTES.LOSS) return {route:ROUTES.LOSS,confidence:'high',source:'questionnaire',notes:null};
  if (base===ROUTES.POSTPARTUM) return {route:ROUTES.POSTPARTUM,confidence:'high',source:signals.overwhelmed?'combined':'questionnaire',notes:signals.overwhelmed?'Postpartum + overwhelmed':null};
  if (base===ROUTES.BURNOUT) return {route:ROUTES.BURNOUT,confidence:'high',source:'questionnaire',notes:null};
  if (base!==ROUTES.BURNOUT&&signals.overwhelmed&&signals.actionCapacity==='low'&&signals.pressureTolerance==='low') {
    if (base===ROUTES.GENERAL) return {route:ROUTES.BURNOUT,confidence:'medium',source:'signals',notes:'Signal-detected burnout'};
    return {route:base,confidence:'high',source:'combined',notes:'Burnout-like signals on '+base};
  }
  if (base===ROUTES.DIVORCE) return {route:ROUTES.DIVORCE,confidence:'high',source:'questionnaire',notes:null};
  if (base===ROUTES.HORMONAL) return {route:ROUTES.HORMONAL,confidence:'high',source:'questionnaire',notes:null};
  if (base===ROUTES.GENERAL) return {route:ROUTES.GENERAL,confidence:'high',source:'questionnaire',notes:null};
  return {route:ROUTES.GENERAL,confidence:'medium',source:'questionnaire',notes:'Fallback'};
}

// ── MESSAGE ENGINE ──────────────────────────────────────────────────
const ENGINE_MESSAGES = [
  // POSTPARTUM
  {id:'pp_val_onb_01',route:'POSTPARTUM',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'Corpul tău tocmai a făcut cel mai greu și cel mai frumos lucru posibil. Ce simți acum — oboseala, schimbările, poate chiar sentimentul că nu te mai recunoști — e absolut normal.'},
  {id:'pp_val_onb_02',route:'POSTPARTUM',purpose:'VALIDATION',ctx:'ONBOARDING',cond:{overwhelmed:true},
    text:'Știu că totul e mult acum. Somnul, bebelușul, corpul care s-a schimbat. Nu trebuie să faci totul perfect — trebuie doar să fii aici. Și ești.'},
  {id:'pp_results_01',route:'POSTPARTUM',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], planul tău e construit pentru o mamă — nu pentru o sportivă. Rețete rapide, antrenamente scurte, tot ce ține cont de alăptare, de diastază, de nopțile nedormite. Pas cu pas. Fără grabă.'},
  // DIVORCE
  {id:'div_val_onb_01',route:'DIVORCE',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'O despărțire nu e un capăt de drum — e un nou început pe care încă nu îl vezi clar. Ce simți acum e răspunsul normal al corpului tău la o schimbare imensă.'},
  {id:'div_val_onb_02',route:'DIVORCE',purpose:'VALIDATION',ctx:'ONBOARDING',cond:{selfBlame:'high'},
    text:'Nu e vina ta că te simți așa. Cortizolul, hormonul stresului, îți afectează somnul, greutatea și energia. E biochimie, nu slăbiciune.'},
  {id:'div_results_01',route:'DIVORCE',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], ai avut curajul să începi ceva nou. Planul tău se concentrează pe reducerea stresului, pe mișcare care te face să te simți puternică, și pe alimentație care susține — nu restricționează.'},
  // HORMONAL
  {id:'hor_val_onb_01',route:'HORMONAL',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'Dacă simți că faci totul corect dar corpul nu mai răspunde — e pentru că regulile s-au schimbat fără să te întrebe nimeni. Nu e vina ta. E biologie.'},
  {id:'hor_results_01',route:'HORMONAL',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], planul tău e construit pe biologia ta de ACUM — nu pe cea de acum 10 ani. Antrenament de forță prioritar, nutriție adaptată, strategii pentru somn și energie.'},
  // BURNOUT
  {id:'burn_val_onb_01',route:'BURNOUT',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'Nu e normal să te simți epuizată tot timpul — dar la câte faci zilnic, e complet de înțeles că ai ajuns aici.'},
  {id:'burn_val_onb_02',route:'BURNOUT',purpose:'VALIDATION',ctx:'ONBOARDING',cond:{overwhelmed:true,actionCapacity:'low'},
    text:'Ești epuizată dar încă funcționezi — și tocmai asta e problema. Corpul ține scorul chiar și când tu nu mai ții.'},
  {id:'burn_results_01',route:'BURNOUT',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], programul tău începe cu liniște. Primele săptămâni: somn, hidratare, mișcare blândă. Zero presiune, zero HIIT. Abia când corpul tău iese din modul de supraviețuire, începem să construim.'},
  // LOSS
  {id:'loss_val_onb_01',route:'LOSS',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'Nu o să pretindem că înțelegem ce simți — pentru că fiecare pierdere e unică. Dar știm un lucru: corpul tău simte această durere la fel de profund ca sufletul tău.'},
  {id:'loss_results_01',route:'LOSS',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], nu îți cerem să fii motivată. Îți oferim un loc sigur în care să ai grijă de tine — când și cum poți. Suntem aici. Fără presiune. Fără termen limită.'},
  // GENERAL
  {id:'gen_val_onb_01',route:'GENERAL',purpose:'VALIDATION',ctx:'ONBOARDING',cond:null,
    text:'Faptul că ești aici înseamnă că ai luat deja cea mai grea decizie: să începi. Ce urmează e diferit — pentru că e construit pe tine.'},
  {id:'gen_results_01',route:'GENERAL',purpose:'RESULTS',ctx:'RESULTS',cond:null,
    text:'[Prenume], profilul tău e unic — și planul tău va fi la fel. Tot ce urmează e construit pe răspunsurile tale. Consistența bate intensitatea.'},
];

const SAFE_MSG = {id:'_safe',text:'Ești în locul potrivit. Hai să construim împreună.',fallback:true};

function selectMessage(opts) {
  const route=opts.route||'GENERAL', signals=opts.signals||{}, purpose=opts.purpose||'VALIDATION', ctx=opts.screenContext||null;
  let best=null, bestScore=-1;
  for (const m of ENGINE_MESSAGES) {
    let score=0;
    if (m.route===route) score+=100; else if (m.route==='GENERAL') score+=10; else continue;
    if (m.purpose!==purpose) continue;
    if (ctx&&m.ctx===ctx) score+=50; else if (m.ctx&&m.ctx!==ctx) score-=20;
    if (m.cond) { let ok=true; for(const[k,v]of Object.entries(m.cond)){if(signals[k]!==v){ok=false;break;}} if(ok)score+=30; else continue; }
    if (score>bestScore){bestScore=score;best=m;}
  }
  return best ? {id:best.id,text:best.text,score:bestScore,fallback:false} : {id:SAFE_MSG.id,text:SAFE_MSG.text,score:0,fallback:true};
}

// ── PERSONALIZATION HELPER ──────────────────────────────────────────
function personalize(text, name) {
  return (text||'').replace(/\[Prenume\]/g, name||'');
}

