/**
 * topics/matrices.js
 *
 * Templates for: Matrices
 * Subtopics:
 *   - Basic Matrix operations
 *   - Linear transformations as Matrices
 *   - Determinant of n×n matrix
 *   - Adjugate Method of finding the inverse of n×n matrix
 */

export const TOPIC = 'Matrices'

export const templates = [
  // ── Basic Matrix Operations ────────────────────────────────────────────────
  {
    id: 'mat-ops-1',
    name: 'Matrix addition and scalar multiplication',
    topic: TOPIC,
    subtopic: 'Basic Matrix operations',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: -5, max: 5 }, b: { min: -5, max: 5 }, c: { min: -5, max: 5 }, d: { min: -5, max: 5 },
      e: { min: -5, max: 5 }, f: { min: -5, max: 5 }, g: { min: -5, max: 5 }, h: { min: -5, max: 5 },
      k: { min: 2, max: 5 },
    },
    question:
      'Let $A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$ and ' +
      '$B = \\begin{pmatrix}{{e}}&{{f}}\\\\{{g}}&{{h}}\\end{pmatrix}$. ' +
      'Compute ${{k}}A - B$.',
    solution:
      '$${{k}}A - B = ' +
      '\\begin{pmatrix}{{k}}({{a}})-{{e}}&{{k}}({{b}})-{{f}}\\\\' +
      '{{k}}({{c}})-{{g}}&{{k}}({{d}})-{{h}}\\end{pmatrix}$$\n' +
      'Evaluate each entry.',
    note: "Note 1"
  },

  {
    id: 'mat-ops-2',
    name: '2×2 matrix multiplication',
    topic: TOPIC,
    subtopic: 'Basic Matrix operations',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: -3, max: 3 }, b: { min: -3, max: 3 }, c: { min: -3, max: 3 }, d: { min: -3, max: 3 },
      e: { min: -3, max: 3 }, f: { min: -3, max: 3 }, g: { min: -3, max: 3 }, h: { min: -3, max: 3 },
    },
    question:
      'Compute $AB$ where ' +
      '$A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$, ' +
      '$B = \\begin{pmatrix}{{e}}&{{f}}\\\\{{g}}&{{h}}\\end{pmatrix}$.',
    solution:
      '$$AB = \\begin{pmatrix}' +
      '{{a}}({{e}})+{{b}}({{g}}) & {{a}}({{f}})+{{b}}({{h}})\\\\' +
      '{{c}}({{e}})+{{d}}({{g}}) & {{c}}({{f}})+{{d}}({{h}})' +
      '\\end{pmatrix}$$',
    note: "Note 1"
  },

  // ── Linear Transformations ─────────────────────────────────────────────────
  {
    id: 'mat-lt-1',
    name: 'Linear transformation matrix — rotation',
    topic: TOPIC,
    subtopic: 'Linear transformations as Matrices',
    difficulty: 'medium',
    compute: null,
    params: {
      px: { min: -4, max: 4 }, py: { min: -4, max: 4 },
    },
    question:
      'The linear transformation $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ is a ' +
      'counter-clockwise rotation by $90°$. ' +
      'Write the matrix $[T]$ and apply it to the vector ' +
      '$\\mathbf{v} = \\begin{pmatrix}{{px}}\\\\{{py}}\\end{pmatrix}$.',
    solution:
      '$[T] = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$. ' +
      '$[T]\\mathbf{v} = \\begin{pmatrix}({{py}})\\\\{{px}}\\end{pmatrix}$ ' +
      '(note: $-{{py}}$ in the first entry).',
    note: "Note 1"
  },

  {
    id: 'mat-lt-2',
    name: 'Image of a vector under a linear transformation',
    topic: TOPIC,
    subtopic: 'Linear transformations as Matrices',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: -3, max: 3 }, b: { min: -3, max: 3 },
      c: { min: -3, max: 3 }, d: { min: -3, max: 3 },
      vx: { min: -4, max: 4 }, vy: { min: -4, max: 4 },
    },
    question:
      'A linear transformation $T$ has matrix ' +
      '$[T] = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$. ' +
      'Find $T\\!\\left(\\begin{pmatrix}{{vx}}\\\\{{vy}}\\end{pmatrix}\\right)$.',
    solution:
      '$$T(\\mathbf{v}) = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}' +
      '\\begin{pmatrix}{{vx}}\\\\{{vy}}\\end{pmatrix} = ' +
      '\\begin{pmatrix}{{a}}({{vx}})+{{b}}({{vy}})\\\\{{c}}({{vx}})+{{d}}({{vy}})\\end{pmatrix}$$',
    note: "Note 1"
  },

  // ── Determinant ────────────────────────────────────────────────────────────
  {
    id: 'mat-det-2x2',
    name: '2×2 determinant',
    topic: TOPIC,
    subtopic: 'Determinant of n×n matrix',
    difficulty: 'easy',
    compute: 'determinant2x2',
    params: {
      a: { min: -6, max: 6 }, b: { min: -6, max: 6 },
      c: { min: -6, max: 6 }, d: { min: -6, max: 6 },
    },
    question:
      'Find $\\det(A)$ where $A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$.',
    solution: '$$\\det(A) = {{a}}({{d}}) - {{b}}({{c}}) = {{det}}$$',
    note: "Note 1"
  },

  {
    id: 'mat-det-3x3',
    name: '3×3 determinant by cofactor expansion',
    topic: TOPIC,
    subtopic: 'Determinant of n×n matrix',
    difficulty: 'medium',
    compute: 'determinant3x3',
    params: {
      a: { min: -4, max: 4 }, b: { min: -4, max: 4 }, c: { min: -4, max: 4 },
      d: { min: -4, max: 4 }, e: { min: -4, max: 4 }, f: { min: -4, max: 4 },
      g: { min: -4, max: 4 }, h: { min: -4, max: 4 }, k: { min: -4, max: 4 },
    },
    question:
      'Find $\\det(A)$ where $A=\\begin{pmatrix}{{a}}&{{b}}&{{c}}\\\\{{d}}&{{e}}&{{f}}\\\\{{g}}&{{h}}&{{k}}\\end{pmatrix}$.',
    solution:
      'Expanding along row 1:\n' +
      '$$\\det(A) = {{a}}\\begin{vmatrix}{{e}}&{{f}}\\\\{{h}}&{{k}}\\end{vmatrix}' +
      '-{{b}}\\begin{vmatrix}{{d}}&{{f}}\\\\{{g}}&{{k}}\\end{vmatrix}' +
      '+{{c}}\\begin{vmatrix}{{d}}&{{e}}\\\\{{g}}&{{h}}\\end{vmatrix}' +
      '= {{a}}({{m11}})-{{b}}({{m12}})+{{c}}({{m13}}) = {{det}}$$',
    note: "Note 1"
  },

  // ── Adjugate Inverse ───────────────────────────────────────────────────────
  {
    id: 'mat-inv-2x2',
    name: '2×2 inverse via adjugate method',
    topic: TOPIC,
    subtopic: 'Adjugate Method of finding the inverse of n×n matrix',
    difficulty: 'medium',
    compute: 'adjugateInverse2x2',
    params: {
      a: { min: -4, max: 4, nonzero: true }, b: { min: -4, max: 4 },
      c: { min: -4, max: 4 }, d: { min: -4, max: 4, nonzero: true },
    },
    question:
      'Use the adjugate method to find $A^{-1}$ where ' +
      '$A = \\begin{pmatrix}{{a}}&{{b}}\\\\{{c}}&{{d}}\\end{pmatrix}$, ' +
      'or state that $A$ is singular.',
    solution_invertible:
      '$\\det(A)={{det}}$. ' +
      'The adjugate is $\\operatorname{adj}(A)=\\begin{pmatrix}{{d}}&({{b}})\\\\({{c}})&{{a}}\\end{pmatrix}$. ' +
      '$$A^{-1}=\\frac{1}{{{det}}}\\begin{pmatrix}{{d}}&({{b}})\\\\({{c}})&{{a}}\\end{pmatrix}' +
      '=\\begin{pmatrix}{{inv_a}}&{{inv_b}}\\\\{{inv_c}}&{{inv_d}}\\end{pmatrix}$$',
    solution_singular:
      '$\\det(A) = {{a}}({{d}})-{{b}}({{c}}) = 0$. ' +
      'The matrix is **singular** — no inverse exists.',
    note: "Note 1"
  },
]
