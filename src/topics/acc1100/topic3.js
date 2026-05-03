/**
 * topics/acc1100/topic3.js
 * ACC1100 – Topic 3: Accrual accounting and adjusting entries
 *
 * Dynamic questions:
 *   - Accrued wages: randomise staff count, daily rate, days into week
 *   - Interest receivable: randomise principal, rate, months
 *   - Error spotting in journal entries
 */

export const TOPIC = 'Topic 3 – Accrual accounting and adjusting entries'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Monday','Tuesday','Wednesday','Thursday','Friday']

export const templates = [
  // ── Q1: Effect of two adjustments on financial statements ─────────────────
  {
    id: 'acc-t3-q1',
    name: 'Effect of adjustments on financial statements',
    topic: TOPIC,
    subtopic: 'Adjusting entries — effect on statements',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'A small consulting business needed to record two adjusting entries at month end:\n' +
      '1. Wages owing to staff of $2,200\n' +
      '2. Consulting services provided on credit but not recorded for $2,200\n\n' +
      'Explain the total effect on the Income Statement, Statement of Changes in Equity, and Balance Sheet of recording these adjustments.',
    solution:
      'Income Statement: The wages owing adjustment decreases profit (expense ↑), but the consulting services income adjustment increases it by the same amount — so overall no net change to profit.\n\n' +
      'Statement of Changes in Equity: No change, since there is no net change to profit from the income statement.\n\n' +
      'Balance Sheet: Assets increase by $2,200 (Accounts Receivable) and liabilities increase by $2,200 (Wages Payable). The balance sheet remains balanced with no change to equity.',
  },

  // ── Q2: Accrued wages — DYNAMIC ───────────────────────────────────────────
  {
    id: 'acc-t3-q2',
    name: 'Calculate accrued wages adjustment',
    topic: TOPIC,
    subtopic: 'Accrued wages',
    difficulty: 'easy',
    computeFn: (params) => {
      const { staffCount, dailyRate, endDay } = params
      const daysWorked = DAYS.indexOf(endDay) + 1   // Mon=1 … Fri=5
      const adjustment = staffCount * dailyRate * daysWorked
      return {
        vars: { daysWorked, adjustment },
        branch: null,
      }
    },
    params: {
      staffCount: { min: 2,   max: 6    },
      dailyRate:  { min: 600, max: 1500, step: 100 },
      endDay:     { _pick: DAYS },
    },
    mode: 'written',
    question:
      'Calculate the accrued wages adjustment required based on the following:\n\n' +
      '{{staffCount}} staff work Monday to Friday, each earning ${{dailyRate}} per day. ' +
      'They are paid on Saturday for the week they have just worked. ' +
      'The end of month falls on {{endDay}}.',
    solution:
      'Accrued wages adjustment: ${{adjustment}}\n\n' +
      'Calculation: {{staffCount}} staff × ${{dailyRate}} per day × {{daysWorked}} day(s) worked (Monday to {{endDay}})',
  },

  // ── Q3: Interest receivable — DYNAMIC ────────────────────────────────────
  {
    id: 'acc-t3-q3',
    name: 'Calculate interest receivable',
    topic: TOPIC,
    subtopic: 'Accrued income',
    difficulty: 'easy',
    computeFn: (params) => {
      const { principal, ratePct, investMonth, reportMonth } = params
      const months      = reportMonth - investMonth
      const interest    = Math.round(principal * (ratePct / 100 / 12) * months * 100) / 100
      const investName  = MONTHS[investMonth - 1]
      const reportName  = MONTHS[reportMonth - 1]
      return {
        vars: { months, interest, investName, reportName },
        branch: null,
      }
    },
    params: {
      principal:   { min: 50000,  max: 500000, step: 10000 },
      ratePct:     { min: 2,      max: 8,      step: 1     },
      investMonth: { min: 1,      max: 10     },
      reportMonth: { _derived: (p) => p.investMonth + Math.floor(Math.random() * 3) + 1 },
    },
    mode: 'written',
    question:
      '{{businessName}} invested ${{principal}} in a term deposit on 1 {{investName}}. ' +
      'The investment pays {{ratePct}}% per annum interest, but interest is not paid until end of term. ' +
      'If {{businessName}} is preparing financial statements for the year ended 31 {{reportName}}, ' +
      'calculate how much interest receivable will be reported.',
    solution:
      'Interest receivable: ${{interest}}\n\n' +
      'Calculation: ${{principal}} × ({{ratePct}}% ÷ 12) × {{months}} months\n' +
      '= ${{principal}} × {{ratePct}}/1200 × {{months}}\n' +
      '= ${{interest}}',
  },

  // ── Q4: Explain adjusting entries from ledger accounts ───────────────────
  {
    id: 'acc-t3-q4',
    name: 'Explain adjusting entries from ledger accounts',
    topic: TOPIC,
    subtopic: 'Adjusting entries — interpretation',
    difficulty: 'medium',
    computeFn: (params) => {
      const { interestAmount, electricityAmount } = params
      return { vars: { interestAmount, electricityAmount }, branch: null }
    },
    params: {
      interestAmount:    { min: 500,  max: 3000, step: 50  },
      electricityAmount: { min: 300,  max: 1500, step: 50  },
    },
    mode: 'written',
    question:
      'The following ledger account entries were recorded as adjusting entries at 31 January:\n\n' +
      '• Interest Receivable Dr ${{interestAmount}} / Interest Income Cr ${{interestAmount}}\n' +
      '• Electricity Expense Dr ${{electricityAmount}} / Electricity Payable Cr ${{electricityAmount}}\n\n' +
      'Based on the information, provide an explanation of the adjusting entries shown.',
    solution:
      'Interest Receivable (${{interestAmount}}): The business has earned interest income of ${{interestAmount}} that has not yet been received in cash. The adjusting entry records the asset (interest receivable) and the income earned for the period.\n\n' +
      'Electricity Payable (${{electricityAmount}}): The business has consumed electricity worth ${{electricityAmount}} during the period but has not yet paid the account. The adjusting entry records the expense incurred and the liability owed.',
  },

  // ── Q5: Find errors in journal entries — DYNAMIC ─────────────────────────
  {
    id: 'acc-t3-q5',
    name: 'Identify errors in adjusting journal entries',
    topic: TOPIC,
    subtopic: 'Adjusting entries — error identification',
    difficulty: 'hard',
    computeFn: (params) => {
      const { staff, wageEach, principal, ratePct, utilMonths, utilPerMonth } = params
      const correctWages   = staff * wageEach
      const wrongWages     = (staff - 1) * wageEach
      const correctInterest = Math.round(principal * ratePct / 100)
      const correctUtils   = utilMonths * utilPerMonth
      return {
        vars: { staff, wageEach, correctWages, wrongWages, principal, ratePct, correctInterest, utilMonths, utilPerMonth, correctUtils },
        branch: null,
      }
    },
    params: {
      staff:         { min: 2, max: 5   },
      wageEach:      { min: 400, max: 800, step: 50 },
      principal:     { min: 50000, max: 200000, step: 10000 },
      ratePct:       { min: 2, max: 6 },
      utilMonths:    { min: 2, max: 4 },
      utilPerMonth:  { min: 150, max: 400, step: 50 },
    },
    mode: 'written',
    question:
      'The following journal entries were prepared for adjustments at month end. Identify all errors.\n\n' +
      'Entry 1 — Wages Expense (Acct 405) Dr ${{wrongWages}} / Wages Payable (210) Cr ${{wrongWages}}\n' +
      'Narration: adjusting for wages owing, {{staff}} staff × ${{wageEach}} each\n\n' +
      'Entry 2 — Accounts Receivable (105) Dr ${{correctInterest}} / Interest Payable (215) Cr ${{correctInterest}}\n' +
      'Narration: recording interest earned at {{ratePct}}% of ${{principal}}\n\n' +
      'Entry 3 (dated prior month) — Utilities Payable (220) Dr ${{correctUtils}} / Utilities Expense (510) Cr ${{correctUtils}}\n' +
      'Narration: recording utilities owing {{utilMonths}} months × ${{utilPerMonth}}/month',
    solution:
      'Entry 1 errors:\n' +
      '• Wages Expense account number should start with 5 (e.g. 505), not 405\n' +
      '• Amount is incorrect: {{staff}} × ${{wageEach}} = ${{correctWages}}, not ${{wrongWages}}\n\n' +
      'Entry 2 errors:\n' +
      '• The credit should be Interest Income (account starting with 4), not Interest Payable\n' +
      '• Interest Payable is a liability — this is income earned, not a liability\n\n' +
      'Entry 3 errors:\n' +
      '• The date should be the current month, not the prior month\n' +
      '• The entry is reversed — utilities owing should be Dr Utilities Expense, Cr Utilities Payable',
  },
]