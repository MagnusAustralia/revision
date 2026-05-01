/**
 * components/AllNotesPanel.jsx
 *
 * Slide-in panel listing every saved question note.
 * Lets users read, edit (open modal), or delete notes.
 */

import React from 'react'
import { MathJax } from 'better-react-mathjax'

export default function AllNotesPanel({ allNotes, onEdit, onDelete, onClose }) {
  const entries = Object.entries(allNotes).filter(([, text]) => text.trim().length > 0)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="notes-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2h10v8l-3 2H2V2z"/><line x1="4" y1="5" x2="10" y2="5"/>
              <line x1="4" y1="7.5" x2="8" y2="7.5"/>
            </svg>
            All Notes ({entries.length})
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="notes-panel-body">
          {entries.length === 0 ? (
            <div className="empty-notes">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
                <path d="M6 4h20v22l-6 4H6V4z"/>
                <line x1="10" y1="11" x2="22" y2="11"/>
                <line x1="10" y1="16" x2="18" y2="16"/>
              </svg>
              <p>No notes yet. Open a question and click the note icon to add one.</p>
            </div>
          ) : (
            entries.map(([questionId, text]) => (
              <div className="note-entry" key={questionId}>
                <div className="note-entry-id">{questionId}</div>
                <div className="note-entry-text">{text}</div>
                <div className="note-entry-actions">
                  <button className="btn-pill sm" onClick={() => onEdit(questionId)}>Edit</button>
                  <button className="btn-pill sm danger" onClick={() => onDelete(questionId)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
