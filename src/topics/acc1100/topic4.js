/**
 * topics/acc1100/topic4.js
 * ACC1100 – Topic 4: Adjusting entries (continued) and preparation of reports
 */

export const TOPIC = 'Topic 4 – Adjusting entries and report preparation'

export const templates = [
  // ── Q1: Standard adjusting entry patterns ────────────────────────────────
  {
    id: 'acc-t4-q1',
    name: 'Standard adjusting entry patterns',
    topic: TOPIC,
    subtopic: 'Adjusting entries — patterns',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      '"Adjusting entries follow a pattern — they involve an account from the balance sheet and an account from the income statement, but they don\'t ever involve cash."\n\nProvide the standard journal entries for each type of adjustment to prove this statement is correct.',
    solution: {
      type: 'plain',
      explanation: 'Each adjusting entry pairs an Income Statement account with a Balance Sheet account — never Cash:',
      adjustmentTable: [
        { adjustment: 'Accrued Expense',    incomeStatement: 'Dr Expense',    balanceSheet: 'Cr Expense Payable (Liability)'       },
        { adjustment: 'Accrued Income',     incomeStatement: 'Cr Income',     balanceSheet: 'Dr Income Receivable (Asset)'         },
        { adjustment: 'Prepaid Expense',    incomeStatement: 'Dr Expense',    balanceSheet: 'Cr Prepaid Expense (Asset)'           },
        { adjustment: 'Prepaid Income',     incomeStatement: 'Cr Income',     balanceSheet: 'Dr Unearned Income (Liability)'       },
        { adjustment: 'Depreciation',       incomeStatement: 'Dr Expense',    balanceSheet: 'Cr Accumulated Depreciation (−Asset)' },
        { adjustment: 'Doubtful Debts',     incomeStatement: 'Dr Expense',    balanceSheet: 'Cr Allowance for Doubtful Debts (−Asset)' },
      ],
    },
  },

  // ── Q2a: Prepaid income adjustment — DYNAMIC ─────────────────────────────
  {
    id: 'acc-t4-q2a',
    name: 'Prepaid income adjustment',
    topic: TOPIC,
    subtopic: 'Prepaid income',
    difficulty: 'medium',
    computeFn: (params) => {
      const { totalAmount, pctComplete } = params
      const earned    = Math.round(totalAmount * pctComplete / 100)
      const unearned  = totalAmount - earned
      return { vars: { earned, unearned }, branch: null }
    },
    params: {
      totalAmount:  { min: 5000,  max: 20000, step: 1000 },
      pctComplete:  { _pick: [25, 30, 40, 50, 60, 70, 75] },
    },
    mode: 'written',
    question:
      'A business received ${{totalAmount}} from a customer in advance for services to be performed, ' +
      'which was recorded as Service Income. At the end of the period, only {{pctComplete}}% of the work has been completed.\n\n' +
      'Prepare the general journal adjusting entry required.',
    solution: {
      type: 'journal',
      explanationTemplate: '${{totalAmount}} × {{pctComplete}}% = ${{earned}} earned; ${{unearned}} must be deferred.',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Service Income',   no: '400', amount: vars.unearned },
          credit: { account: 'Unearned Income',  no: '215', amount: vars.unearned },
          narration: `Deferring income not yet earned ($${vars.unearned.toLocaleString()})`,
        },
      ]),
    },
  },

  // ── Q2b: Prepaid expense adjustment — DYNAMIC ─────────────────────────────
  {
    id: 'acc-t4-q2b',
    name: 'Prepaid expense adjustment',
    topic: TOPIC,
    subtopic: 'Prepaid expenses',
    difficulty: 'medium',
    computeFn: (params) => {
      const { totalRent, totalMonths, remainingMonths } = params
      const monthlyRate  = totalRent / totalMonths
      const unexpired    = Math.round(monthlyRate * remainingMonths)
      const expiredExtra = totalRent - unexpired   // extra to move back to prepaid
      return { vars: { monthlyRate: Math.round(monthlyRate), unexpired, expiredExtra }, branch: null }
    },
    params: {
      totalRent:       { min: 3000, max: 18000, step: 1000 },
      totalMonths:     { _pick: [6, 9, 12] },
      remainingMonths: { _pick: [2, 3, 4, 5, 6] },
    },
    mode: 'written',
    question:
      'A business paid ${{totalRent}} representing {{totalMonths}} months\' rent paid in advance, ' +
      'but it was recorded as Rent Expense. At the end of the current period, {{remainingMonths}} months\' rent remains unexpired.\n\n' +
      'Prepare the general journal adjusting entry required.',
    solution: {
      type: 'journal',
      explanationTemplate:
        '${{totalRent}} ÷ {{totalMonths}} months = ${{monthlyRate}}/month. ' +
        '${{monthlyRate}} × {{remainingMonths}} months unexpired = ${{unexpired}} to reinstate as Prepaid.',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Prepaid Rent', no: '115', amount: vars.unexpired },
          credit: { account: 'Rent Expense', no: '505', amount: vars.unexpired },
          narration: `Adjusting for unexpired rent ($${vars.unexpired.toLocaleString()})`,
        },
      ]),
    },
  },

  // ── Q2d: Accrued wages — DYNAMIC ──────────────────────────────────────────
  {
    id: 'acc-t4-q2d',
    name: 'Accrued wages journal entry',
    topic: TOPIC,
    subtopic: 'Accrued expenses',
    difficulty: 'easy',
    computeFn: (params) => {
      const { staff, wageEach } = params
      const totalWages = staff * wageEach
      return { vars: { totalWages }, branch: null }
    },
    params: {
      staff:    { min: 2, max: 5          },
      wageEach: { min: 300, max: 900, step: 50 },
    },
    mode: 'written',
    question:
      'At the end of the period, {{staff}} staff worked an extra shift and are owed ${{wageEach}} each in wages.\n\n' +
      'Prepare the general journal adjusting entry required.',
    solution: {
      type: 'journal',
      explanationTemplate: '{{staff}} staff × ${{wageEach}} = ${{totalWages}}',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Wages Expense', no: '515', amount: vars.totalWages },
          credit: { account: 'Wages Payable', no: '205', amount: vars.totalWages },
          narration: `Accruing wages owed to ${vars.staff} staff`,
        },
      ]),
    },
  },

  // ── Q2e: Accrued interest — DYNAMIC ───────────────────────────────────────
  {
    id: 'acc-t4-q2e',
    name: 'Accrued interest expense journal entry',
    topic: TOPIC,
    subtopic: 'Accrued expenses',
    difficulty: 'easy',
    computeFn: (params) => {
      const { loanAmount, ratePct } = params
      const monthlyInterest = Math.round(loanAmount * ratePct / 100 / 12)
      return { vars: { monthlyInterest }, branch: null }
    },
    params: {
      loanAmount: { min: 20000, max: 200000, step: 5000 },
      ratePct:    { min: 4, max: 18, step: 2 },
    },
    mode: 'written',
    question:
      'A business has a loan of ${{loanAmount}} which attracts interest at {{ratePct}}% per annum. ' +
      'One month\'s interest is owing at the end of the period.\n\n' +
      'Prepare the general journal adjusting entry required.',
    solution: {
      type: 'journal',
      explanationTemplate: '${{loanAmount}} × {{ratePct}}% ÷ 12 months = ${{monthlyInterest}}',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Interest Expense', no: '520', amount: vars.monthlyInterest },
          credit: { account: 'Interest Payable', no: '210', amount: vars.monthlyInterest },
          narration: `Accruing one month's interest on loan`,
        },
      ]),
    },
  },

  // ── Q3b: Depreciation — straight-line — DYNAMIC ───────────────────────────
  {
    id: 'acc-t4-q3b',
    name: 'Straight-line depreciation adjustment',
    topic: TOPIC,
    subtopic: 'Depreciation',
    difficulty: 'medium',
    computeFn: (params) => {
      const { cost, residual, life, monthsUsed } = params
      const annualDep  = (cost - residual) / life
      const periodDep  = Math.round(annualDep * monthsUsed / 12)
      return { vars: { annualDep: Math.round(annualDep), periodDep }, branch: null }
    },
    params: {
      cost:       { min: 5000,  max: 50000, step: 500  },
      residual:   { min: 500,   max: 5000,  step: 500  },
      life:       { _pick: [3, 4, 5, 6, 8, 10]         },
      monthsUsed: { _pick: [3, 6, 9, 12]               },
    },
    mode: 'written',
    question:
      'Equipment was purchased for ${{cost}}. It has an expected useful life of {{life}} years ' +
      'and an anticipated residual value of ${{residual}}.\n\n' +
      'Prepare the depreciation adjustment for a {{monthsUsed}}-month period using the straight-line method.',
    solution: {
      type: 'journal',
      explanationTemplate:
        'Annual depreciation: (${{cost}} − ${{residual}}) ÷ {{life}} years = ${{annualDep}}/year\n' +
        'Period depreciation: ${{annualDep}} × {{monthsUsed}}/12 = ${{periodDep}}',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Depreciation Expense',            no: '520', amount: vars.periodDep },
          credit: { account: 'Accumulated Depreciation – Equipment', no: '156', amount: vars.periodDep },
          narration: `Recording depreciation for the period`,
        },
      ]),
    },
  },

  // ── Q3c: Supplies consumed — DYNAMIC ──────────────────────────────────────
  {
    id: 'acc-t4-q3c',
    name: 'Supplies consumed adjustment',
    topic: TOPIC,
    subtopic: 'Supplies / prepaid assets',
    difficulty: 'easy',
    computeFn: (params) => {
      const { opening, purchase1, purchase2, purchase3, closing } = params
      const totalAvailable = opening + purchase1 + purchase2 + purchase3
      const consumed       = totalAvailable - closing
      return { vars: { totalAvailable, consumed }, branch: null }
    },
    params: {
      opening:   { min: 200, max: 1500, step: 50 },
      purchase1: { min: 100, max: 600,  step: 50 },
      purchase2: { min: 100, max: 600,  step: 50 },
      purchase3: { min: 100, max: 600,  step: 50 },
      closing:   { min: 100, max: 800,  step: 50 },
    },
    mode: 'written',
    question:
      'A business had supplies worth ${{opening}} at the start of the year. ' +
      'During the year, further purchases were made of ${{purchase1}}, ${{purchase2}}, and ${{purchase3}}. ' +
      'On the last day of the period, a count of supplies on hand totalled ${{closing}}.\n\n' +
      'Record the balance day adjustment for supplies consumed.',
    solution: {
      type: 'journal',
      explanationTemplate:
        'Total available: ${{opening}} + ${{purchase1}} + ${{purchase2}} + ${{purchase3}} = ${{totalAvailable}}\n' +
        'Consumed: ${{totalAvailable}} − ${{closing}} = ${{consumed}}',
      entriesTemplate: (vars) => ([
        {
          date: 'Balance day',
          debit:  { account: 'Supplies Expense',   no: '505', amount: vars.consumed },
          credit: { account: 'Supplies on Hand',   no: '110', amount: vars.consumed },
          narration: `Adjusting for supplies consumed during period`,
        },
      ]),
    },
  },

  // ── Q5: Temporary vs permanent accounts ──────────────────────────────────
  {
    id: 'acc-t4-q5',
    name: 'Identify temporary and permanent accounts',
    topic: TOPIC,
    subtopic: 'Closing entries',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'At the end of an accounting period, temporary accounts are closed so their balances reset, ' +
      'while permanent account balances carry forward.\n\n' +
      'From a trial balance containing: Cash, Accounts Receivable, Supplies on Hand, Prepaid Rent, ' +
      'Land, Vehicles, Accumulated Depreciation, Accounts Payable, Accrued Wages, Bank Loan, ' +
      'Capital, Drawings, Service Revenue, Rent Expense, Supplies Expense, Utilities Expense, ' +
      'Wages Expense, Depreciation Expense — identify the (i) temporary and (ii) permanent accounts.',
    solution:
      '(i) Temporary accounts (closed at period end): Service Revenue, Rent Expense, Supplies Expense, Utilities Expense, Wages Expense, Depreciation Expense, Drawings\n\n' +
      '(ii) Permanent accounts (carry forward): Cash, Accounts Receivable, Supplies on Hand, Prepaid Rent, Land, Vehicles, Accumulated Depreciation, Accounts Payable, Accrued Wages, Bank Loan, Capital\n\n' +
      'Rule: Income, expense, and drawings accounts are temporary. Asset, liability, and capital accounts are permanent.',
  },
]