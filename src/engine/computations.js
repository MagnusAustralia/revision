/**
 * engine/computations.js
 *
 * Registry of all compute functions used by templates.
 *
 * Each function receives the generated `params` object and returns:
 *   {
 *     vars:   { key: value, ... }   — derived values to substitute into LaTeX
 *     branch: string | null         — selects solution_<branch> on branching templates
 *   }
 *
 * To add a new compute function:
 *   1. Write the function below following the pattern
 *   2. Add it to the `computations` export map with a string key
 *   3. Reference that key in your template's `compute` field
 */

import { create, all } from 'mathjs'
const math = create(all)

// ── Helpers ───────────────────────────────────────────────────────────────────

const round = (v, dp = 4) => parseFloat(v.toFixed(dp))
const fmt   = (v, dp = 3) => parseFloat(v.toFixed(dp))

function crossVec(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0)
}

function norm(v) {
  return Math.sqrt(dot(v, v))
}

// ── Vectors ───────────────────────────────────────────────────────────────────

/**
 * Cross product: a × b
 * Derived vars: rx, ry, rz
 */
function crossProduct({ a1, a2, a3, b1, b2, b3 }) {
  const [rx, ry, rz] = crossVec([a1, a2, a3], [b1, b2, b3])
  return { vars: { rx, ry, rz }, branch: null }
}

/**
 * Scalar triple product: a · (b × c)
 * Derived vars: bxcx, bxcy, bxcz, triple
 */
function tripleProduct({ a1, a2, a3, b1, b2, b3, c1, c2, c3 }) {
  const bxc = crossVec([b1, b2, b3], [c1, c2, c3])
  const triple = dot([a1, a2, a3], bxc)
  return {
    vars: { bxcx: bxc[0], bxcy: bxc[1], bxcz: bxc[2], triple },
    branch: null,
  }
}

/**
 * Lines intersect or shortest distance (branching).
 * Params: point on l1 (px,py,pz), direction of l1 (dx,dy,dz),
 *         point on l2 (qx,qy,qz), direction of l2 (ex,ey,ez)
 * Branches: 'intersect' | 'skew'
 */
function linesIntersectOrDistance({ px, py, pz, dx, dy, dz, qx, qy, qz, ex, ey, ez }) {
  // Solve p + s*d = q + t*e  =>  s*d - t*e = q - p
  const w = [qx - px, qy - py, qz - pz]
  const d = [dx, dy, dz]
  const e = [ex, ey, ez]

  // Use x and z components to find s, t
  const det = d[0] * (-e[2]) - (-e[0]) * d[2]

  if (Math.abs(det) > 1e-10) {
    const s = (w[0] * (-e[2]) - (-e[0]) * w[2]) / det
    const t = (d[0] * w[2]   -  w[0]   * d[2]) / det

    // Verify with y component
    const checkY = py + s * dy - (qy + t * ey)

    if (Math.abs(checkY) < 1e-8) {
      const ax = Math.round(px + s * dx)
      const ay = Math.round(py + s * dy)
      const az = Math.round(pz + s * dz)
      return {
        vars: { ax, ay, az, s: fmt(s), t: fmt(t) },
        branch: 'intersect',
      }
    }
  }

  // Lines are skew — shortest distance via cross product formula
  const n   = crossVec(d, e)
  const nm  = norm(n)
  const distance = nm < 1e-10 ? 0 : round(Math.abs(dot(w, n)) / nm)

  return {
    vars: { distance },
    branch: 'skew',
  }
}

/**
 * Distance from a point to a plane.
 * Plane: ax + by + cz = d,  Point: (px, py, pz)
 * Derived vars: dist, onPlane (0 or 1 for branching)
 */
function pointPlaneDistance({ a, b, c, d, px, py, pz }) {
  const num  = Math.abs(a * px + b * py + c * pz - d)
  const denom = Math.sqrt(a * a + b * b + c * c) || 1
  const dist  = round(num / denom)
  return {
    vars:   { dist, onPlane: dist < 1e-6 ? 1 : 0 },
    branch: dist < 1e-6 ? 'onPlane' : 'offPlane',
  }
}

// ── Systems of Linear Equations ───────────────────────────────────────────────

/**
 * 2×3 augmented matrix — solve and classify.
 * Params: a,b,c,d,e,f  for [ a b | c ; d e | f ]
 * Derived vars: rank, pivots, solution classification string
 */
