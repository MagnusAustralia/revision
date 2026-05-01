/**
 * components/QuestionCard.jsx
 *
 * Renders a single generated question with:
 *   - The question text (LaTeX rendered)
 *   - "Show Answer" button  → reveals the final answer line
 *   - "Show Working Out" button → reveals the full step-by-step solution (pre-rendered LaTeX)
 *   - Note icon button → opens NoteModal for this question
 *   - Note indicator dot when a note exists
 */

import React, { useState } from 'react'
import { MathJax } from 'better-react-mathjax'
import NoteModal from './NoteModal'

const DIFFICULTY_COLOURS = {
  easy:   { bg: 'var(--success-dim)',  text: 'var(--success)' },
  medium: { bg: 'var(--warning-dim)',  text: 'var(--warning)' },
  hard:   { bg: 'var(--danger-dim)',   text: 'var(--danger)'  },
}

export default function QuestionCard({ question, index, noteText, onNoteSave }) {
  const [showAnswer,  setShowAnswer]  = useState(false)
  const [showWorking, setShowWorking] = useState(false)
  const [noteOpen,    setNoteOpen]    = useState(false)

  const { meta } = question
  const diff = DIFFICULTY_COLOURS[meta.difficulty] || DIFFICULTY_COLOURS.medium
  const hasNote = noteText && noteText.trim().length > 0

  // questionId is used as the localStorage key
  const questionId = `${meta.subtopic || meta.topic}::${index}`

  return (
    <>
      <div className="q-card">
        {/* ── Header ── */}
        <div className="q-card-header">
          <div className="q-card-header-left">
            <span className="q-number">Q{index + 1}</span>
            <span className="q-subtopic">{meta.subtopic || meta.topic}</span>
          </div>
          <div className="q-card-header-right">
            <span className="q-diff-badge" style={{ background: diff.bg, color: diff.text }}>
              {meta.difficulty}
            </span>
            <button
              className={`note-btn${hasNote ? ' has-note' : ''}`}
              onClick={() => setNoteOpen(true)}
              title={hasNote ? 'View / edit note' : 'Add a note'}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 2h10v8l-3 2H2V2z"/>
                <line x1="4" y1="5" x2="10" y2="5"/>
                <line x1="4" y1="7.5" x2="8" y2="7.5"/>
              </svg>
              {hasNote && <span className="note-dot" />}
            </button>
          </div>
        </div>

        {/* ── Question Body ── */}
        <div className="q-card-body">
          <MathJax className="q-text">{question.question}</MathJax>

          {/* ── Action Buttons ── */}
          <div className="q-actions">
            <button
              className={`btn-reveal${showAnswer ? ' active' : ''}`}
              onClick={() => setShowAnswer(s => !s)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                {showAnswer
                  ? <><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z"/><circle cx="6" cy="6" r="1.5"/><line x1="1" y1="11" x2="11" y2="1" strokeWidth="1.5"/></>
                  : <><path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z"/><circle cx="6" cy="6" r="1.5"/></>
                }
              </svg>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>

            <button
              className={`btn-reveal working${showWorking ? ' active' : ''}`}
              onClick={() => setShowWorking(s => !s)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="1" y1="3" x2="11" y2="3"/>
                <line x1="1" y1="6" x2="8" y2="6"/>
                <line x1="1" y1="9" x2="10" y2="9"/>
              </svg>
              {showWorking ? 'Hide Working Out' : 'Show Working Out'}
            </button>
          </div>

          {/* ── Answer Reveal ── */}
          {showAnswer && (
            <div className="reveal-block answer-block">
              <div className="reveal-label">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1,6 4,9 11,2"/>
                </svg>
                Answer
              </div>
              <MathJax className="reveal-content">{question.solution}</MathJax>
            </div>
          )}

          {/* ── Working Out Reveal ── */}
          {showWorking && (
            <div className="reveal-block working-block">
              <div className="reveal-label">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="1" y1="3" x2="11" y2="3"/>
                  <line x1="1" y1="6" x2="8" y2="6"/>
                  <line x1="1" y1="9" x2="10" y2="9"/>
                </svg>
                Working Out
              </div>
              <MathJax className="reveal-content working-content">{question.solution}</MathJax>
            </div>
          )}
        </div>
      </div>

      {/* ── Note Modal ── */}
      {noteOpen && (
        <NoteModal
          questionId={questionId}
          questionText={question.question}
          note={noteText}
          onSave={(text) => onNoteSave(questionId, text)}
          onClose={() => setNoteOpen(false)}
        />
      )}
    </>
  )
}
