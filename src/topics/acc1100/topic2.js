/**
 * topics/acc1100/topic2.js
 * ACC1100 – Topic 2: The recording process
 *
 * Dynamic templates use params + compute to randomise amounts.
 * Journal entry questions pick from a pool of possible transactions.
 */

import { pick, randInt, shuffle } from './utils'

export const TOPIC = 'Topic 2 – The recording process'

// ── Journal entry transaction pool ────────────────────────────────────────────
// Each transaction factory takes params and returns a journal entry object

const transactionPool = [
  (p) => ({
    label: `${p.ownerName} contributed $${p.cashAmount.toLocaleString()} cash to start the business`,
    date: 'Jan 1',
    debit:  { account: 'Cash',    no: '100', amount: p.cashAmount },
    credit: { account: 'Capital', no: '300', amount: p.cashAmount },
    narration: `Cash contributed by owner to commence business`,
  }),
  (p) => ({
    label: `${p.ownerName} contributed a computer worth $${p.computerValue.toLocaleString()} to the business`,
    date: 'Jan 1',
    debit:  { account: 'Computer', no: '150', amount: p.computerValue },
    credit: { account: 'Capital',  no: '300', amount: p.computerValue },
    narration: `Computer contributed by owner`,
  }),
  (p) => ({
    label: `Paid $${p.adAmount.toLocaleString()} cash for advertising`,
    date: 'Jan 2',
    debit:  { account: 'Advertising Expense', no: '500', amount: p.adAmount },
    credit: { account: 'Cash',                no: '100', amount: p.adAmount },
    narration: `Paid for advertising`,
  }),
  (p) => ({
    label: `Purchased office furniture worth $${p.furnitureValue.toLocaleString()} on credit`,
    date: 'Jan 3',
    debit:  { account: 'Office Furniture',  no: '155', amount: p.furnitureValue },
    credit: { account: 'Accounts Payable',  no: '200', amount: p.furnitureValue },
    narration: `Purchased office furniture on credit`,
  }),
  (p) => ({
    label: `Earned $${p.serviceAmount.toLocaleString()} in consulting fees on credit`,
    date: 'Jan 4',
    debit:  { account: 'Accounts Receivable',        no: '105', amount: p.serviceAmount },
    credit: { account: 'Consultancy Services Income', no: '400', amount: p.serviceAmount },
    narration: `Earned consultancy income on credit`,
  }),
  (p) => ({
    label: `Received $${p.cashService.toLocaleString()} cash for services provided`,
    date: 'Jan 5',
    debit:  { account: 'Cash',           no: '100', amount: p.cashService },
    credit: { account: 'Service Income', no: '400', amount: p.cashService },
    narration: `Cash received for services provided`,
  }),
  (p) => ({
    label: `Paid $${p.rentAmount.toLocaleString()} rent for the month`,
    date: 'Jan 6',
    debit:  { account: 'Rent Expense', no: '510', amount: p.rentAmount },
    credit: { account: 'Cash',         no: '100', amount: p.rentAmount },
    narration: `Paid monthly rent`,
  }),
]

const ownerNames = ['Blake', 'Jordan', 'Riley', 'Morgan', 'Casey', 'Taylor']

// ── Compute functions ─────────────────────────────────────────────────────────

function journalEntries(params) {
  const selected = shuffle(transactionPool).slice(0, 4)
  const entries  = selected.map(fn => fn(params))
  return {
    vars: {},
    branch: null,
    entriesData: entries,
  }
}

function ledgerFromJournal(params) {
  const selected = shuffle(transactionPool).slice(0, 3)
  const entries  = selected.map(fn => fn(params))
  return {
    vars: {},
    branch: null,
    entriesData: entries,
  }
}

// ── Templates ─────────────────────────────────────────────────────────────────

