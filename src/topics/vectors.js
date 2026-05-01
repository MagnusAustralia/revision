/**
 * topics/vectors.js
 *
 * Templates for: Vectors
 * Subtopics:
 *   - Cross / vector product
 *   - Triple products
 *   - Vector equation of a line
 *   - Intersection of lines / smallest distance between lines / point
 *   - Parametric vector equation of a plane
 *   - Intersection of line/point with plane, or distance from plane
 *   - Do three planes intersect, and how so
 */

export const TOPIC = 'Vectors'

export const templates = [
  // ── Cross / vector product ─────────────────────────────────────────────────
  {
    id: 'vec-cross-1',
    name: 'Cross product of two 3D vectors',
    topic: TOPIC,
    subtopic: 'Cross/vector product',
    difficulty: 'easy',
    compute: 'crossProduct',
    params: {
      a1: { min: -5, max: 5, nonzero: true },
      a2: { min: -5, max: 5 },
      a3: { min: -5, max: 5 },
      b1: { min: -5, max: 5, nonzero: true },
      b2: { min: -5, max: 5 },
      b3: { min: -5, max: 5 },
    },
    question:
      'Find $\\vec{a} \\times \\vec{b}$ where ' +
      '$\\vec{a} = \\langle {{a1}},\\, {{a2}},\\, {{a3}} \\rangle$ and ' +
      '$\\vec{b} = \\langle {{b1}},\\, {{b2}},\\, {{b3}} \\rangle$.',
    solution:
      '$$\\vec{a} \\times \\vec{b} = ' +
      '\\begin{vmatrix}\\vec{i} & \\vec{j} & \\vec{k} \\\\ ' +
      '{{a1}} & {{a2}} & {{a3}} \\\\ {{b1}} & {{b2}} & {{b3}}\\end{vmatrix}' +
      '= \\langle {{rx}},\\, {{ry}},\\, {{rz}} \\rangle$$',
    note: "Note 1"
  },

  {
    id: 'vec-cross-2',
    name: 'Magnitude of cross product',
    topic: TOPIC,
    subtopic: 'Cross/vector product',
    difficulty: 'medium',
    compute: 'crossProduct',
    params: {
      a1: { min: 1, max: 6 },
      a2: { min: -4, max: 4 },
      a3: { min: -4, max: 4 },
      b1: { min: -6, max: 6 },
      b2: { min: 1, max: 6 },
      b3: { min: -4, max: 4 },
    },
    question:
      'Given $\\vec{a} = \\langle {{a1}},\\, {{a2}},\\, {{a3}} \\rangle$ and ' +
      '$\\vec{b} = \\langle {{b1}},\\, {{b2}},\\, {{b3}} \\rangle$, ' +
      'find $|\\vec{a} \\times \\vec{b}|$.',
    solution:
      '$\\vec{a} \\times \\vec{b} = \\langle {{rx}},\\, {{ry}},\\, {{rz}} \\rangle$, ' +
      'so $|\\vec{a} \\times \\vec{b}| = \\sqrt{({{rx}})^2+({{ry}})^2+({{rz}})^2}$.',
    note: "Note 1"
  },

  // ── Triple products ────────────────────────────────────────────────────────
  {
    id: 'vec-triple-1',
    name: 'Scalar triple product',
    topic: TOPIC,
    subtopic: 'Triple products',
    difficulty: 'medium',
    compute: 'tripleProduct',
    params: {
      a1: { min: -4, max: 4 }, a2: { min: -4, max: 4 }, a3: { min: -4, max: 4 },
      b1: { min: -4, max: 4 }, b2: { min: -4, max: 4 }, b3: { min: -4, max: 4 },
      c1: { min: -4, max: 4 }, c2: { min: -4, max: 4 }, c3: { min: -4, max: 4 },
    },
    question:
      'Find the scalar triple product $\\vec{a} \\cdot (\\vec{b} \\times \\vec{c})$ where ' +
      '$\\vec{a} = \\langle {{a1}},{{a2}},{{a3}} \\rangle$, ' +
      '$\\vec{b} = \\langle {{b1}},{{b2}},{{b3}} \\rangle$, ' +
      '$\\vec{c} = \\langle {{c1}},{{c2}},{{c3}} \\rangle$.',
    solution:
      'First $\\vec{b} \\times \\vec{c} = \\langle {{bxcx}},{{bxcy}},{{bxcz}} \\rangle$. ' +
      'Then $\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = {{triple}}$.',
    note: "Note 1"
  },

  // ── Vector equation of a line ──────────────────────────────────────────────
  {
    id: 'vec-line-1',
    name: 'Vector equation of a line through two points',
    topic: TOPIC,
    subtopic: 'Vector equation of a line',
    difficulty: 'easy',
    compute: null,
    params: {
      px: { min: -5, max: 5 }, py: { min: -5, max: 5 }, pz: { min: -5, max: 5 },
      dx: { min: -4, max: 4, nonzero: true },
      dy: { min: -4, max: 4 },
      dz: { min: -4, max: 4 },
    },
    question:
      'Write the vector equation of the line passing through ' +
      '$P = ({{px}}, {{py}}, {{pz}})$ with direction vector ' +
      '$\\mathbf{d} = \\langle {{dx}}, {{dy}}, {{dz}} \\rangle$.',
    solution:
      '$$\\mathbf{r}(t) = \\begin{pmatrix}{{px}}\\\\{{py}}\\\\{{pz}}\\end{pmatrix} + ' +
      't\\begin{pmatrix}{{dx}}\\\\{{dy}}\\\\{{dz}}\\end{pmatrix}, \\quad t \\in \\mathbb{R}$$',
    note: "Note 1"
  },

  // ── Intersection of lines / smallest distance ──────────────────────────────
  {
    id: 'vec-lines-intersect-1',
    name: 'Lines: intersection or shortest distance',
    topic: TOPIC,
    subtopic: 'Intersection of lines / smallest distance',
    difficulty: 'hard',
    compute: 'linesIntersectOrDistance',
    params: {
      px: { min: -3, max: 3 }, py: { min: -3, max: 3 }, pz: { min: -3, max: 3 },
      dx: { min: -3, max: 3, nonzero: true },
      dy: { min: -3, max: 3, nonzero: true },
      dz: { min: -3, max: 3 },
      qx: { min: -3, max: 3 }, qy: { min: -3, max: 3 }, qz: { min: -3, max: 3 },
      ex: { min: -3, max: 3, nonzero: true },
      ey: { min: -3, max: 3, nonzero: true },
      ez: { min: -3, max: 3 },
    },
    question:
      'Lines $\\ell_1$ and $\\ell_2$ are given by\n' +
      '$$\\ell_1:\\mathbf{r}=\\begin{pmatrix}{{px}}\\\\{{py}}\\\\{{pz}}\\end{pmatrix}' +
      '+s\\begin{pmatrix}{{dx}}\\\\{{dy}}\\\\{{dz}}\\end{pmatrix},\\quad ' +
      '\\ell_2:\\mathbf{r}=\\begin{pmatrix}{{qx}}\\\\{{qy}}\\\\{{qz}}\\end{pmatrix}' +
      '+t\\begin{pmatrix}{{ex}}\\\\{{ey}}\\\\{{ez}}\\end{pmatrix}$$\n' +
      'Determine whether $\\ell_1$ and $\\ell_2$ intersect. ' +
      'If so, state the point of intersection $A$; otherwise find the shortest distance $d$.',
    solution_intersect:
      'Setting $\\ell_1 = \\ell_2$ gives parameters $s = {{s}},\\; t = {{t}}$. ' +
      'Check: all three components are consistent. ' +
      'The lines **intersect** at $$A = ({{ax}},\\, {{ay}},\\, {{az}}).$$',
    solution_skew:
      'The system $\\ell_1 = \\ell_2$ is inconsistent, so the lines are **skew**. ' +
      'The common perpendicular direction is $\\mathbf{n} = \\mathbf{d}_1 \\times \\mathbf{d}_2$. ' +
      'The shortest distance is $$d = \\frac{|(\\mathbf{q}-\\mathbf{p})\\cdot\\mathbf{n}|}{|\\mathbf{n}|} = {{distance}}.$$',
    note: "Note 1"
  },

  // ── Parametric vector equation of a plane ──────────────────────────────────
  {
    id: 'vec-plane-1',
    name: 'Parametric vector equation of a plane',
    topic: TOPIC,
    subtopic: 'Parametric vector equation of a plane',
    difficulty: 'medium',
    compute: null,
    params: {
      px: { min: -4, max: 4 }, py: { min: -4, max: 4 }, pz: { min: -4, max: 4 },
      u1: { min: -3, max: 3, nonzero: true }, u2: { min: -3, max: 3 }, u3: { min: -3, max: 3 },
      v1: { min: -3, max: 3 }, v2: { min: -3, max: 3, nonzero: true }, v3: { min: -3, max: 3 },
    },
    question:
      'Write the parametric vector equation of the plane passing through ' +
      '$P = ({{px}}, {{py}}, {{pz}})$ with spanning vectors ' +
      '$\\mathbf{u} = \\langle {{u1}}, {{u2}}, {{u3}} \\rangle$ and ' +
      '$\\mathbf{v} = \\langle {{v1}}, {{v2}}, {{v3}} \\rangle$.',
    solution:
      '$$\\mathbf{r}(s,t) = \\begin{pmatrix}{{px}}\\\\{{py}}\\\\{{pz}}\\end{pmatrix}' +
      '+s\\begin{pmatrix}{{u1}}\\\\{{u2}}\\\\{{u3}}\\end{pmatrix}' +
      '+t\\begin{pmatrix}{{v1}}\\\\{{v2}}\\\\{{v3}}\\end{pmatrix},\\quad s,t\\in\\mathbb{R}$$',
    note: "Note 1"
  },

  // ── Intersection of line/point with plane ──────────────────────────────────
  {
    id: 'vec-plane-dist-1',
    name: 'Distance from point to plane',
    topic: TOPIC,
    subtopic: 'Intersection of line/point with plane',
    difficulty: 'medium',
    compute: 'pointPlaneDistance',
    params: {
      a: { min: 1, max: 4, nonzero: true },
      b: { min: -3, max: 3 },
      c: { min: -3, max: 3 },
      d: { min: -6, max: 6 },
      px: { min: -4, max: 4 }, py: { min: -4, max: 4 }, pz: { min: -4, max: 4 },
    },
    question:
      'Find the perpendicular distance from the point $Q = ({{px}}, {{py}}, {{pz}})$ ' +
      'to the plane ${{a}}x + {{b}}y + {{c}}z = {{d}}$, ' +
      'or determine whether $Q$ lies on the plane.',
    solution_onPlane:
      'Substituting $Q$: ${{a}}({{px}})+{{b}}({{py}})+{{c}}({{pz}})={{d}}$. ' +
      'The point **lies on the plane**.',
    solution_offPlane:
      'Using $\\displaystyle d = \\frac{|\\mathbf{n}\\cdot\\mathbf{q} - d|}{|\\mathbf{n}|}$: ' +
      '$$d = \\frac{|{{a}}({{px}})+{{b}}({{py}})+{{c}}({{pz}})-{{d}}|}' +
      '{\\sqrt{{{a}}^2+{{b}}^2+{{c}}^2}} = {{dist}}$$',
    note: "Note 1"
  },
]