function augmented2x3({ a, b, c, d, e, f }) {
  // Row reduce manually for 2×2 system
  let m = [[a, b, c], [d, e, f]]

  // Pivot on column 0
  if (Math.abs(m[0][0]) < Math.abs(m[1][0])) [m[0], m[1]] = [m[1], m[0]]

  let rank = 0
  let pivots = 0

  if (Math.abs(m[0][0]) > 1e-10) {
    const factor = m[1][0] / m[0][0]
    m[1] = m[1].map((v, i) => round(v - factor * m[0][i]))
    rank++; pivots++
  }

  let consistent = true
  let infiniteSolutions = false

  if (Math.abs(m[1][1]) > 1e-10) {
    rank++; pivots++
    const x2 = round(m[1][2] / m[1][1])
    const x1 = round((m[0][2] - m[0][1] * x2) / (m[0][0] || 1))
    return {
      vars: { rank, pivots, freeVars: 0, x1, x2, solutionType: 'unique' },
      branch: 'unique',
    }
  } else if (Math.abs(m[1][2]) > 1e-10) {
    // Inconsistent
    return {
      vars: { rank, pivots, freeVars: 0, solutionType: 'inconsistent' },
      branch: 'inconsistent',
    }
  } else {
    // Free variable
    rank++
    return {
      vars: { rank, pivots, freeVars: 1, solutionType: 'infinite' },
      branch: 'infinite',
    }
  }
}

// ── Matrices ──────────────────────────────────────────────────────────────────

/**
 * 2×2 determinant.
 * Derived vars: det
 */
function determinant2x2({ a, b, c, d }) {
  return { vars: { det: a * d - b * c }, branch: null }
}

/**
 * 3×3 determinant via cofactor expansion along row 1.
 * Derived vars: det, m11, m12, m13 (minors), c11, c12, c13 (cofactors)
 */
function determinant3x3({ a, b, c, d, e, f, g, h, k }) {
  const m11 = e * k - f * h
  const m12 = d * k - f * g
  const m13 = d * h - e * g
  const det  = a * m11 - b * m12 + c * m13
  return {
    vars: { det, m11, m12, m13, c11: m11, c12: -m12, c13: m13 },
    branch: null,
  }
}

/**
 * 2×2 matrix inverse via adjugate method.
 * Derived vars: det, inv_a, inv_b, inv_c, inv_d (entries of A^{-1})
 * Branches: 'invertible' | 'singular'
 */
function adjugateInverse2x2({ a, b, c, d }) {
  const det = a * d - b * c
  if (Math.abs(det) < 1e-10) {
    return { vars: { det: 0 }, branch: 'singular' }
  }
  return {
    vars: {
      det,
      inv_a:  round(d / det),
      inv_b:  round(-b / det),
      inv_c:  round(-c / det),
      inv_d:  round(a / det),
    },
    branch: 'invertible',
  }
}

// ── Eigenvectors & Eigenvalues ────────────────────────────────────────────────

/**
 * 2×2 eigenvalues (real or complex).
 * Params: a, b, c, d  for matrix [[a,b],[c,d]]
 * Derived vars: trace, detM, disc, λ1, λ2 (or re, im for complex)
 * Branches: 'real' | 'complex' | 'repeated'
 */
function eigenvalues2x2({ a, b, c, d }) {
  const trace = a + d
  const detM  = a * d - b * c
  const disc  = trace * trace - 4 * detM

  if (Math.abs(disc) < 1e-10) {
    const lam = round(trace / 2)
    return {
      vars: { trace, detM, disc: 0, lam },
      branch: 'repeated',
    }
  } else if (disc > 0) {
    const lam1 = round((trace + Math.sqrt(disc)) / 2)
    const lam2 = round((trace - Math.sqrt(disc)) / 2)
    return {
      vars: { trace, detM, disc: round(disc), lam1, lam2 },
      branch: 'real',
    }
  } else {
    const re = round(trace / 2)
    const im = round(Math.sqrt(-disc) / 2)
    return {
      vars: { trace, detM, disc: round(disc), re, im },
      branch: 'complex',
    }
  }
}

/**
 * 3×3 eigenvalues via characteristic polynomial (integer-friendly params only).
 * Produces λ1, λ2, λ3 as integers by constructing the matrix from known eigenvalues.
 * Params: lam1, lam2, lam3 (the desired eigenvalues), off (off-diagonal filler)
 * Returns matrix entries and eigenvalues.
 */
