# Math Question Generator

A Vite + React app for generating randomised, LaTeX-rendered exam questions from parameterised templates.

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── engine/
│   ├── templateEngine.js     # Param generation, substitution, rendering pipeline
│   └── computations.js       # All math compute functions (cross product, eigenvalues, etc.)
│
├── topics/                   # One file per topic — templates live here
│   ├── vectors.js
│   ├── systemsOfLinearEquations.js
│   ├── matrices.js
│   ├── eigenvectorsEigenvalues.js
│   ├── multivariableCalculus.js
│   └── calculus.js
│
├── subjects/                 # Groups topics into subjects
│   ├── index.js              # Master registry — import all subjects here
│   ├── ENG1005.js            # Engineering Maths (imports all topic files)
│   ├── ENG1014.js            # Scaffold — add your topics/templates
│   ├── ENG1011.js            # Scaffold — add your topics/templates
│   └── ACC1100.js            # Scaffold — add your topics/templates
│
├── components/
│   ├── TopicSidebar.jsx      # Subject tabs + topic/subtopic checkboxes
│   ├── QuestionCard.jsx      # Question display with answer/working-out/note
│   ├── NoteModal.jsx         # Per-question note pop-up (localStorage)
│   └── AllNotesPanel.jsx     # View all saved notes
│
├── hooks/
│   └── useNotes.js           # localStorage note persistence hook
│
└── styles/
    ├── global.css            # Reset + CSS variables
    └── app.css               # All component styles
```

## How Templates Work

Each template is a plain object:

```js
{
  id:         'vec-cross-1',           // unique string
  name:       'Cross product',         // display name
  topic:      'Vectors',
  subtopic:   'Cross/vector product',
  difficulty: 'medium',               // 'easy' | 'medium' | 'hard'
  compute:    'crossProduct',          // key into computations registry (or null)

  params: {
    a1: { min: -5, max: 5, nonzero: true },
    // ... one entry per {{placeholder}}
  },

  // Single solution (most templates):
  question: 'Find $\\vec{a} \\times \\vec{b}$ where $\\vec{a} = \\langle {{a1}}, ... \\rangle$',
  solution: '$$\\vec{a}\\times\\vec{b} = \\langle {{rx}}, {{ry}}, {{rz}} \\rangle$$',

  // Branching solution (when compute returns a branch string):
  solution_intersect: '...',
  solution_skew:      '...',
}
```

### Placeholders

- `{{paramName}}` — replaced with the generated value for that param
- `{{computedVar}}` — replaced with values returned by the compute function
- Negative numbers are automatically wrapped in parentheses to avoid `+ -3`

### Adding a new compute function

1. Write your function in `src/engine/computations.js`:

```js
function myCompute({ a, b }) {
  const result = a * b
  return {
    vars:   { result },   // these become available as {{result}}
    branch: null,         // or a string to select solution_<branch>
  }
}
```

2. Add it to the `computations` export map:

```js
export const computations = {
  // ...existing
  myCompute,
}
```

3. Reference it in your template: `compute: 'myCompute'`

### Adding a new subject (e.g. ENG1020)

1. Create `src/subjects/ENG1020.js` following the pattern in `ENG1014.js`
2. Import and add it in `src/subjects/index.js`

## Notes

- Notes are saved to `localStorage` with the key prefix `mqg::note::`
- Each note is keyed by `subtopic::questionIndex`
- View all notes via the "All Notes" button in the top bar

## Build for production

```bash
npm run build
npm run preview
```
