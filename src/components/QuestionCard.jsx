/**
 * components/QuestionCard.jsx
 */
import React, { useState, useEffect, useRef } from 'react'
import NoteModal from './NoteModal'
import FinancialTable from './FinancialTable'

const DIFF = {
  easy:   { bg: 'var(--success-dim)',  text: 'var(--success)'  },
  medium: { bg: 'var(--warning-dim)',  text: 'var(--warning)'  },
  hard:   { bg: 'var(--danger-dim)',   text: 'var(--danger)'   },
}

function useScopedTypeset(ref, deps) {
  useEffect(() => {
    if (!ref.current) return
    const id = setTimeout(() => {
      if (ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).catch(() => {})
      }
    }, 50)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function EyeIcon({ crossed }) {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 6s2-4 5-4 5 4 5 4-2 4-5 4-5-4-5-4z"/>
      <circle cx="6" cy="6" r="1.5"/>
      {crossed && <line x1="1" y1="11" x2="11" y2="1" strokeWidth="1.5"/>}
    </svg>
  )
}

function LinesIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="1" y1="3" x2="11" y2="3"/>
      <line x1="1" y1="6" x2="8"  y2="6"/>
      <line x1="1" y1="9" x2="10" y2="9"/>
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 2h10v8l-3 2H2V2z"/>
      <line x1="4" y1="5"   x2="10" y2="5"/>
      <line x1="4" y1="7.5" x2="8"  y2="7.5"/>
    </svg>
  )
}

function QuestionText({ text, mode }) {
  if (mode === 'written') {
    return (
      <div className="q-text q-text-written">
        {text.split('\n').map((line, i) => (
          line.trim() === '' ? <br key={i}/> :
          <p key={i}>{line}</p>
        ))}
      </div>
    )
  }
  return (
    <div
      className="q-text"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

function SolutionContent({ solution, mode }) {
  if (mode === 'written') {
    if (typeof solution === 'string') {
      return (
        <div className="reveal-content written-answer">
          {solution.split('\n').map((line, i) => (
            line.trim() === '' ? <br key={i}/> : <p key={i}>{line}</p>
          ))}
        </div>
      )
    }
    return (
      <div className="reveal-content written-answer">
        {solution.explanation && (
          <p className="ft-explanation">{solution.explanation}</p>
        )}
        <FinancialTable solution={solution} />
      </div>
    )
  }
  return (
    <div
      className="reveal-content"
      dangerouslySetInnerHTML={{ __html: solution }}
    />
  )
}

export default function QuestionCard({ question, index, noteText, onNoteSave }) {
  const [showAnswer,  setShowAnswer]  = useState(false)
  const [showWorking, setShowWorking] = useState(false)
  const [noteOpen,    setNoteOpen]    = useState(false)

  const cardRef = useRef(null)  

  useScopedTypeset(cardRef, [question.question, showAnswer, showWorking])  // ← add hook

  const { meta } = question
  const mode       = meta.mode || 'math'
  const diff       = DIFF[meta.difficulty] || DIFF.medium
  const hasNote    = noteText && noteText.trim().length > 0
  const hasWorking = !!question.workingOut
  const questionId = `${meta.subtopic || meta.topic}::${index}`

  return (
    <>
      <div className="q-card" ref={cardRef}>
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
              className={'note-btn' + (hasNote ? ' has-note' : '')}
              onClick={() => setNoteOpen(true)}
              title={hasNote ? 'View / edit note' : 'Add a note'}
            >
              <NoteIcon />
              {hasNote && <span className="note-dot" />}
            </button>
          </div>
        </div>

        <div className="q-card-body">
          <QuestionText text={question.question} mode={mode} />

          <div className="q-actions">
            <button
              className={'btn-reveal' + (showAnswer ? ' active' : '')}
              onClick={() => setShowAnswer(s => !s)}
            >
              <EyeIcon crossed={showAnswer} />
              <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
            </button>

            {hasWorking && (
              <button
                className={'btn-reveal working' + (showWorking ? ' active' : '')}
                onClick={() => setShowWorking(s => !s)}
              >
                <LinesIcon />
                <span>{showWorking ? 'Hide Working Out' : 'Show Working Out'}</span>
              </button>
            )}
          </div>

          {showAnswer && (
            <div className="reveal-block answer-block">
              <div className="reveal-label">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1,6 4,9 11,2"/>
                </svg>
                Answer
              </div>
              <SolutionContent solution={question.solution} mode={mode} />
            </div>
          )}

          {showWorking && hasWorking && (
            <div className="reveal-block working-block">
              <div className="reveal-label">
                <LinesIcon />
                Working Out
              </div>
              <SolutionContent solution={question.workingOut} mode={mode} />
            </div>
          )}
        </div>
      </div>

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