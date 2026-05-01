/**
 * topics/multivariableCalculus.js
 *
 * Templates for: Multivariable Calculus
 * Subtopics:
 *   - Partial Derivative
 *   - Directional Derivatives
 *   - Gradient of a function
 *   - Tangent plane
 *   - Critical points and characterisation
 *   - Absolute maxima and minima
 *   - Lagrange multipliers
 *   - Parameterisation of curves
 *   - Tangent vectors
 *   - Parameterisation of surfaces
 */

export const TOPIC = 'Multivariable Calculus'

export const templates = [
  // ── Partial Derivatives ────────────────────────────────────────────────────
  {
    id: 'mvc-partial-1',
    name: 'Partial derivatives of a polynomial in x and y',
    topic: TOPIC,
    subtopic: 'Partial Derivative',
    difficulty: 'easy',
    compute: 'partialDerivativePolynomial',
    params: {
      a: { min: 1, max: 5, nonzero: true },
      m: { min: 2, max: 4 },
      b: { min: -4, max: 4, nonzero: true },
      c: { min: 1, max: 5, nonzero: true },
      n: { min: 2, max: 4 },
      px: { min: 1, max: 3, nonzero: true },
      py: { min: 1, max: 3, nonzero: true },
    },
    question:
      'Let $f(x,y) = {{a}}x^{{m}} + {{b}}xy + {{c}}y^{{n}}$. ' +
      'Find $\\dfrac{\\partial f}{\\partial x}$ and $\\dfrac{\\partial f}{\\partial y}$, ' +
      'then evaluate both at the point $({{px}}, {{py}})$.',
    solution:
      '$\\dfrac{\\partial f}{\\partial x} = {{am}}x^{{m1}} + {{b}}y$, ' +
      'so $f_x({{px}},{{py}}) = {{fxAtP}}$.\n\n' +
      '$\\dfrac{\\partial f}{\\partial y} = {{b}}x + {{cn}}y^{{n1}}$, ' +
      'so $f_y({{px}},{{py}}) = {{fyAtP}}$.',
    note: "Note 1"
  },

  // ── Gradient ───────────────────────────────────────────────────────────────
  {
    id: 'mvc-grad-1',
    name: 'Gradient of a polynomial function',
    topic: TOPIC,
    subtopic: 'Gradient of a function',
    difficulty: 'easy',
    compute: 'partialDerivativePolynomial',
    params: {
      a: { min: 1, max: 5, nonzero: true },
      m: { min: 2, max: 3 },
      b: { min: -4, max: 4, nonzero: true },
      c: { min: 1, max: 5, nonzero: true },
      n: { min: 2, max: 3 },
      px: { min: 1, max: 3, nonzero: true },
      py: { min: 1, max: 3, nonzero: true },
    },
    question:
      'Find the gradient $\\nabla f$ of $f(x,y) = {{a}}x^{{m}} + {{b}}xy + {{c}}y^{{n}}$ ' +
      'and evaluate it at $({{px}}, {{py}})$.',
    solution:
      '$\\nabla f = \\langle f_x,\\, f_y \\rangle = ' +
      '\\langle {{am}}x^{{m1}} + {{b}}y,\\; {{b}}x + {{cn}}y^{{n1}} \\rangle$.\n\n' +
      'At $({{px}},{{py}})$: $\\nabla f = \\langle {{fxAtP}},\\, {{fyAtP}} \\rangle$.',
    note: "Note 1"
  },

  // ── Directional Derivatives ────────────────────────────────────────────────
  {
    id: 'mvc-dir-1',
    name: 'Directional derivative',
    topic: TOPIC,
    subtopic: 'Directional Derivatives',
    difficulty: 'medium',
    compute: 'partialDerivativePolynomial',
    params: {
      a: { min: 1, max: 4, nonzero: true },
      m: { min: 2, max: 3 },
      b: { min: -3, max: 3, nonzero: true },
      c: { min: 1, max: 4, nonzero: true },
      n: { min: 2, max: 3 },
      px: { min: 1, max: 3, nonzero: true },
      py: { min: 1, max: 3, nonzero: true },
    },
    question:
      'Find the directional derivative of $f(x,y) = {{a}}x^{{m}} + {{b}}xy + {{c}}y^{{n}}$ ' +
      'at $({{px}}, {{py}})$ in the direction of $\\mathbf{u} = \\langle 1, 1 \\rangle$.',
    solution:
      'Unit vector: $\\hat{\\mathbf{u}} = \\dfrac{1}{\\sqrt{2}}\\langle 1,1 \\rangle$.\n\n' +
      '$\\nabla f({{px}},{{py}}) = \\langle {{fxAtP}},\\, {{fyAtP}} \\rangle$.\n\n' +
      '$D_{\\hat{u}}f = \\nabla f \\cdot \\hat{\\mathbf{u}} = ' +
      '\\dfrac{{{fxAtP}} + {{fyAtP}}}{\\sqrt{2}}$.',
    note: "Note 1"
  },

  // ── Tangent Plane ──────────────────────────────────────────────────────────
  {
    id: 'mvc-tangent-plane-1',
    name: 'Equation of the tangent plane',
    topic: TOPIC,
    subtopic: 'Tangent plane',
    difficulty: 'medium',
    compute: 'partialDerivativePolynomial',
    params: {
      a: { min: 1, max: 4, nonzero: true },
      m: { min: 2, max: 2 },
      b: { min: -3, max: 3, nonzero: true },
      c: { min: 1, max: 4, nonzero: true },
      n: { min: 2, max: 2 },
      px: { min: 1, max: 3, nonzero: true },
      py: { min: 1, max: 3, nonzero: true },
    },
    question:
      'Find the equation of the tangent plane to the surface $z = f(x,y) = {{a}}x^2 + {{b}}xy + {{c}}y^2$ ' +
      'at the point $({{px}}, {{py}}, f({{px}},{{py}}))$.',
    solution:
      '$f_x = {{am}}x + {{b}}y$, so $f_x({{px}},{{py}}) = {{fxAtP}}$.\n' +
      '$f_y = {{b}}x + {{cn}}y$, so $f_y({{px}},{{py}}) = {{fyAtP}}$.\n\n' +
      'Tangent plane:\n' +
      '$$z - f({{px}},{{py}}) = {{fxAtP}}(x - {{px}}) + {{fyAtP}}(y - {{py}})$$',
    note: "Note 1"
  },

  // ── Critical Points ────────────────────────────────────────────────────────
  {
    id: 'mvc-critical-1',
    name: 'Critical points and second derivative test',
    topic: TOPIC,
    subtopic: 'Critical points and characterisation',
    difficulty: 'hard',
    compute: 'criticalPoints',
    params: {
      a: { min: 1, max: 4, nonzero: true },
      b: { min: -3, max: 3 },
      c: { min: 1, max: 4, nonzero: true },
      d: { min: -6, max: 6 },
      e: { min: -6, max: 6 },
    },
    question:
      'Find and classify all critical points of ' +
      '$f(x,y) = {{a}}x^2 + {{b}}xy + {{c}}y^2 + {{d}}x + {{e}}y$.',
    solution_localMin:
      'Set $f_x = 2({{a}})x + {{b}}y + {{d}} = 0$ and $f_y = {{b}}x + 2({{c}})y + {{e}} = 0$.\n' +
      'Critical point: $({{critX}},\\, {{critY}})$.\n' +
      'Second derivative test: $D = f_{xx}f_{yy} - f_{xy}^2 = {{fxx}}({{fyy}}) - ({{fxy}})^2 = {{disc}} > 0$, ' +
      '$f_{xx} = {{fxx}} > 0$ → **local minimum**.',
    solution_localMax:
      'Critical point: $({{critX}},\\, {{critY}})$.\n' +
      '$D = {{disc}} > 0$, $f_{xx} = {{fxx}} < 0$ → **local maximum**.',
    solution_saddle:
      'Critical point: $({{critX}},\\, {{critY}})$.\n' +
      '$D = {{disc}} < 0$ → **saddle point**.',
    solution_degenerate:
      'The discriminant $D = {{disc}} \\approx 0$; the second derivative test is **inconclusive**.',
    note: "Note 1"
  },

  // ── Absolute Maxima and Minima ─────────────────────────────────────────────
  {
    id: 'mvc-absmax-1',
    name: 'Absolute extrema on a closed region',
    topic: TOPIC,
    subtopic: 'Absolute maxima and minima',
    difficulty: 'hard',
    compute: 'criticalPoints',
    params: {
      a: { min: 1, max: 3, nonzero: true },
      b: { min: -2, max: 2 },
      c: { min: 1, max: 3, nonzero: true },
      d: { min: -4, max: 4 },
      e: { min: -4, max: 4 },
    },
    question:
      'Find the absolute maximum and minimum values of ' +
      '$f(x,y) = {{a}}x^2 + {{b}}xy + {{c}}y^2 + {{d}}x + {{e}}y$ ' +
      'on the closed unit disk $x^2 + y^2 \\leq 1$.',
    solution_localMin:
      'Interior critical point at $({{critX}},{{critY}})$ — check whether it lies in the disk.\n' +
      'On the boundary $x^2+y^2=1$, parametrise as $x=\\cos\\theta,\\,y=\\sin\\theta$ and optimise $f$.\n' +
      'Compare all candidate values to find the absolute max and min.',
    solution_localMax:
      'Interior critical point at $({{critX}},{{critY}})$ — check whether it lies in the disk.\n' +
      'On the boundary $x^2+y^2=1$, parametrise as $x=\\cos\\theta,\\,y=\\sin\\theta$ and optimise $f$.\n' +
      'Compare all candidate values to find the absolute max and min.',
    solution_saddle:
      'Interior critical point $({{critX}},{{critY}})$ is a saddle — not a local extremum.\n' +
      'Absolute extrema must occur on the boundary $x^2+y^2=1$.',
    solution_degenerate:
      'Test is inconclusive at the interior critical point. Evaluate on boundary as well.',
    note: "Note 1"
  },

  // ── Lagrange Multipliers ───────────────────────────────────────────────────
  {
    id: 'mvc-lagrange-1',
    name: 'Lagrange multipliers — optimise on a circle',
    topic: TOPIC,
    subtopic: 'Lagrange multipliers',
    difficulty: 'hard',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: 1, max: 5, nonzero: true },
      r: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Use Lagrange multipliers to find the maximum and minimum values of ' +
      '$f(x,y) = {{a}}x + {{b}}y$ subject to the constraint $x^2 + y^2 = {{r}}^2$.',
    solution:
      'Set $\\nabla f = \\lambda \\nabla g$ where $g = x^2+y^2-{{r}}^2$.\n' +
      '${{a}} = 2\\lambda x$ and ${{b}} = 2\\lambda y$.\n' +
      'Dividing: $\\dfrac{{{a}}}{{{b}}} = \\dfrac{x}{y}$, so $x = \\dfrac{{{a}}}{{{b}}}y$.\n' +
      'Substitute into constraint and solve for $y$, then $x$.\n' +
      '$f_{\\max} = {{r}}\\sqrt{{{a}}^2+{{b}}^2}$, $f_{\\min} = -{{r}}\\sqrt{{{a}}^2+{{b}}^2}$.',
    note: "Note 1"
  },

  // ── Parameterisation of Curves ─────────────────────────────────────────────
  {
    id: 'mvc-curve-1',
    name: 'Parametrise a curve',
    topic: TOPIC,
    subtopic: 'Parameterisation of curves',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: 1, max: 5, nonzero: true },
    },
    question:
      'Parametrise the ellipse $\\dfrac{x^2}{{{a}}^2} + \\dfrac{y^2}{{{b}}^2} = 1$ ' +
      'for $t \\in [0, 2\\pi]$.',
    solution:
      '$$\\mathbf{r}(t) = \\langle {{a}}\\cos t,\\; {{b}}\\sin t \\rangle, \\quad t \\in [0,2\\pi]$$\n' +
      'Check: $\\dfrac{({{a}}\\cos t)^2}{{{a}}^2}+\\dfrac{({{b}}\\sin t)^2}{{{b}}^2}=\\cos^2 t+\\sin^2 t=1$ ✓',
    note: "Note 1"
  },

  // ── Tangent Vectors ────────────────────────────────────────────────────────
  {
    id: 'mvc-tanvec-1',
    name: 'Tangent vector to a parametric curve',
    topic: TOPIC,
    subtopic: 'Tangent vectors',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: 1, max: 4, nonzero: true },
      b: { min: 1, max: 4, nonzero: true },
      t0: { min: 0, max: 3 },
    },
    question:
      'Find the unit tangent vector to the curve ' +
      '$\\mathbf{r}(t) = \\langle {{a}}\\cos t,\\; {{b}}\\sin t,\\; t \\rangle$ at $t = {{t0}}$.',
    solution:
      "$\\mathbf{r}'(t) = \\langle -{{a}}\\sin t,\\; {{b}}\\cos t,\\; 1 \\rangle$.\n" +
      "At $t={{t0}}$: $\\mathbf{r}'({{t0}}) = \\langle -{{a}}\\sin({{t0}}),\\; {{b}}\\cos({{t0}}),\\; 1 \\rangle$.\n" +
      "$$\\hat{\\mathbf{T}} = \\frac{\\mathbf{r}'({{t0}})}{|\\mathbf{r}'({{t0}})|}$$",
    note: "Note 1"
  },

  // ── Parameterisation of Surfaces ───────────────────────────────────────────
  {
    id: 'mvc-surf-1',
    name: 'Parametrise a cylinder',
    topic: TOPIC,
    subtopic: 'Parameterisation of surfaces',
    difficulty: 'medium',
    compute: null,
    params: {
      r: { min: 1, max: 4, nonzero: true },
      h: { min: 1, max: 5, nonzero: true },
    },
    question:
      'Write a parametric description of the cylinder $x^2 + y^2 = {{r}}^2$, ' +
      '$0 \\leq z \\leq {{h}}$.',
    solution:
      '$$\\mathbf{r}(\\theta, z) = \\langle {{r}}\\cos\\theta,\\; {{r}}\\sin\\theta,\\; z \\rangle, ' +
      '\\quad \\theta \\in [0,2\\pi],\\; z \\in [0,{{h}}]$$',
    note: "Note 1"
  },
]