export const templates = [
  // ── Q1: Financial statements overview ─────────────────────────────────────
  {
    id: 'acc-t2-q1',
    name: 'Do we only need income statement and balance sheet?',
    topic: TOPIC,
    subtopic: 'Financial statements',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      '"General purpose financial statements only really need to include two reports – the income statement and the balance sheet – since these two reports capture all of the elements of accounting." Comment on this statement.',
    solution:
      'Part of the statement is valid — the income statement and balance sheet do capture all elements of accounting: financial performance and financial position respectively.\n\n' +
      'However, the other two statements provide additional useful information:\n' +
      '• The statement of changes in equity shows how the owner\'s wealth has been affected during the period.\n' +
      '• The statement of cash flows shows where cash has been received and spent — critical since cash is one of the most important assets.',
  },

  // ── Q2: Which financial statements are affected ────────────────────────────
  {
    id: 'acc-t2-q2',
    name: 'Which financial statements are affected?',
    topic: TOPIC,
    subtopic: 'Financial statements',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Consider which of the financial statements would be affected by the following transactions for an interior design business. For each transaction, identify which statements are affected.',
    solution: {
      type: 'statements',
      rows: [
        {
          transaction: 'Owner contributed $5,000 cash and a computer worth $2,000 to start the business',
          affected: ['Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Paid office rent of $2,200 for the month',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Paid $400 to advertise the business for the month',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Purchased a vehicle worth $20,000, paying $1,000 cash, remainder on loan',
          affected: ['Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Provided consulting services for $3,000 cash',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Took cash drawings of $800',
          affected: ['Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
        {
          transaction: 'Earned $4,000 in consulting fees on credit',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet'],
        },
        {
          transaction: 'Received electricity account for $250',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet'],
        },
        {
          transaction: 'Paid assistant wages of $1,900 cash',
          affected: ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows'],
        },
      ],
    },
  },

  // ── Q3: Dynamic journal entries → post to general ledger ──────────────────
  {
    id: 'acc-t2-q3',
    name: 'Record journal entries and post to general ledger',
    topic: TOPIC,
    subtopic: 'General journal and ledger',
    difficulty: 'hard',
    computeFn: journalEntries,
    params: {
      ownerName:     { _pick: ownerNames },
      cashAmount:    { min: 1500, max: 4000, step: 500 },
      computerValue: { min: 800,  max: 2000, step: 100 },
      adAmount:      { min: 100,  max: 500,  step: 50  },
      furnitureValue:{ min: 2000, max: 8000, step: 500 },
      serviceAmount: { min: 200,  max: 800,  step: 50  },
      cashService:   { min: 500,  max: 2000, step: 100 },
      rentAmount:    { min: 600,  max: 2000, step: 100 },
    },
    mode: 'written',
    question: null, // generated dynamically in renderWrittenTemplate
    solution: null, // generated dynamically
  },

  // ── Q4: Correct an incorrect trial balance ────────────────────────────────
  {
    id: 'acc-t2-q4',
    name: 'Correct an erroneous trial balance',
    topic: TOPIC,
    subtopic: 'Trial balance',
    difficulty: 'hard',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'The following trial balance has been prepared incorrectly. Identify the errors and prepare a corrected unadjusted trial balance.\n\n' +
      'Matty\'s Fitness HQ — Unadjusted Trial Balance as at 31 Dec 2025\n' +
      'Cash $1,500 Dr | Prepaid Rent $600 Dr | Drawings $59,000 Cr (ERROR) | Capital $131,000 Dr (ERROR) | Gym Equipment $345,000 Dr | Accounts Payable $2,300 Cr | Advertising Expense $4,400 Dr | Gym Membership Revenue $177,000 Cr | Wages Expense $91,800 Dr | Accumulated Depreciation $65,000 Dr (ERROR) | Accrued Advertising $2,000 Dr (ERROR) | Rent Expense $18,000 Cr (ERROR) | Unearned Gym Membership $3,000 Cr | Loan $140,000 Cr',
    solution: {
      type: 'trial',
      title: "Matty's Fitness HQ — Corrected Unadjusted Trial Balance",
      date: 'as at 31 December 2025',
      rows: [
        { no: '',    account: 'Cash',                              debit: 1500,   credit: null   },
        { no: '',    account: 'Prepaid Rent',                      debit: 600,    credit: null   },
        { no: '',    account: 'Drawings',                          debit: 59000,  credit: null   },
        { no: '',    account: 'Capital',                           debit: null,   credit: 131000 },
        { no: '',    account: 'Gym Equipment',                     debit: 345000, credit: null   },
        { no: '',    account: 'Accounts Payable',                  debit: null,   credit: 2300   },
        { no: '',    account: 'Advertising Expense',               debit: 4400,   credit: null   },
        { no: '',    account: 'Gym Membership Revenue',            debit: null,   credit: 177000 },
        { no: '',    account: 'Wages Expense',                     debit: 91800,  credit: null   },
        { no: '',    account: 'Accumulated Depreciation – Equipment', debit: null, credit: 65000 },
        { no: '',    account: 'Accrued Advertising',               debit: null,   credit: 2000   },
        { no: '',    account: 'Rent Expense',                      debit: 18000,  credit: null   },
        { no: '',    account: 'Prepaid (Unearned) Gym Membership', debit: null,   credit: 3000   },
        { no: '',    account: 'Loan',                              debit: null,   credit: 140000 },
      ],
    },
  },
]