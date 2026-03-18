// =============================================================================
// CYB STEPS — MINI wiring layer
// emoMessages, UI/R_UI/U_UI aliases, STEPS[]
// Requires: CYB_Copy_MINI.js (COPY), CYB_Calc.js (calcBMI) loaded before this.
// =============================================================================

// ── Backward-compatible aliases ──────────────────────────────────────
const emoMessages = {
  name: (d) => COPY.emotional.get('name', d),
  age: (d) => COPY.emotional.get('age', d),
  measures: (d) => COPY.emotional.get('measures', d, calcBMI(d.weight, d.height)),
  activity: (d) => COPY.emotional.get('activity', d),
  goal: (d) => COPY.emotional.get('goal', d),
  moment: (d) => COPY.emotional.get('moment', d),
};

// ── Shorthand references used by render ──────────────────────────────
const UI = COPY.ui;
const R_UI = COPY.ui.results;
const U_UI = COPY.ui.upgrade;

const STEPS = [
  {id:'welcome',type:'welcome'},
  {id:'name',type:'text', ...COPY.questions.name},
  {id:'age',type:'number', ...COPY.questions.age, min:18,max:75},
  {id:'measures',type:'measures', ...COPY.questions.measures},
  {id:'activity',type:'activity', ...COPY.questions.activity},
  {id:'goal',type:'cards', ...COPY.questions.goal,
    opts:[
      {icon:'⚖️',title:'Vreau să slăbesc',desc:'Pierdere în greutate sănătoasă, fără diete extreme'},
      {icon:'💪',title:'Vreau să mă tonifiez',desc:'Mai multă forță, corp mai definit'},
      {icon:'⚡',title:'Vreau mai multă energie',desc:'Să nu mai fiu epuizată la sfârșitul zilei'},
      {icon:'🫀',title:'Vreau sănătate generală',desc:'Mă simt bine în corp, dorm bine, stres mai puțin'},
    ]},
  {id:'moment',type:'cards', ...COPY.questions.moment,
    opts:[
      {icon:'🤱',title:'Postpartum',desc:'Am născut recent (ultimele 0-24 luni)'},
      {icon:'💔',title:'Divorț / Separare',desc:'Trec printr-o despărțire sau am trecut recent'},
      {icon:'🌡️',title:'Schimbări hormonale',desc:'Pre-menopauză, menopauză, sau simt schimbări'},
      {icon:'🔥',title:'Burnout / Epuizare',desc:'Sunt epuizată dar încă funcționez pe pilot automat'},
      {icon:'🕊️',title:'Am pierdut pe cineva drag',desc:'Pierderea cuiva drag îmi afectează corpul și viața'},
      {icon:'✨',title:'Niciuna în special',desc:'Vreau doar să mă simt mai bine'},
    ]},
  {id:'email',type:'email', ...COPY.questions.email},
  {id:'results',type:'results'},
];
