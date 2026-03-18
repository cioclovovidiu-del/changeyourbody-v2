// =============================================================================
// CYB COPY — MINI QUESTIONNAIRE
// Centralized copy architecture. Layers:
//   COPY.route     — route labels, fallback
//   COPY.questions — question titles, subtitles, labels, placeholders
//   COPY.emotional — phase1 emotional messages per step
//   COPY.ui        — welcome, results, upgrade, buttons, BMI, measures
// =============================================================================

const COPY = {

  // ── ROUTE ─────────────────────────────────────────────────────────
  route: {
    labels: ['Postpartum','Divorț/Separare','Schimbări hormonale','Burnout','Când pierzi pe cineva drag','General'],
    get(i) { return this.labels[i] || this.fallbackLabel; },
    fallbackLabel: 'General',
  },

  // ── QUESTIONS ─────────────────────────────────────────────────────
  questions: {
    name:     { label:'Despre tine', title:'Cum te numești?', sub:'Prenumele tău — așa cum vrei să ți ne adresăm', ph:'Scrie prenumele tău...' },
    age:      { label:'Despre tine', title:'Câți ani ai?', sub:'Vârsta ta în ani', ph:'ex: 38' },
    measures: { label:'Corpul tău', title:'Înălțime și greutate', sub:'Aceste date ne ajută să calculăm profilul tău metabolic' },
    activity: { label:'Stilul tău', title:'Cât de activă ești în prezent?', sub:'Alege varianta cea mai apropiată de realitate' },
    goal:     { label:'Obiectivul tău', title:'Care e obiectivul tău principal?', sub:'Alege ce contează cel mai mult pentru tine acum' },
    moment:   { label:'Momentul tău', title:'Ce moment traversezi acum?', sub:'Această întrebare ne ajută să personalizăm totul pe viața ta reală. Fără judecată.' },
    email:    { label:'Contact', title:'Unde îți trimitem rezultatele?', sub:'Email-ul tău — aici primești profilul tău gratuit', ph:'email@exemplu.ro' },
  },

  // ── EMOTIONAL (phase 1 messages) ──────────────────────────────────
  emotional: {
    fallbackMessage: 'Ești în locul potrivit. Hai să construim împreună ceva care funcționează pentru tine.',
    phase1: {
      name: (d) => `Bun venit, ${d.name || ''}! Hai să vedem ce poate face CYB pentru tine.`,
      age: (d) => `Perfect. La ${d.age || ''} de ani, corpul tău are nevoi specifice — și noi le înțelegem.`,
      measures: (d, bmi) => `Am calculat. IMC-ul tău este ${bmi ? bmi.toFixed(1) : '—'} — asta ne spune multe. Hai să continuăm.`,
      activity: (d) => `Înțeleg. Fiecare nivel de activitate are abordarea lui — programul tău va ține cont de asta.`,
      goal: (d) => {
        const goals = ['Slăbirea','Tonifierea','Energia','Sănătatea'];
        return `${goals[d.goal] || 'Obiectivul tău'} este un drum pe care l-am mai parcurs cu sute de femei. Nu ești singură.`;
      },
      moment: (d) => {
        const msgs = [
          'Știu că viața s-a schimbat complet. Corpul tău a făcut ceva extraordinar — și merită îngrijire, nu pedeapsă.',
          'Înțeleg prin ce treci. Stresul pe care îl simți nu e doar emoțional — îți afectează corpul în moduri pe care poate nu le știi încă.',
          'Știu exact cum e: faci totul „corect" dar corpul nu mai răspunde. NU e vina ta. Hormonii s-au schimbat.',
          'Ești epuizată, dar încă funcționezi — și tocmai asta e problema. Corpul ține scorul.',
          'Nu există cuvinte potrivite. Dar a avea grijă de corpul tău în această perioadă e un act de auto-compasiune.',
          'Perfect. Hai să construim ceva frumos împreună.',
        ];
        const msg = msgs[d.moment] || msgs[5];
        return msg + ' Am pregătit ceva special pentru tine.';
      },
    },
    get(key, d, extra) {
      const fn = this.phase1[key];
      if (typeof fn === 'function') { try { return fn(d, extra); } catch(e) { return this.fallbackMessage; } }
      return this.fallbackMessage;
    },
  },

  // ── UI ────────────────────────────────────────────────────────────
  ui: {
    buttons: {
      start: 'Începe chestionarul →',
      next: 'Continuă →',
      seeResults: 'Vezi rezultatele mele →',
    },
    goalNames: ['slăbire','tonifiere','energie','sănătate'],
    gaugeLabels: ['Sub','Normal','Supra','Obez'],
    bmiCategories: [
      { max: 18.5, label: 'Subponderală', cls: 'cat-under' },
      { max: 25,   label: 'Normală',      cls: 'cat-normal' },
      { max: 30,   label: 'Supraponderală', cls: 'cat-over' },
      { max: 999,  label: 'Obezitate',     cls: 'cat-obese' },
    ],
    welcome: {
      heading: 'Descoperă-ți <em>profilul gratuit</em>',
      subtitle: '60 de secunde. 6 întrebări simple. Și vei înțelege ce are nevoie corpul tău.',
      freeHeading: 'Ce vei primi gratuit:',
      freeItems: ['IMC-ul tău calculat cu vizualizare','Recomandări personalizate pe obiectiv','Program antrenament 1 săptămână','Acces grup WhatsApp CYB'],
      blurHeading: 'Ce vei vedea blurat (teaser):',
      blurItems: ['Metabolismul tău bazal (BMR)','Necesarul caloric zilnic (TDEE)','Proiecție progres 12 săptămâni','Macro-uri zilnice (proteine/carbs/grăsimi)','Greutate ideală estimată','Profil metabolic pe traseul tău'],
    },
    emailPreResults: 'Asta e tot! În câteva secunde vei vedea rezultatele tale personalizate.',
    measures: { heightLabel: 'Înălțime (cm)', weightLabel: 'Greutate (kg)' },
    results: {
      headerTitle: (name) => `Rezultatele tale, ${name || ''}`,
      heading: 'Profilul tău <em style="color:var(--teal-glow)">metabolic</em>',
      routePrefix: 'Traseu detectat',
      imcHeading: 'IMC — Indicele de Masă Corporală',
      recoHeading: 'Recomandări pe obiectivul tău',
      recoBody: (bmi, goal, age) => `Pe baza IMC-ului tău de ${bmi} și a obiectivului de <strong style="color:white">${goal}</strong>, recomandăm o abordare graduală, bazată pe nutriție adaptată și mișcare progresivă. La ${age} de ani, corpul tău răspunde cel mai bine la consistență, nu la intensitate.`,
      freeItems: ['Program antrenament generic 1 săptămână (PDF)','Ghid Cumpărături Sănătoase (PDF)','Acces grup WhatsApp CYB'],
      blurOverlay: 'Aceste rezultate sunt calculate.<br><em style="color:var(--gold)">Deblochează-le cu un plan CYB.</em>',
      bmrHeading: 'Metabolismul tău bazal (BMR)',
      bmrDesc: 'kcal/zi — atâtea calorii arde corpul tău în repaus complet',
      tdeeHeading: 'Necesarul caloric zilnic (TDEE)',
      tdeeDesc: 'kcal/zi — cu activitatea ta actuală inclusă',
      macroHeading: 'Macro-uri zilnice recomandate',
      macroLabels: ['Proteine','Carbohidrați','Grăsimi'],
      projHeading: 'Proiecție progres',
      projBody: (deficit, weeks, target) => `Dacă menții un deficit de 500 kcal/zi (${deficit} kcal/zi), în <strong style="color:white">${weeks} săptămâni</strong> poți ajunge la <strong style="color:var(--teal-glow)">${target} kg</strong>.`,
      idealHeading: 'Greutate ideală estimată',
      idealDesc: (h) => `interval sănătos pentru înălțimea ta de ${h} cm`,
    },
    upgrade: {
      heading: 'Înțeleg prin ce treci.<br><em style="color:var(--teal-glow)">Uite ce m-am gândit.</em>',
      body: 'Rezultatele de sus sunt calculate pe baza datelor tale. Dar pentru un plan real — nutriție, antrenament, suport — avem nevoie să te cunoaștem mai bine.<br><strong style="color:white">Alege planul potrivit → completezi chestionarul detaliat → primești totul personalizat.</strong>',
      plans: [
        { name:'E-book Nutriție 35+', price:'15€' },
        { name:'Antrenament 1 săptămână', price:'29€' },
        { name:'Dietă AI personalizată', price:'49€' },
        { name:'REBUILD Esențial', price:'59€', old:'79€' },
        { name:'REBUILD Premium', price:'99€', old:'149€' },
        { name:'REBUILD VIP (cel mai popular)', price:'199€', old:'299€', hl:true },
        { name:'CYB Coaching Complet 12 săpt.', price:'399€', gold:true },
      ],
      footer: (route) => `Planurile de la 49€ includ chestionarul complet de 27 întrebări<br>pentru personalizare reală pe traseul tău <strong style="color:var(--gold)">${route}</strong>`,
    },
  },
};
