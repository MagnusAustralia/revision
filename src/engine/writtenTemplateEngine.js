/**
 * engine/writtenTemplateEngine.js
 *
 * Renders written (non-LaTeX) templates — used by ACC1100 and any future
 * non-maths subjects.
 *
 * Handles:
 *   1. Param generation from spec (int ranges, _pick arrays, _derived functions)
 *   2. computeFn execution to derive answer variables
 *   3. {{placeholder}} substitution in question strings
 *   4. Dynamic solution construction (entriesTemplate functions for journal entries)
 */

import { pick, randInt } from '../topics/acc1100/utils'

// ── Param generation ──────────────────────────────────────────────────────────

function generateWrittenParam(key, spec, allParams) {
  if (spec._pick) {
    return pick(spec._pick)
  }
  if (spec._derived) {
    return spec._derived(allParams)
  }
  const step = spec.step || 1
  return randInt(spec.min ?? 0, spec.max ?? 10, step)
}

function generateWrittenParams(paramSpec) {
  const result = {}
  // Two passes: first non-derived, then derived (which may depend on others)
  for (const [key, spec] of Object.entries(paramSpec)) {
    if (!spec._derived) result[key] = generateWrittenParam(key, spec, result)
  }
  for (const [key, spec] of Object.entries(paramSpec)) {
    if (spec._derived) result[key] = generateWrittenParam(key, spec, result)
  }
  return result
}

// ── Substitution ──────────────────────────────────────────────────────────────

function substituteWritten(text, vars) {
  if (!text) return ''
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in vars) {
      const v = vars[key]
      if (typeof v === 'number') {
        // Format numbers with commas for readability
        return v.toLocaleString('en-AU')
      }
      return String(v)
    }
    return match
  })
}

// ── Solution builder ──────────────────────────────────────────────────────────

function buildSolution(template, allVars) {
  const sol = template.solution

  // Static string answer
  if (typeof sol === 'string') {
    return substituteWritten(sol, allVars)
  }

  // Static object answer (no templates to fill)
  if (!sol) return ''

  // Journal entry with entriesTemplate function
  if (sol.type === 'journal' && sol.entriesTemplate) {
    return {
      type: 'journal',
      explanation: sol.explanationTemplate
        ? substituteWritten(sol.explanationTemplate, allVars)
        : '',
      entries: sol.entriesTemplate(allVars),
    }
  }

  // Any other static table structure — just substitute explanation if present
  if (sol.explanation !== undefined) {
    return {
      ...sol,
      explanation: substituteWritten(sol.explanation || '', allVars),
    }
  }

  return sol
}

// ── Main renderer ─────────────────────────────────────────────────────────────

export function renderWrittenTemplate(template) {
  // 1. Generate params
  const params = generateWrittenParams(template.params || {})

  // 2. Run computeFn if present
  let computedVars = {}
  if (template.computeFn) {
    const result = template.computeFn(params)
    computedVars = result.vars || {}
    // Attach any dynamic data (e.g. journalEntries for Q3)
    if (result.entriesData) {
      computedVars._entriesData = result.entriesData
    }
  }

  const allVars = { ...params, ...computedVars }

  // 3. Build question text
  let question
  if (template.question === null && computedVars._entriesData) {
    // Dynamic journal question — build question from entries
    const txList = computedVars._entriesData.map((e, i) => `${i + 1}. ${e.label}`).join('\n')
    question =
      `Record the following transactions in the General Journal, then post to the relevant Ledger accounts:\n\n${txList}`
  } else {
    question = substituteWritten(template.question || '', allVars)
  }

  // 4. Build solution
  let solution
  if (template.solution === null && computedVars._entriesData) {
    // Dynamic journal solution
    solution = {
      type: 'journal',
      explanation: '',
      entries: computedVars._entriesData.map(e => ({
        date:     e.date,
        debit:    e.debit,
        credit:   e.credit,
        narration: e.narration,
      })),
    }
  } else {
    solution = buildSolution(template, allVars)
  }

  return {
    question,
    solution,
    workingOut: null,   // working out is empty for now
    params,
    allVars,
    meta: {
      mode:       'written',
      topic:      template.topic      || '',
      subtopic:   template.subtopic   || '',
      difficulty: template.difficulty || 'medium',
      name:       template.name       || '',
    },
  }
}