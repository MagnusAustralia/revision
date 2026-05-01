/**
 * topics/eigenvectorsEigenvalues.js
 *
 * Templates for: Eigenvectors and Eigenvalues
 * Subtopics:
 *   - No. eigenvectors/values
 *   - Complex eigenvalues
 *   - Repeated eigenvalues
 *   - Normal eigenvalues/eigenvectors
 *   - 3×3 matrix eigenvalues
 *   - Diagonalisation
 */

export const TOPIC = 'Eigenvectors and Eigenvalues'

export const templates = [
  // ── Normal eigenvalues/eigenvectors (2×2 real distinct) ───────────────────
  {
    id: 'eig-real-1',
    name: '2×2 real distinct eigenvalues and eigenvectors',
    topic: TOPIC,
    subtopic: 'Normal eigenvalues/eigenvectors',
    difficulty: 'medium',
    compute: 'eigenvalues2x2',
    params: {
      a: { min: -4, max: 4 }, b: { min: 1, max: 4, nonzero: true },
      c: { min: 1, max: 4, nonzero: true }, d: { min: -4, max: 4 },
    },
    question:
      'Find the eigenvalues and corresponding eigenvectors of ' +
      '$A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$.',
    solution_real:
      'Characteristic equation: $\\det(A-\\lambda I)=\\lambda^2 - {{trace}}\\lambda + {{detM}} = 0$.\n' +
      'Eigenvalues: $\\lambda_1 = {{lam1}},\\; \\lambda_2 = {{lam2}}$.\n' +
      'For each $\\lambda_i$, solve $(A - \\lambda_i I)\\mathbf{v} = \\mathbf{0}$ to find the eigenvector.',
    solution_complex:
      'Characteristic equation: $\\lambda^2 - {{trace}}\\lambda + {{detM}} = 0$.\n' +
      'Discriminant $= {{disc}} < 0$, so eigenvalues are complex:\n' +
      '$\\lambda = {{re}} \\pm {{im}}i$.',
    solution_repeated:
      'Characteristic equation: $(\\lambda - {{lam}})^2 = 0$.\n' +
      'Repeated eigenvalue $\\lambda = {{lam}}$. Check whether $A - \\lambda I = 0$ (gives 2 independent eigenvectors) or not (defective).',
    note: "Note 1"
  },

  // ── Complex eigenvalues ────────────────────────────────────────────────────
  {
    id: 'eig-complex-1',
    name: '2×2 complex eigenvalues',
    topic: TOPIC,
    subtopic: 'Complex eigenvalues',
    difficulty: 'hard',
    compute: 'eigenvalues2x2',
    params: {
      a: { min: 1, max: 4 }, b: { min: 1, max: 5, nonzero: true },
      c: { min: -5, max: -1, nonzero: true }, d: { min: 1, max: 4 },
    },
    question:
      'Find the eigenvalues of $A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$ ' +
      'and express any complex eigenvalues in the form $\\alpha \\pm \\beta i$.',
    solution_real:
      'Discriminant ${{disc}} > 0$: real eigenvalues $\\lambda_1={{lam1}},\\;\\lambda_2={{lam2}}$.',
    solution_complex:
      '$\\text{tr}(A)={{trace}},\\;\\det(A)={{detM}}$.\n' +
      'Characteristic polynomial: $\\lambda^2 - {{trace}}\\lambda + {{detM}} = 0$.\n' +
      'Discriminant $= {{disc}} < 0$.\n' +
      '$$\\lambda = {{re}} \\pm {{im}}\\,i$$',
    solution_repeated:
      'Repeated real eigenvalue $\\lambda = {{lam}}$.',
    note: "Note 1"
  },

  // ── Repeated eigenvalues ───────────────────────────────────────────────────
  {
    id: 'eig-repeated-1',
    name: '2×2 repeated eigenvalue',
    topic: TOPIC,
    subtopic: 'Repeated eigenvalues',
    difficulty: 'hard',
    compute: 'eigenvalues2x2',
    params: {
      a: { min: -3, max: 3 }, b: { min: -2, max: 2 },
      c: { min: -2, max: 2 }, d: { min: -3, max: 3 },
    },
    question:
      'The matrix $A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$ ' +
      'may have a repeated eigenvalue. Find all eigenvalues, state their algebraic multiplicity, ' +
      'and determine whether the matrix is defective.',
    solution_real:
      'Eigenvalues $\\lambda_1={{lam1}},\\;\\lambda_2={{lam2}}$ are distinct (both real).',
    solution_complex:
      'Complex eigenvalues ${{re}} \\pm {{im}}i$ — no repeated real eigenvalue.',
    solution_repeated:
      'Characteristic equation: $(\\lambda - {{lam}})^2=0$.\n' +
      'Algebraic multiplicity of $\\lambda={{lam}}$ is 2.\n' +
      'Compute $\\text{rank}(A - {{lam}}I)$: if rank $= 1$, geometric multiplicity $= 1$ → **defective**.\n' +
      'If rank $= 0$, geometric multiplicity $= 2$ → **not defective**.',
    note: "Note 1"
  },

  // ── Number of eigenvectors/values ─────────────────────────────────────────
  {
    id: 'eig-count-1',
    name: 'Number of eigenvalues of an n×n matrix',
    topic: TOPIC,
    subtopic: 'No. eigenvectors/values',
    difficulty: 'easy',
    compute: 'eigenvalues2x2',
    params: {
      a: { min: -5, max: 5 }, b: { min: -3, max: 3 },
      c: { min: -3, max: 3 }, d: { min: -5, max: 5 },
    },
    question:
      'How many eigenvalues (counted with multiplicity) does the $2 \\times 2$ matrix ' +
      '$A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$ have over $\\mathbb{C}$? ' +
      'Find them.',
    solution_real:
      'An $n\\times n$ matrix always has exactly $n$ eigenvalues over $\\mathbb{C}$ (counted with multiplicity). ' +
      'Here $n=2$, so there are **2 eigenvalues**: $\\lambda_1={{lam1}},\\;\\lambda_2={{lam2}}$.',
    solution_complex:
      'There are **2 eigenvalues** (complex conjugate pair): $\\lambda = {{re}} \\pm {{im}}i$.',
    solution_repeated:
      'There are **2 eigenvalues** (one repeated): $\\lambda={{lam}}$ with algebraic multiplicity 2.',
    note: "Note 1"
  },

  // ── 3×3 matrix eigenvalues ─────────────────────────────────────────────────
  {
    id: 'eig-3x3-1',
    name: '3×3 upper-triangular matrix eigenvalues',
    topic: TOPIC,
    subtopic: '3×3 matrix eigenvalues',
    difficulty: 'medium',
    compute: 'eigenvalues3x3',
    params: {
      lam1: { min: -4, max: 4 },
      lam2: { min: -4, max: 4 },
      lam3: { min: -4, max: 4 },
      off:  { min: 1, max: 3, nonzero: true },
    },
    question:
      'Find all eigenvalues of ' +
      '$A=\\begin{pmatrix}{{a}}&{{b}}&{{c}}\\\\{{d}}&{{e}}&{{f}}\\\\{{g}}&{{h}}&{{k}}\\end{pmatrix}$.',
    solution:
      'For a triangular matrix, the eigenvalues are the diagonal entries:\n' +
      '$$\\lambda_1={{lam1}},\\quad\\lambda_2={{lam2}},\\quad\\lambda_3={{lam3}}$$\n' +
      'Verify: $\\text{tr}(A)={{trace}} = \\lambda_1+\\lambda_2+\\lambda_3$, ' +
      '$\\det(A)={{det3}} = \\lambda_1\\lambda_2\\lambda_3$.',
    note: "Note 1"
  },

  // ── Diagonalisation ────────────────────────────────────────────────────────
  {
    id: 'eig-diag-1',
    name: 'Diagonalise a 2×2 matrix',
    topic: TOPIC,
    subtopic: 'Diagonalisation',
    difficulty: 'hard',
    compute: 'eigenvalues2x2',
    params: {
      a: { min: -3, max: 3 }, b: { min: 1, max: 4, nonzero: true },
      c: { min: 1, max: 4, nonzero: true }, d: { min: -3, max: 3 },
    },
    question:
      'Diagonalise $A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$ if possible. ' +
      'That is, find an invertible matrix $P$ and diagonal matrix $D$ such that $A = PDP^{-1}$.',
    solution_real:
      'Eigenvalues: $\\lambda_1={{lam1}},\\;\\lambda_2={{lam2}}$.\n' +
      'For each, solve $(A-\\lambda_i I)\\mathbf{v}=\\mathbf{0}$ for eigenvectors $\\mathbf{v}_1, \\mathbf{v}_2$.\n' +
      'Form $P=[\\mathbf{v}_1\\;\\mathbf{v}_2]$ and $D=\\begin{pmatrix}{{lam1}}&0\\\\0&{{lam2}}\\end{pmatrix}$.',
    solution_complex:
      'Eigenvalues are complex (${{re}}\\pm{{im}}i$). $A$ is not diagonalisable over $\\mathbb{R}$, ' +
      'but is diagonalisable over $\\mathbb{C}$.',
    solution_repeated:
      'Repeated eigenvalue $\\lambda={{lam}}$. Check geometric multiplicity: ' +
      'if $< 2$, $A$ is **not diagonalisable** (defective).',
    note: "Note 1"
  },
]
