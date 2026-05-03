/**
 * components/FinancialTable.jsx
 *
 * Renders structured accounting answer tables.
 * Supports three types via the `type` prop:
 *   - 'journal'      → General Journal (Date | Details | No. | Dr | Cr)
 *   - 'ledger'       → General Ledger (T-account style)
 *   - 'trial'        → Trial Balance (No. | Account | Dr | Cr)
 *   - 'statements'   → Checkbox grid (which financial statements are affected)
 *   - 'plain'        → Simple key-value or paragraph answer
 */
 
import React from 'react'
 
// ── Formatters ────────────────────────────────────────────────────────────────
 
function fmt(n) {
  if (n === null || n === undefined || n === '') return ''
  if (typeof n === 'string') return n
  return n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
 
function fmtMoney(n) {
  if (n === null || n === undefined || n === '') return ''
  return '$' + Math.abs(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
 
// ── General Journal ───────────────────────────────────────────────────────────
 
/**
 * entries: [
 *   { date, debit: { account, no, amount }, credit: { account, no, amount }, narration }
 * ]
 */
export function JournalTable({ entries }) {
  return (
    <div className="ft-scroll">
      <table className="ft-table">
        <thead>
          <tr>
            <th className="ft-date">Date</th>
            <th className="ft-details">Details</th>
            <th className="ft-no">No.</th>
            <th className="ft-money">Debit ($)</th>
            <th className="ft-money">Credit ($)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <React.Fragment key={i}>
              {/* Debit line */}
              <tr>
                <td className="ft-date ft-cell">{entry.date || ''}</td>
                <td className="ft-details ft-cell ft-debit-account">{entry.debit.account}</td>
                <td className="ft-no ft-cell ft-muted">{entry.debit.no || ''}</td>
                <td className="ft-money ft-cell">{fmtMoney(entry.debit.amount)}</td>
                <td className="ft-money ft-cell"></td>
              </tr>
              {/* Credit line */}
              <tr>
                <td className="ft-date ft-cell"></td>
                <td className="ft-details ft-cell ft-credit-account">&nbsp;&nbsp;&nbsp;&nbsp;{entry.credit.account}</td>
                <td className="ft-no ft-cell ft-muted">{entry.credit.no || ''}</td>
                <td className="ft-money ft-cell"></td>
                <td className="ft-money ft-cell">{fmtMoney(entry.credit.amount)}</td>
              </tr>
              {/* Narration */}
              {entry.narration && (
                <tr className="ft-narration-row">
                  <td></td>
                  <td colSpan={4} className="ft-narration">({entry.narration})</td>
                </tr>
              )}
              {/* Spacer between entries */}
              {i < entries.length - 1 && (
                <tr className="ft-spacer"><td colSpan={5}></td></tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
 
// ── General Ledger (T-accounts) ───────────────────────────────────────────────
 
/**
 * accounts: [
 *   {
 *     name, no,
 *     debits:  [{ date, description, amount }],
 *     credits: [{ date, description, amount }],
 *     balance?: number   // optional closing balance
 *   }
 * ]
 */
export function LedgerTable({ accounts }) {
  return (
    <div className="ft-ledger-grid">
      {accounts.map((acct, i) => {
        const rows = Math.max(acct.debits.length, acct.credits.length, 1)
        return (
          <div key={i} className="ft-t-account">
            <div className="ft-t-header">
              <span className="ft-t-name">{acct.name}</span>
              {acct.no && <span className="ft-t-no">{acct.no}</span>}
            </div>
            <div className="ft-t-body">
              <table className="ft-t-table">
                <thead>
                  <tr>
                    <th colSpan={3} className="ft-t-side-hdr">Dr</th>
                    <th className="ft-t-divider"></th>
                    <th colSpan={3} className="ft-t-side-hdr">Cr</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rows }).map((_, r) => {
                    const dr = acct.debits[r]
                    const cr = acct.credits[r]
                    return (
                      <tr key={r}>
                        <td className="ft-t-date">{dr?.date || ''}</td>
                        <td className="ft-t-desc">{dr?.description || ''}</td>
                        <td className="ft-t-amt">{dr ? fmtMoney(dr.amount) : ''}</td>
                        <td className="ft-t-divider"></td>
                        <td className="ft-t-date">{cr?.date || ''}</td>
                        <td className="ft-t-desc">{cr?.description || ''}</td>
                        <td className="ft-t-amt">{cr ? fmtMoney(cr.amount) : ''}</td>
                      </tr>
                    )
                  })}
                  {acct.balance !== undefined && (
                    <tr className="ft-t-balance-row">
                      <td colSpan={3} className="ft-t-balance-label">Balance</td>
                      <td className="ft-t-divider"></td>
                      <td colSpan={3} className="ft-t-balance-amt">{fmtMoney(Math.abs(acct.balance))}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
 
// ── Trial Balance ─────────────────────────────────────────────────────────────
 
/**
 * rows: [{ no, account, debit, credit }]
 * title: string
 * date: string
 */
export function TrialBalanceTable({ title, date, rows }) {
  const totalDr = rows.reduce((s, r) => s + (r.debit  || 0), 0)
  const totalCr = rows.reduce((s, r) => s + (r.credit || 0), 0)
  return (
    <div className="ft-scroll">
      {title && <div className="ft-report-title">{title}</div>}
      {date  && <div className="ft-report-date">{date}</div>}
      <table className="ft-table">
        <thead>
          <tr>
            <th className="ft-no">No.</th>
            <th className="ft-details">Account</th>
            <th className="ft-money">Debit ($)</th>
            <th className="ft-money">Credit ($)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={row.isTotal ? 'ft-total-row' : ''}>
              <td className="ft-no ft-cell ft-muted">{row.no || ''}</td>
              <td className="ft-details ft-cell">{row.account}</td>
              <td className="ft-money ft-cell">{row.debit  ? fmtMoney(row.debit)  : ''}</td>
              <td className="ft-money ft-cell">{row.credit ? fmtMoney(row.credit) : ''}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="ft-total-row">
            <td></td>
            <td className="ft-cell ft-total-label">Total</td>
            <td className="ft-money ft-cell ft-total">{fmtMoney(totalDr)}</td>
            <td className="ft-money ft-cell ft-total">{fmtMoney(totalCr)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
 
// ── Statement Checkbox Grid ───────────────────────────────────────────────────
 
const STATEMENTS = ['Income Statement', 'Statement of Changes in Equity', 'Balance Sheet', 'Statement of Cash Flows']
 
/**
 * rows: [{ transaction: string, affected: string[] }]
 *   affected is a subset of STATEMENTS
 */
export function StatementsTable({ rows }) {
  return (
    <div className="ft-scroll">
      <table className="ft-table ft-statements-table">
        <thead>
          <tr>
            <th className="ft-stmt-tx">Transaction</th>
            {STATEMENTS.map(s => (
              <th key={s} className="ft-stmt-hdr">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="ft-stmt-tx ft-cell">{row.transaction}</td>
              {STATEMENTS.map(s => (
                <td key={s} className="ft-stmt-check ft-cell">
                  {row.affected.includes(s) ? (
                    <span className="ft-check-tick">✓</span>
                  ) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
 
// ── Calculation Table (numeric workings) ──────────────────────────────────────
 
/**
 * rows: [{ label, value, isBold, isTotal }]
 * title: string
 */
export function CalcTable({ title, rows }) {
  return (
    <div className="ft-scroll">
      {title && <div className="ft-calc-title">{title}</div>}
      <table className="ft-table ft-calc-table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={row.isTotal ? 'ft-total-row' : ''}>
              <td className={`ft-calc-label ft-cell${row.isBold ? ' ft-bold' : ''}`}>{row.label}</td>
              <td className={`ft-money ft-cell${row.isBold ? ' ft-bold' : ''}`}>
                {row.value !== '' && row.value !== null && row.value !== undefined ? fmtMoney(row.value) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
 
// ── Master renderer ───────────────────────────────────────────────────────────
 
/**
 * solution shape from ACC templates:
 * {
 *   type: 'journal' | 'ledger' | 'trial' | 'statements' | 'calc' | 'text',
 *   ...type-specific props
 * }
 */
export default function FinancialTable({ solution }) {
  if (!solution || typeof solution === 'string') return null
 
  switch (solution.type) {
    case 'journal':
      return <JournalTable entries={solution.entries} />
    case 'ledger':
      return <LedgerTable accounts={solution.accounts} />
    case 'trial':
      return <TrialBalanceTable title={solution.title} date={solution.date} rows={solution.rows} />
    case 'statements':
      return <StatementsTable rows={solution.rows} />
    case 'calc':
      return <CalcTable title={solution.title} rows={solution.rows} />
    default:
      return null
  }
}