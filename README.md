# CYB Landing V2 — Deployment

## Files in this folder

| File | Purpose |
|------|---------|
| `index.html` | Landing page (standalone, all CSS/JS inline) |
| `CYB_Calc.js` | Shared math functions (BMI, BMR, TDEE) |
| `CYB_Copy_MINI.js` | Copy/text for MINI questionnaire |
| `CYB_Copy_COMPLET.js` | Copy/text for COMPLET questionnaire (27Q) |
| `CYB_Engine_STABLE.js` | Signal interpreter, route resolver, message engine |
| `CYB_Steps_MINI.js` | MINI wiring layer (connects Copy + Calc to UI) |
| `CYB_Chestionar_MINI.html` | MINI questionnaire (standalone) |
| `CYB_Chestionar_COMPLET.html` | COMPLET questionnaire (standalone) |

## How to deploy

### Option A: Into existing Next.js project (recommended)

Copy this entire `landing-v2/` folder into your project's `public/` directory:

```
your-project/
├── public/
│   ├── landing-v2/        ← paste here
│   │   ├── index.html
│   │   ├── CYB_Calc.js
│   │   ├── CYB_Copy_MINI.js
│   │   ├── CYB_Copy_COMPLET.js
│   │   ├── CYB_Engine_STABLE.js
│   │   ├── CYB_Steps_MINI.js
│   │   ├── CYB_Chestionar_MINI.html
│   │   └── CYB_Chestionar_COMPLET.html
│   └── ... (other public files)
├── src/
├── package.json
└── ...
```

Then push to GitHub → Vercel auto-deploys.

**Result:** `https://changeyourbody.ro/landing-v2` serves the landing page.

### Option B: Standalone (no Next.js)

Just open `index.html` in a browser. Everything is self-contained.

## Notes

- `index.html` is 100% standalone — all CSS and JS are inline
- The CYB JS files are for the questionnaire integration (not yet connected)
- The MINI placeholder in the landing page (`#mini-flow`) is where `CYB_Chestionar_MINI.html` will be integrated
- No modifications to the existing live root page `/` are needed
