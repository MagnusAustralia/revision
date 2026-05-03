/**
 * topics/acc1100/topic6.js
 * ACC1100 – Topic 6: The statement of cash flows
 */

export const TOPIC = 'Topic 6 – Statement of cash flows'

export const templates = [
  // ── Q1: Income statement vs cash flow statement ───────────────────────────
  {
    id: 'acc-t6-q1',
    name: 'Accrual vs cash: income statement vs cash flow statement',
    topic: TOPIC,
    subtopic: 'Accrual vs cash accounting',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'The income statement uses accrual accounting; the statement of cash flows uses cash movements. ' +
      'Explain the accounting treatment of the following items and when they appear in each statement:\n\n' +
      '(a) Credit sales and cash received from accounts receivable\n' +
      '(b) Cost of sales and cash paid to suppliers\n' +
      '(c) Prepaid rent and rent expense\n' +
      '(d) Accrued wages and wages expense\n' +
      '(e) Purchase of a non-current asset and its depreciation\n' +
      '(f) A bank loan and associated repayments including interest\n' +
      '(g) Owner\'s drawings or additional capital contributions',
    solution:
      '(a) Credit sales appear in the income statement when earned, regardless of cash received. The cash flow statement only records cash actually received from customers, which may relate to this or a prior period.\n\n' +
      '(b) Cost of sales appears in the income statement as it determines gross profit. The cash flow statement records cash paid to suppliers for goods purchased, not necessarily the goods that were sold.\n\n' +
      '(c) Only the rent expense incurred in the period appears in the income statement. The cash flow statement includes all cash paid for rent, even if paid for several periods in advance.\n\n' +
      '(d) Wages are an expense in the income statement when incurred, whether paid or not. The cash flow statement records cash actually paid, which may include wages from an earlier accrual period.\n\n' +
      '(e) Purchasing a non-current asset is not an expense but involves a cash outflow under investing activities. Depreciation is an income statement expense — it is non-cash and does not appear in the cash flow statement.\n\n' +
      '(f) Borrowing from a bank is a cash inflow under financing activities. Loan repayments of principal are cash outflows under financing. Neither affects the income statement. Interest expense appears in the income statement.\n\n' +
      '(g) Owner\'s drawings and capital contributions never appear in the income statement (excluded by definition). Since they often involve cash, they appear under financing activities in the cash flow statement.',
  },

  // ── Q2: Cash movements that don't affect profit ────────────────────────────
  {
    id: 'acc-t6-q2',
    name: 'Cash movements that do not affect profit',
    topic: TOPIC,
    subtopic: 'Cash vs profit',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Provide three movements of cash that alter the cash balance (and appear in the cash flow statement) but do not contribute to profit in the same period.',
    solution:
      'Any three of the following (there are many valid answers):\n\n' +
      '1. Payment to suppliers for goods not yet sold (inventory purchased on cash)\n' +
      '2. Payments for expenses in advance (prepaid rent, insurance)\n' +
      '3. Payment of accrued expenses from a prior period\n' +
      '4. Purchase of non-current assets (investing activity)\n' +
      '5. Loan repayments (financing activity)\n' +
      '6. Owner drawings or dividend payments (financing activity)\n\n' +
      'These all reduce cash without reducing profit in the same period because they are either balance sheet movements or relate to prior-period accruals.',
  },

  // ── Q3: Links between cash flow statement and other statements ─────────────
  {
    id: 'acc-t6-q3',
    name: 'Links between cash flow statement and other financial statements',
    topic: TOPIC,
    subtopic: 'Statement of cash flows — links',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Identify a link between the statement of cash flows and each of the other three financial statements.',
    solution:
      'Balance Sheet: The cash flow statement explains the movement in the cash balance from beginning to end of period — the closing cash balance links directly to the cash balance on the balance sheet.\n\n' +
      'Statement of Changes in Equity: Owner drawings and additional capital contributions appear in the financing section of the cash flow statement and also affect the statement of changes in equity.\n\n' +
      'Income Statement: Cash income earned and cash expenses incurred will appear in the cash flow statement under operating activities. Where income/expenses are accrual-based, there may be differences between the amounts in the two statements.',
  },

  // ── Q5: Cash flow warning signals ────────────────────────────────────────
  {
    id: 'acc-t6-q5',
    name: 'Cash flow warning signals',
    topic: TOPIC,
    subtopic: 'Cash flow analysis',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Outline some cash flow warning signals that a business owner or analyst should look out for.',
    solution:
      'Key cash flow warning signals include:\n\n' +
      '• Consistently negative operating cash flows despite reported profits (suggesting profit is not converting to cash)\n' +
      '• Large and growing accounts receivable balance (customers not paying)\n' +
      '• Heavy reliance on financing activities to fund operations\n' +
      '• Declining cash reserves over multiple periods\n' +
      '• Inability to pay suppliers on time (growing accounts payable)\n' +
      '• Profit significantly higher than operating cash flow each period (possible aggressive accrual accounting)\n' +
      '• Large investing outflows without corresponding revenue growth',
  },
]