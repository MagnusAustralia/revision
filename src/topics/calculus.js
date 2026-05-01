/**
 * topics/calculus.js
 *
 * Templates for: Calculus Questions
 * Subtopics:
 *   - Typical Integration by parts
 *   - Typical Integration by substitution
 *   - Integration of hyperbolic functions
 *   - Differentiation with product rule
 *   - Differentiation by substitution
 *   - Differentiation of hyperbolic functions
 */

export const TOPIC = 'Calculus'

export const templates = [
  // ── Integration by Parts ───────────────────────────────────────────────────
  {
    id: 'cal-ibp-1',
    name: 'Integration by parts — x^n · e^(ax)',
    topic: TOPIC,
    subtopic: 'Integration by parts',
    difficulty: 'medium',
    compute: 'integrationByParts',
    params: {
      n: { min: 1, max: 3 },
      a: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Evaluate $\\displaystyle\\int x^{{n}} e^{{{a}}x}\\,dx$ using integration by parts.',
    solution:
      'Let $u = x^{{n}}$, $dv = e^{{{a}}x}dx$.\n' +
      'Then $du = {{n}}x^{{n1}}dx$, $v = \\dfrac{1}{{{a}}}e^{{{a}}x}$.\n\n' +
      '$$\\int x^{{n}}e^{{{a}}x}dx = \\frac{x^{{n}}}{{{a}}}e^{{{a}}x} - \\frac{{{n}}}{{{a}}}\\int x^{{n1}}e^{{{a}}x}dx$$\n\n' +
      'Apply integration by parts again to the remaining integral if $n > 1$.',
    note: "Note 1"
  },

  {
    id: 'cal-ibp-2',
    name: 'Integration by parts — x · sin(ax)',
    topic: TOPIC,
    subtopic: 'Integration by parts',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
    },
    question:
      'Evaluate $\\displaystyle\\int x\\sin({{a}}x)\\,dx$.',
    solution:
      'Let $u = x$, $dv = \\sin({{a}}x)dx$.\n' +
      '$du = dx$, $v = -\\dfrac{\\cos({{a}}x)}{{{a}}}$.\n\n' +
      '$$\\int x\\sin({{a}}x)dx = -\\frac{x\\cos({{a}}x)}{{{a}}} + \\frac{1}{{{a}}}\\int\\cos({{a}}x)dx ' +
      '= -\\frac{x\\cos({{a}}x)}{{{a}}} + \\frac{\\sin({{a}}x)}{{{a}}^2} + C$$',
    note: "Note 1"
  },

  // ── Integration by Substitution ────────────────────────────────────────────
  {
    id: 'cal-sub-1',
    name: 'Integration by substitution — linear composite',
    topic: TOPIC,
    subtopic: 'Integration by substitution',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: -5, max: 5 },
      n: { min: 2, max: 5 },
    },
    question:
      'Evaluate $\\displaystyle\\int ({{a}}x + {{b}})^{{n}}\\,dx$ using an appropriate substitution.',
    solution:
      'Let $u = {{a}}x + {{b}}$, so $du = {{a}}\\,dx$, i.e. $dx = \\dfrac{du}{{{a}}}$.\n\n' +
      '$$\\int u^{{n}}\\cdot\\frac{du}{{{a}}} = \\frac{u^{{{n}}+1}}{{{a}}({{n}}+1)} + C ' +
      '= \\frac{({{a}}x+{{b}})^{{{n}}+1}}{{{a}}({{n}}+1)} + C$$',
    note: "Note 1"
  },

  {
    id: 'cal-sub-2',
    name: 'Integration by substitution — exponential',
    topic: TOPIC,
    subtopic: 'Integration by substitution',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Evaluate $\\displaystyle\\int {{b}}x\\, e^{{{a}}x^2}\\,dx$.',
    solution:
      'Let $u = {{a}}x^2$, so $du = 2({{a}})x\\,dx$, i.e. $x\\,dx = \\dfrac{du}{2({{a}})}$.\n\n' +
      '$$\\int {{b}}x\\,e^{{{a}}x^2}dx = \\frac{{{b}}}{2({{a}})}\\int e^u\\,du ' +
      '= \\frac{{{b}}}{2({{a}})}e^{{{a}}x^2} + C$$',
    note: "Note 1"
  },

  // ── Integration of Hyperbolic Functions ────────────────────────────────────
  {
    id: 'cal-hyp-int-1',
    name: 'Integrate hyperbolic functions',
    topic: TOPIC,
    subtopic: 'Integration of hyperbolic functions',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: 1, max: 4, nonzero: true },
      b: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Evaluate $\\displaystyle\\int \\bigl({{a}}\\cosh(x) + {{b}}\\sinh(x)\\bigr)\\,dx$.',
    solution:
      'Using $\\int\\cosh(x)dx = \\sinh(x)+C$ and $\\int\\sinh(x)dx = \\cosh(x)+C$:\n\n' +
      '$$\\int({{a}}\\cosh x + {{b}}\\sinh x)\\,dx = {{a}}\\sinh(x) + {{b}}\\cosh(x) + C$$',
    note: "Note 1"
  },

  {
    id: 'cal-hyp-int-2',
    name: 'Integrate sinh(ax)',
    topic: TOPIC,
    subtopic: 'Integration of hyperbolic functions',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
    },
    question:
      'Evaluate $\\displaystyle\\int \\sinh({{a}}x)\\,dx$.',
    solution:
      '$$\\int\\sinh({{a}}x)\\,dx = \\frac{\\cosh({{a}}x)}{{{a}}} + C$$',
    note: "Note 1"
  },

  // ── Differentiation with Product Rule ─────────────────────────────────────
  {
    id: 'cal-prod-1',
    name: 'Differentiate x^n · e^(ax) using product rule',
    topic: TOPIC,
    subtopic: 'Differentiation with product rule',
    difficulty: 'easy',
    compute: 'productRuleDiff',
    params: {
      n: { min: 1, max: 4 },
      a: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Differentiate $f(x) = x^{{n}} e^{{{a}}x}$ using the product rule.',
    solution:
      'Let $u = x^{{n}}$, $v = e^{{{a}}x}$.\n' +
      "$u' = {{n}}x^{{n1}},\\quad v' = {{a}}e^{{{a}}x}$.\n\n" +
      "$$f'(x) = u'v + uv' = {{n}}x^{{n1}}e^{{{a}}x} + {{a}}x^{{n}}e^{{{a}}x} " +
      '= x^{{n1}}e^{{{a}}x}\\bigl({{n}} + {{a}}x\\bigr)$$',
    note: "Note 1"
  },

  {
    id: 'cal-prod-2',
    name: 'Differentiate x^n · sin(ax) using product rule',
    topic: TOPIC,
    subtopic: 'Differentiation with product rule',
    difficulty: 'easy',
    compute: null,
    params: {
      n: { min: 1, max: 3 },
      a: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Differentiate $f(x) = x^{{n}}\\sin({{a}}x)$.',
    solution:
      "$$f'(x) = {{n}}x^{{{n}}-1}\\sin({{a}}x) + {{a}}x^{{n}}\\cos({{a}}x)$$",
    note: "Note 1"
  },

  // ── Differentiation by Substitution (Chain Rule) ───────────────────────────
  {
    id: 'cal-chain-1',
    name: 'Differentiate by substitution (chain rule) — (ax+b)^n',
    topic: TOPIC,
    subtopic: 'Differentiation by substitution',
    difficulty: 'easy',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: -5, max: 5 },
      n: { min: 2, max: 5 },
    },
    question:
      'Differentiate $f(x) = ({{a}}x + {{b}})^{{n}}$ using the chain rule.',
    solution:
      'Let $u = {{a}}x+{{b}}$, so $\\dfrac{du}{dx}={{a}}$.\n\n' +
      "$$f'(x) = {{n}}({{a}}x+{{b}})^{{{n}}-1} \\cdot {{a}} = {{a}}({{n}})({{a}}x+{{b}})^{{{n}}-1}$$",
    note: "Note 1"
  },

  {
    id: 'cal-chain-2',
    name: 'Chain rule — e^(ax^2 + b)',
    topic: TOPIC,
    subtopic: 'Differentiation by substitution',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: 1, max: 4, nonzero: true },
      b: { min: -4, max: 4 },
    },
    question:
      'Differentiate $f(x) = e^{{{a}}x^2 + {{b}}}$.',
    solution:
      'Let $u = {{a}}x^2+{{b}}$, $\\dfrac{du}{dx} = 2({{a}})x$.\n\n' +
      "$$f'(x) = e^{{{a}}x^2+{{b}}} \\cdot 2({{a}})x = 2({{a}})x\\,e^{{{a}}x^2+{{b}}}$$",
    note: "Note 1"
  },

  // ── Differentiation of Hyperbolic Functions ────────────────────────────────
  {
    id: 'cal-hyp-diff-1',
    name: 'Differentiate hyperbolic combination',
    topic: TOPIC,
    subtopic: 'Differentiation of hyperbolic functions',
    difficulty: 'easy',
    compute: 'hyperbolicDiff',
    params: {
      a: { min: 1, max: 5, nonzero: true },
      b: { min: 1, max: 4, nonzero: true },
      c: { min: 1, max: 5, nonzero: true },
      d: { min: 1, max: 4, nonzero: true },
    },
    question:
      'Differentiate $f(x) = {{a}}\\cosh({{b}}x) + {{c}}\\sinh({{d}}x)$.',
    solution:
      'Using $\\dfrac{d}{dx}\\cosh(kx) = k\\sinh(kx)$ and $\\dfrac{d}{dx}\\sinh(kx) = k\\cosh(kx)$:\n\n' +
      "$$f'(x) = {{ab}}\\sinh({{b}}x) + {{cb}}\\cosh({{d}}x)$$",
    note: "Note 1"
  },

  {
    id: 'cal-hyp-diff-2',
    name: 'Differentiate tanh(ax)',
    topic: TOPIC,
    subtopic: 'Differentiation of hyperbolic functions',
    difficulty: 'medium',
    compute: null,
    params: {
      a: { min: 1, max: 5, nonzero: true },
    },
    question:
      'Differentiate $f(x) = \\tanh({{a}}x)$ from first principles using ' +
      '$\\tanh x = \\dfrac{\\sinh x}{\\cosh x}$.',
    solution:
      'By the quotient rule:\n' +
      "$$f'(x) = \\frac{\\cosh({{a}}x)\\cdot{{a}}\\cosh({{a}}x) - \\sinh({{a}}x)\\cdot{{a}}\\sinh({{a}}x)}{\\cosh^2({{a}}x)}" +
      '= \\frac{{{a}}(\\cosh^2({{a}}x)-\\sinh^2({{a}}x))}{\\cosh^2({{a}}x)} = \\frac{{{a}}}{\\cosh^2({{a}}x)} = {{a}}\\operatorname{sech}^2({{a}}x)$$',
    note: "Note 1"
  },
]
