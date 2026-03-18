// =============================================================================
// CYB COPY — COMPLET QUESTIONNAIRE (27Q)
// Centralized copy architecture. Layers:
//   COPY.route           — route labels, fallback
//   COPY.metabolicProfiles — profile names + descriptions
//   COPY.questions        — question titles, subtitles, notes
//   COPY.transitions      — block transition titles + bodies
//   COPY.ui              — results, buttons, labels, params, final CTA
//   COPY.fallback        — safe defaults
//   COPY.q() / COPY.t()  — fallback accessors
// =============================================================================

const COPY = {

  // ── ROUTE ─────────────────────────────────────────────────────────
  route: {
    labels: ['Postpartum','Divorț/Separare','Schimbări hormonale','Burnout','Când pierzi pe cineva drag','General'],
    get(i) { return this.labels[i] || 'General'; },
  },

  // ── FALLBACK ──────────────────────────────────────────────────────
  fallback: {
    metabolicProfile: { name:'Profil Echilibrat', color:'var(--teal-glow)', desc:'Ai o bază bună. Planul se concentrează pe optimizare: nutriție precisă, antrenament structurat, consistență.' },
  },

  // ── METABOLIC PROFILES ────────────────────────────────────────────
  metabolicProfiles: {
    postpartum:     { name:'Profil Postpartum Recovery', color:'var(--rose)', desc:'Corpul tău e în recuperare. Prioritate: hrănire adecvată (nu restricție), mișcare blândă progresivă, somn, și răbdare cu tine însăți.' },
    pierdere:       { name:'Profil Îngrijire Blândă', color:'var(--text)', desc:'Prioritatea acum nu e slăbirea — e grija de tine. Somn, hrănire reconfortantă, mișcare blândă. Pas cu pas.' },
    antiCortizol:   { name:'Profil Anti-Cortizol', color:'var(--coral)', desc:'Stresul cronic îți sabotează eforturile. Cortizolul ridicat stochează grăsime abdominală. Plan: reducere stres ÎNAINTE de restricție calorică.' },
    hormonalReset:  { name:'Profil Hormonal Reset', color:'var(--purple)', desc:'Hormonii sunt în schimbare — și abordarea trebuie să se schimbe. Antrenament de forță prioritar, nutriție adaptată la nevoile noi ale corpului.' },
    metabolismLent: { name:'Profil Metabolism Lent', color:'var(--gold)', desc:'Metabolismul are nevoie de activare graduală. Mișcare progresivă + masă musculară = metabolismul crește natural.' },
    echilibrat:     { name:'Profil Echilibrat', color:'var(--teal-glow)', desc:'Ai o bază bună. Planul se concentrează pe optimizare: nutriție precisă, antrenament structurat, consistență.' },
  },

  // ── QUESTIONS ─────────────────────────────────────────────────────
  questions: {
    q1:   { title:'Care este greutatea ta dorită?', sub:'Greutatea la care te-ai simți bine — nu „perfectă", ci confortabilă.' },
    q2:   { title:'Cum ai descrie forma corpului tău?', sub:'Nu există răspuns greșit — e doar pentru personalizare.' },
    q3:   { title:'Cum ți s-a schimbat greutatea în ultimul an?', sub:null },
    q4:   { title:'Ai copii?', sub:null },
    q4b:  { title:'Alăptezi în prezent?', sub:'Important pentru planul alimentar.' },
    q5:   { title:'Cum dormi?', sub:'Somnul afectează direct hormonii și greutatea.' },
    q6:   { title:'Nivelul tău de stres zilnic?', sub:null },
    q7:   { title:'Cum arată o zi obișnuită?', sub:null },
    q8:   { title:'Cât timp ai pe zi pentru antrenament?', sub:null },
    q9:   { title:'Ce ai disponibil pentru antrenament?', sub:'Bifează tot ce ai — inclusiv obiecte din casă!' },
    q9b:  { title:'Câtă cafea bei pe zi?', sub:'Cofeina afectează cortizolul și somnul.' },
    q10:  { title:'Ai condiții medicale sau iei medicamente?', sub:'Confidențial — necesare pentru siguranța ta.', note:'Este absolut normal. Multe femei 35+ au una sau mai multe din aceste condiții.' },
    q11:  { title:'Medicamente / detalii suplimentare', sub:'Ce medicamente iei? Dacă nu iei nimic, scrie „Nu iau medicamente."' },
    q12:  { title:'Ai limitări fizice sau dureri?', sub:'Foarte important! Adaptăm fiecare exercițiu.', note:'Nu ești singură — peste 40% dintre femeile 35+ au cel puțin o limitare fizică.' },
    q13:  { title:'Nivelul tău de experiență cu sportul?', sub:null },
    q13b: { title:'Ce simptome hormonale ai observat?', sub:'Bifează tot ce se aplică. Ne ajută să adaptăm planul.' },
    q14:  { title:'Câte mese mănânci pe zi?', sub:null },
    q15:  { title:'Mănânci emoțional?', sub:'Stres, tristețe, plictiseală — nu e slăbiciune, e răspuns hormonal.', note:'Mâncatul emoțional NU este o slăbiciune de voință. Este un răspuns al cortizolului la stres.' },
    q16:  { title:'Câtă apă bei pe zi?', sub:null },
    q17:  { title:'Ai mai ținut diete înainte?', sub:null },
    q18:  { title:'Ce preferi să mănânci?', sub:'Bifează stilurile care ți se potrivesc.' },
    q19:  { title:'Buget lunar pentru mâncare?', sub:null },
    q20:  { title:'Care este cel mai mare obstacol?', sub:'Poți bifa mai multe.' },
    q21:  { title:'Cât de motivată ești ACUM?', sub:null },
  },

  // ── TRANSITIONS ───────────────────────────────────────────────────
  transitions: {
    trans_1: { title:'Hai să te cunoaștem <em>mai bine</em>', body:'Datele de bază le avem din chestionarul MINI. Acum aprofundăm — ca să construim ceva cu adevărat PE TINE.' },
    trans_2: { title:'Viața ta e <em>unică</em>', body:'Programul tău va fi la fel de unic. Spune-ne cum arată o zi din viața ta.' },
    trans_3: { title:'Mulțumim pentru <em>sinceritate</em>', body:'Aceste informații ne ajută să te protejăm, nu să te judecăm. Fiecare răspuns face programul tău mai sigur.' },
    trans_4: { title:'<em>Înțelegem</em> relația ta cu mâncarea', body:'Fără judecată, doar înțelegere. Răspunsurile tale ne ajută să construim un plan care funcționează cu viața ta, nu împotriva ei.' },
    trans_5: { title:'Ești aici. Asta <em>contează</em>.', body:'Ultimele întrebări. Ești aproape de planul tău personalizat. Noi suntem alături de tine.' },
  },

  // ── UI ────────────────────────────────────────────────────────────
  ui: {
    buttons: { next: 'Continuă →' },
    textareaPlaceholder: 'Scrie aici...',
    miniResultLabel: 'IMC-ul tău (din MINI)',
    results: {
      headerTag: 'Rezultatele tale complete',
      headerTitle: (name) => `${name||''}, iată profilul tău <em style="color:var(--teal-glow)">complet</em>`,
      routePrefix: 'Traseu',
      analyzedSuffix: 'întrebări analizate',
      profileLabel: 'Profilul tău metabolic',
      stressHeading: 'Indicele de stres estimat',
      stressLevels: { high:'Ridicat — prioritate reducere stres', moderate:'Moderat — planul va include management stres', low:'Scăzut — poți merge pe plan standard' },
      stressSource: 'Calculat din: somn, stres raportat, alimentație emoțională, hidratare, istoric diete',
      hormonalHeading: 'Indicele hormonal estimat',
      hormonalLevels: { high:'Impact hormonal semnificativ — plan adaptat', moderate:'Schimbări moderate — monitorizare', low:'Impact hormonal scăzut' },
      hormonalSource: 'Calculat din: vârstă, traseu, simptome raportate, somn, schimbări greutate',
      hormonalDisclaimer: '⚕️ Aceasta NU este o măsurătoare medicală — este o estimare pe baza simptomelor tale.',
      caloricHeading: 'Necesarul tău caloric (deblocat)',
      bmrLabel: 'BMR (repaus)',
      tdeeLabel: 'TDEE (cu activitate)',
      tagsHeading: 'Tag-uri siguranță (programul tău va respecta)',
      tagsEmpty: 'Nu au fost detectate limitări — acces complet la toate exercițiile.',
      tagsFooter: 'Exercițiile incompatibile sunt excluse automat din programul tău.',
      paramsHeading: 'Parametrii programului tău',
      paramLabels: { time:'Timp/antrenament:', experience:'Experiență:', meals:'Mese/zi:', budget:'Buget alimentar:', motivation:'Motivație:', equipment:'Echipament:' },
      timeOptions: ['<15 min','15-20 min','20-30 min','30-45 min','45+ min'],
      expOptions: ['Începător','Începător+','Intermediar','Avansat'],
      mealOptions: ['1-2','3','3+gustări','Fără ritm'],
      budgetOptions: ['<150 RON','150-250','250-400','400+'],
      finalHeading: 'Planul tău e gata să fie construit.',
      finalBody: (profileName, profileColor) => `Toate aceste date alimentează motorul AI CYB care va genera:<br><strong style="color:white">raport personalizat + plan alimentar + program antrenament</strong><br>— totul adaptat pe profilul tău <strong style="color:${profileColor}">${profileName}</strong>.`,
      finalQuote: '„Te aștept pe cealaltă parte." — Daniela',
    },
  },

  // ── ACCESSORS with fallback ───────────────────────────────────────
  q(id) { return this.questions[id] || { title: id, sub: null, note: null }; },
  t(id) { return this.transitions[id] || { title: '', body: '' }; },
};
