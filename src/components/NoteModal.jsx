/**
 * components/NoteModal.jsx
 *
 * Pop-up modal for reading/editing a per-question note.
 * Saves to localStorage via the useNotes hook on every keystroke.
 */

import React, { useState, useEffect, useRef } from 'react'
import { MathJax } from 'better-react-mathjax'

export default function NoteModal({ questionId, questionText, note, onSave, onClose }) {
  const [text, setText] = useState(note || '')
  const textareaRef = useRef(null)

  useEffect(() => {
    // Focus textarea when modal opens
    if (textareaRef.current) textareaRef.current.focus()
  }, [])

  // Save on every keystroke
  const handleChange = (e) => {
    setText(e.target.value)
    onSave(e.target.value)
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2h10v8l-3 2H2V2z"/><line x1="4" y1="5" x2="10" y2="5"/>
              <line x1="4" y1="7.5" x2="8" y2="7.5"/>
            </svg>
            Note
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-question-ref">
          <div className="modal-question-label">Question</div>
          <MathJax className="modal-question-text">{questionText}</MathJax>
        </div>

        <div className="modal-body">
          <label className="modal-field-label">Your note</label>
          <textarea
            ref={textareaRef}
            className="modal-textarea"
            value={text}
            onChange={handleChange}
            placeholder="Write anything — strategy reminders, common mistakes, key formulas…"
            rows={8}
          />
          {text.trim().length === 0 && (
            <p className="modal-hint">Notes are saved automatically to your browser.</p>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-pill primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  )
}
