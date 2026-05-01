/**
 * engine/templateEngine.js
 *
 * Core rendering pipeline:
 *   1. generateParams()  — produce concrete values from a param spec
 *   2. runCompute()      — call the registered compute function to derive answer vars
 *   3. substitute()      — replace {{key}} placeholders in LaTeX strings
 *   4. pickSolution()    — choose the correct solution branch (for branching templates)
 *   5. renderTemplate()  — orchestrates 1-4 and returns { question, solution, meta }
 */

import { computations } from './computations'

// ── Param generation ─────────────────────────────────────────────────────────

/**
 * Generate a single concrete value from a param spec.
 * Spec shape: { min, max, nonzero, integer, float, decimals }
 */
export function generateParam(spec) {
  const {
    min = -5,
    max = 5,
    nonzero = false,
    integer = true,
    decimals = 2,
  } = spec

  let value
  let attempts = 0

  do {
    if (integer) {
      value = Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      const raw = Math.random() * (max - min) + min
      value = parseFloat(raw.toFixed(decimals))
    }
    attempts++
    if (attempts > 200) {
      // fallback: return min+1 or max to avoid infinite loop
      value = nonzero ? (min >= 0 ? Math.max(1, min) : min + 1) : min
      break
    }
  } while (nonzero && value === 0)

  return value
}

/**
 * Generate all params defined in a spec object.
 * Returns { paramName: concreteValue, ... }
 */
export function generateParams(paramSpec) {
  const result = {}
  for (const [key, spec] of Object.entries(paramSpec)) {
    result[key] = generateParam(spec)
  }
  return result
}

// ── Substitution ─────────────────────────────────────────────────────────────

/**
 * Replace all {{key}} occurrences in a LaTeX string with values from vars.
 * Unresolved placeholders are left as-is so they're visible during authoring.
 */
export function substitute(latex, vars) {
  if (!latex) return ''
  return latex.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in vars) {
      const v = vars[key]
      // Wrap negative numbers in parens when they appear mid-expression
      return typeof v === 'number' && v < 0 ? `(${v})` : String(v)
    }
    return match // leave unreplaced so the author can spot missing vars
  })
}

// ── Solution branch picker ────────────────────────────────────────────────────

/**
 * Given a template and a branch name (or null), return the right solution string.
 * Branching templates store solution_<branch> keys (e.g. solution_intersect).
 * Non-branching templates use a single `solution` key.
 */
export function pickSolution(template, branch) {
  if (branch && template[`solution_${branch}`]) {
    return template[`solution_${branch}`]
  }
  return template.solution || ''
}

// ── Main render ───────────────────────────────────────────────────────────────

/**
 * Fully render one question from a template.
 * Returns:
 *   {
 *     question: string,   // LaTeX string ready for MathJax
 *     solution: string,   // LaTeX string ready for MathJax
 *     branch:   string|null,
 *     params:   object,   // raw generated params (useful for debugging)
 *     allVars:  object,   // params + computed vars
 *     meta: { topic, subtopic, difficulty, name }
 *   }
 */
export function renderTemplate(template) {
  // 1. Generate concrete values for all declared params
  const params = generateParams(template.params || {})

  // 2. Run compute function if specified
  let computedVars = {}
  let branch = null

  if (template.compute) {
    const fn = computations[template.compute]
    if (!fn) throw new Error(`Unknown compute function: "${template.compute}"`)
    const result = fn(params)
    computedVars = result.vars || {}
    branch = result.branch || null
  }

  const allVars = { ...params, ...computedVars }

  // 3. Substitute into question LaTeX
  const question = substitute(template.question, allVars)

  // 4. Pick and substitute into solution LaTeX
  const solutionTemplate = pickSolution(template, branch)
  const solution = substitute(solutionTemplate, allVars)

  return {
    question,
    solution,
    branch,
    params,
    allVars,
    meta: {
      topic:      template.topic      || '',
      subtopic:   template.subtopic   || '',
      difficulty: template.difficulty || 'medium',
      name:       template.name       || '',
    },
  }
}
