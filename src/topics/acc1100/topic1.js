/**
 * topics/acc1100/topic1.js
 * ACC1100 – Topic 1: Accounting…what is it?
 *
 * Question modes:
 *   mode: 'written'  → plain text Q&A, no LaTeX, may use financial tables
 *   mode: 'math'     → LaTeX rendered (not used in this topic)
 *
 * solution shapes:
 *   string           → plain text answer
 *   { type, ... }    → financial table (see FinancialTable.jsx)
 */

export const TOPIC = 'Topic 1 – Accounting: What is it?'

export const templates = [
  // ── Q1: Decision making across business lifecycle ─────────────────────────
  {
    id: 'acc-t1-q1',
    name: 'Accounting information and decision making',
    topic: TOPIC,
    subtopic: 'Role of accounting information',
    difficulty: 'medium',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Using examples, explain how accounting information would be used for decision making:\n' +
      '(i) before a business has commenced trading;\n' +
      '(ii) during its operating lifetime; and\n' +
      '(iii) as it is in the process of closing down.',
    solution:
      '(i) Prior to commencing trading, business plans should be prepared which involve projections of profits, assets needed for start-up, and liabilities to fund it. These forecasts are essential to show the business idea is viable and in some cases to secure financing.\n\n' +
      '(ii) During an operating lifetime, accounting information is used continuously for both internal decision making and by external users — covering performance, cash flow management, and compliance.\n\n' +
      '(iii) When a business closes down, accounting information determines proceeds of asset sales and how much can be repaid to creditors. It is critical when a business enters administration to assess whether it can continue operating.',
  },

  // ── Q2a: Management vs financial accounting — frequency ───────────────────
  {
    id: 'acc-t1-q2a',
    name: 'Management vs financial accounting — frequency',
    topic: TOPIC,
    subtopic: 'Management vs financial accounting',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'One distinguishing feature between management accounting and financial accounting is the frequency with which reports are prepared. Explain this distinction and justify why it is the case.',
    solution:
      'Management accounting information is prepared as often as necessary because managers need information at any time to respond to business decisions — for example, whether to run a sale when a competitor opens, or whether to reduce opening hours when sales are low.\n\n' +
      'Financial accounting information is prepared and released 6 and 12 monthly to the public. It is costly to prepare and releasing it too frequently would reveal confidential business information.',
  },

  // ── Q2b: Management vs financial accounting — detail ─────────────────────
  {
    id: 'acc-t1-q2b',
    name: 'Management vs financial accounting — level of detail',
    topic: TOPIC,
    subtopic: 'Management vs financial accounting',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'One distinguishing feature between management accounting and financial accounting is the level of detail provided. Explain this distinction and justify why it is the case.',
    solution:
      'Management accounting information is very detailed, as managers need specifics about particular items to make strategic decisions — for example, sales of individual products to decide whether to discontinue a line, or costing information to determine whether an item can be discounted.\n\n' +
      'Financial accounting information is highly summarised because it is made publicly available, and businesses are not required to disclose confidential operational detail.',
  },

  // ── Q3: Internal vs external users ───────────────────────────────────────
  {
    id: 'acc-t1-q3',
    name: 'Internal vs external users — casual employee',
    topic: TOPIC,
    subtopic: 'Users of accounting information',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Broadly speaking, internal users are within an entity (in a privileged position) and external users are outside an entity (with no privileges).\n\n' +
      'If Emma works on a casual basis in the bakery department of her local supermarket, what kind of user would she be classified as? Explain.',
    solution:
      'Despite working within the business, Emma would be classified as an external user. Internal users are those in a privileged position who can access confidential accounting information.\n\n' +
      'As a casual employee in a bakery department, Emma would not have access to financial records or management reports. She would need to wait for the public release of information just like any other external party.',
  },

  // ── Q4: Assets, liabilities, income, expenses — examples ─────────────────
  {
    id: 'acc-t1-q4',
    name: 'Accounting elements — supermarket and consulting firm',
    topic: TOPIC,
    subtopic: 'Accounting elements',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'Provide at least three examples of assets, liabilities, income, and expenses for:\n' +
      '(i) a supermarket business, and\n' +
      '(ii) a consulting firm.',
    solution: {
      type: 'plain',
      explanation: '',
      tables: [
        {
          label: '(i) Supermarket',
          columns: ['Assets', 'Liabilities', 'Income', 'Expenses'],
          rows: [
            ['Cash', 'Accounts Payable', 'Sales Revenue', 'Wages'],
            ['Stock / Inventory', 'Wages Payable', 'Delivery Fees', 'Rent'],
            ['Prepaid Rent', 'Loans', 'Interest on Investments', 'Utilities'],
            ['Shelving / Fixtures', '', '', 'Stock Losses'],
            ['Delivery Vans', '', '', ''],
          ],
        },
        {
          label: '(ii) Consulting firm',
          columns: ['Assets', 'Liabilities', 'Income', 'Expenses'],
          rows: [
            ['Cash', 'Wages Payable', 'Service Fees', 'Wages'],
            ['Computers', 'Accounts Payable', 'Commissions', 'Advertising'],
            ['Furniture', 'Loans', 'Interest on Investments', 'Occupancy'],
            ['Premises', '', '', 'Utilities'],
          ],
        },
      ],
    },
  },

  // ── Q5: Employee as asset ─────────────────────────────────────────────────
  {
    id: 'acc-t1-q5',
    name: 'Why an employee is not an asset',
    topic: TOPIC,
    subtopic: 'Definition of an asset',
    difficulty: 'easy',
    compute: null,
    params: {},
    mode: 'written',
    question:
      'A hair salon owned by Adam has a well-known stylist working there part time. Adam argues that he should record the stylist as an asset, because his business success is directly attributable to the stylist\'s services.\n\nExplain why the employee is not considered an asset to the business.',
    solution:
      'One key aspect of the definition of an asset is control — the business must control the resource.\n\n' +
      'An employee is not controllable because they have the ability to resign at any time, even if that involves a financial penalty. Despite the stylist being a major contributor to clientele and revenue, Adam\'s hair salon cannot recognise the stylist as an asset in its accounting records because it does not have sufficient control over the stylist\'s future services.',
  },
]