function eigenvalues3x3({ lam1, lam2, lam3, off }) {
  // Build diagonal matrix D and a simple similarity transform
  // A = P D P^{-1} where P = I + off*ones to keep entries manageable
  // For simplicity we return a triangular matrix (eigenvalues = diagonal)
  const a = lam1, e = lam2, k = lam3
  const b = off, c = off, d = 0, f = off, g = 0, h = 0
  const trace = a + e + k
  const det3  = a * e * k
  return {
    vars: { a, b, c, d, e, f, g, h, k, lam1, lam2, lam3, trace, det3 },
    branch: null,
  }
}

// ── Multivariable Calculus ────────────────────────────────────────────────────

/**
 * Partial derivatives of f(x,y) = ax^m + bxy + cy^n.
 * Derived vars: fx (∂f/∂x), fy (∂f/∂y), fx_val, fy_val at (px, py)
 */
function partialDerivativePolynomial({ a, m, b, c, n, px, py }) {
  // ∂f/∂x = a*m*x^(m-1) + b*y
  // ∂f/∂y = b*x + c*n*y^(n-1)
  const fxAtP = a * m * Math.pow(px, m - 1) + b * py
  const fyAtP = b * px + c * n * Math.pow(py, n - 1)
  return {
    vars: {
      am: a * m, m1: m - 1,
      cn: c * n, n1: n - 1,
      px, py,
      fxAtP: round(fxAtP),
      fyAtP: round(fyAtP),
    },
    branch: null,
  }
}

/**
 * Critical points of f(x,y) = ax^2 + bxy + cy^2 + dx + ey.
 * Derived vars: critX, critY, fxx, fxy, fyy, disc, classification
 * Branches: 'saddle' | 'localMin' | 'localMax' | 'degenerate'
 */
function criticalPoints({ a, b, c, d, e }) {
  // ∂f/∂x = 2ax + by + d = 0
  // ∂f/∂y = bx + 2cy + e = 0
  const det = 4 * a * c - b * b
  if (Math.abs(det) < 1e-10) {
    return { vars: { fxx: 2*a, fxy: b, fyy: 2*c, disc: 0 }, branch: 'degenerate' }
  }
  const critX = round((-2 * c * d + b * e) / det)
  const critY = round((-2 * a * e + b * d) / det)
  const fxx   = 2 * a
  const fxy   = b
  const fyy   = 2 * c
  const disc  = fxx * fyy - fxy * fxy

  let branch = 'saddle'
  if (disc > 0 && fxx > 0) branch = 'localMin'
  else if (disc > 0 && fxx < 0) branch = 'localMax'
  else if (Math.abs(disc) < 1e-10) branch = 'degenerate'

  return {
    vars: { critX, critY, fxx, fxy, fyy, disc: round(disc) },
    branch,
  }
}

// ── Calculus ──────────────────────────────────────────────────────────────────

/**
 * Integration by parts: ∫ x^n · e^(ax) dx
 * Derived vars: n, a, result terms
 */
function integrationByParts({ n, a }) {
  // ∫ x^n e^{ax} dx = e^{ax}/a * x^n - n/a ∫ x^{n-1} e^{ax} dx
  const coeff1 = round(1 / a)
  const coeff2 = round(n / a)
  return {
    vars: { n, a, coeff1, coeff2, n1: n - 1 },
    branch: null,
  }
}

/**
 * Differentiation product rule: d/dx [x^n · e^(ax)]
 * Derived vars: n, a, n1, result
 */
function productRuleDiff({ n, a }) {
  return {
    vars: { n, a, n1: n - 1 },
    branch: null,
  }
}

/**
 * Differentiation of hyperbolic: d/dx [a·cosh(bx) + c·sinh(dx)]
 * Derived vars: ab, bd
 */
function hyperbolicDiff({ a, b, c, d }) {
  return {
    vars: { a, b, c, d, ab: a * b, cb: c * d },
    branch: null,
  }
}

// ── Registry ──────────────────────────────────────────────────────────────────

export const computations = {
  // Vectors
  crossProduct,
  tripleProduct,
  linesIntersectOrDistance,
  pointPlaneDistance,

  // Systems of Linear Equations
  augmented2x3,

  // Matrices
  determinant2x2,
  determinant3x3,
  adjugateInverse2x2,

  // Eigenvectors & Eigenvalues
  eigenvalues2x2,
  eigenvalues3x3,

  // Multivariable Calculus
  partialDerivativePolynomial,
  criticalPoints,

  // Calculus
  integrationByParts,
  productRuleDiff,
  hyperbolicDiff,
}
