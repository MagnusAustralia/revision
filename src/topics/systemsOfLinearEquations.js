/**
 * topics/systemsOfLinearEquations.js
 *
 * Templates for: Systems of Linear Equations
 * Subtopics:
 *   - Convert to Augmented Matrix, REF, RREF
 *   - Gaussian Elimination with back substitution
 *   - Rank of Matrix
 *   - No. Pivots of Matrix (Basic variables vs free variables)
 *   - No. Solutions of Matrix
 *   - Inconsistent vs consistent
 */

export const TOPIC = 'Systems of Linear Equations'

export const templates = [
  // ── Augmented Matrix / REF / RREF ──────────────────────────────────────────
  {
    id: 'sle-aug-1',
    name: 'Write augmented matrix from system',
    topic: TOPIC,
    subtopic: 'Convert to Augmented Matrix, REF, RREF',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: -4, max: 4, nonzero: true }, b: { min: -4, max: 4 }, c: { min: -8, max: 8 },
      d: { min: -4, max: 4 }, e: { min: -4, max: 4, nonzero: true }, f: { min: -8, max: 8 },
    },
    question:
      'Write the augmented matrix for the system\n' +
      '$$\\begin{cases}{{a}}x + {{b}}y = {{c}}\\\\{{d}}x + {{e}}y = {{f}}\\end{cases}$$\n' +
      'and reduce it to Row Echelon Form (REF).',
    solution:
      '$$\\left[\\begin{array}{cc|c}{{a}}&{{b}}&{{c}}\\\\{{d}}&{{e}}&{{f}}\\end{array}\\right]$$\n' +
      'Apply $R_2 \\leftarrow R_2 - \\dfrac{{{d}}}{{{a}}}R_1$ and continue reducing.',
    note: "Note 1"
  },

  // ── Gaussian Elimination ───────────────────────────────────────────────────
  {
    id: 'sle-gauss-1',
    name: 'Gaussian elimination — 2×2 system',
    topic: TOPIC,
    subtopic: 'Gaussian Elimination with back substitution',
    difficulty: 'medium',
    compute: 'augmented2x3',
    params: {
      a: { min: 1, max: 5, nonzero: true }, b: { min: -4, max: 4 }, c: { min: -8, max: 8 },
      d: { min: -4, max: 4 }, e: { min: 1, max: 5, nonzero: true }, f: { min: -8, max: 8 },
    },
    question:
      'Use Gaussian elimination with back substitution to solve\n' +
      '$$\\begin{cases}{{a}}x + {{b}}y = {{c}}\\\\{{d}}x + {{e}}y = {{f}}\\end{cases}$$',
    solution_unique:
      'Row reduce the augmented matrix to obtain $x = {{x1}},\\; y = {{x2}}$. ' +
      'The system has a **unique solution**: $(x,y) = ({{x1}}, {{x2}})$.',
    solution_inconsistent:
      'Row reduction yields a row $[0\\;0\\;|\\;k]$ with $k \\neq 0$. ' +
      'The system is **inconsistent** — no solution exists.',
    solution_infinite:
      'Row reduction yields a free variable. ' +
      'The system has **infinitely many solutions** (one free variable).',
    note: "Note 1"
  },

  // ── Rank ───────────────────────────────────────────────────────────────────
  {
    id: 'sle-rank-1',
    name: 'Rank of a 2×3 matrix',
    topic: TOPIC,
    subtopic: 'Rank of Matrix',
    difficulty: 'medium',
    compute: 'augmented2x3',
    params: {
      a: { min: -4, max: 4, nonzero: true }, b: { min: -4, max: 4 }, c: { min: -6, max: 6 },
      d: { min: -4, max: 4 }, e: { min: -4, max: 4 }, f: { min: -6, max: 6 },
    },
    question:
      'Find the rank of the matrix\n' +
      '$$A = \\begin{pmatrix}{{a}}&{{b}}&{{c}}\\\\{{d}}&{{e}}&{{f}}\\end{pmatrix}$$',
    solution_unique:
      'Row reducing $A$ yields {{pivots}} pivot columns. ' +
      '$$\\operatorname{rank}(A) = {{rank}}$$',
    solution_inconsistent:
      'Row reducing yields {{rank}} nonzero rows. $\\operatorname{rank}(A) = {{rank}}$.',
    solution_infinite:
      'Row reducing yields {{rank}} nonzero rows. $\\operatorname{rank}(A) = {{rank}}$.',
    note: "Note 1"
  },

  // ── Pivots / Basic vs Free ─────────────────────────────────────────────────
  {
    id: 'sle-pivots-1',
    name: 'Identify pivots and free variables',
    topic: TOPIC,
    subtopic: 'No. Pivots of Matrix',
    difficulty: 'medium',
    compute: 'augmented2x3',
    params: {
      a: { min: -3, max: 3, nonzero: true }, b: { min: -3, max: 3 }, c: { min: -6, max: 6 },
      d: { min: -3, max: 3 }, e: { min: -3, max: 3 }, f: { min: -6, max: 6 },
    },
    question:
      'For the augmented matrix\n' +
      '$$\\left[\\begin{array}{cc|c}{{a}}&{{b}}&{{c}}\\\\{{d}}&{{e}}&{{f}}\\end{array}\\right]$$\n' +
      'state the number of pivot columns, basic variables, and free variables.',
    solution_unique:
      'After row reduction there are ${{pivots}}$ pivots. ' +
      'Basic variables: ${{pivots}}$.  Free variables: ${{freeVars}}$.',
    solution_inconsistent:
      'The system is inconsistent. Pivots: ${{pivots}}$, free variables: ${{freeVars}}$.',
    solution_infinite:
      'After row reduction: ${{pivots}}$ pivot(s), ${{freeVars}}$ free variable(s).',
    note: "Note 1"
  },

  // ── Number of Solutions ────────────────────────────────────────────────────
  {
    id: 'sle-numsol-1',
    name: 'Determine number of solutions',
    topic: TOPIC,
    subtopic: 'No. Solutions of Matrix',
    difficulty: 'easy',
    compute: 'augmented2x3',
    params: {
      a: { min: -4, max: 4, nonzero: true }, b: { min: -4, max: 4 }, c: { min: -6, max: 6 },
      d: { min: -4, max: 4 }, e: { min: -4, max: 4 }, f: { min: -6, max: 6 },
    },
    question:
      'Without fully solving, determine how many solutions the system\n' +
      '$$\\begin{cases}{{a}}x+{{b}}y={{c}}\\\\{{d}}x+{{e}}y={{f}}\\end{cases}$$\n' +
      'has. Justify using ranks.',
    solution_unique:
      '$\\operatorname{rank}(A) = \\operatorname{rank}(A|\\mathbf{b}) = {{rank}} = $ number of unknowns. ' +
      '**Unique solution.**',
    solution_inconsistent:
      '$\\operatorname{rank}(A) < \\operatorname{rank}(A|\\mathbf{b})$. ' +
      '**No solution** (inconsistent).',
    solution_infinite:
      '$\\operatorname{rank}(A) = \\operatorname{rank}(A|\\mathbf{b}) < $ number of unknowns. ' +
      '**Infinitely many solutions.**',
    note: "Note 1"
  },

  // ── Consistent vs Inconsistent ─────────────────────────────────────────────
  {
    id: 'sle-consistent-1',
    name: 'Classify as consistent or inconsistent',
    topic: TOPIC,
    subtopic: 'Inconsistent vs consistent',
    difficulty: 'easy',
    compute: 'augmented2x3',
    params: {
      a: { min: 1, max: 5, nonzero: true }, b: { min: -3, max: 3 }, c: { min: -8, max: 8 },
      d: { min: -3, max: 3 }, e: { min: 1, max: 5, nonzero: true }, f: { min: -8, max: 8 },
    },
    question:
      'Is the system\n' +
      '$$\\begin{cases}{{a}}x+{{b}}y={{c}}\\\\{{d}}x+{{e}}y={{f}}\\end{cases}$$\n' +
      'consistent or inconsistent? If consistent, state whether the solution is unique or not.',
    solution_unique:   'The system is **consistent** with a **unique solution**: $({{x1}}, {{x2}})$.',
    solution_inconsistent: 'The system is **inconsistent** — no solution exists.',
    solution_infinite: 'The system is **consistent** with **infinitely many solutions**.',
    note: "Note 1"
  },
]
