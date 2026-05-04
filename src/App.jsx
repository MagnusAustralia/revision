/**
 * App.jsx
 *
 * Root application component.
 * Layout: Sidebar (subject/topic selection) | Main panel (generate + view questions)
 */

import React, { useState, useMemo, useCallback } from 'react'
import { MathJax } from 'better-react-mathjax'
import TopicSidebar   from './components/TopicSidebar'
import QuestionCard   from './components/QuestionCard'
import AllNotesPanel  from './components/AllNotesPanel'
import { useNotes }   from './hooks/useNotes'
import { usePersistedState } from './hooks/usePersistedState'
import { subjects }   from './subjects/index'
import { renderTemplate } from './engine/templateEngine'
import { renderWrittenTemplate } from './engine/writtenTemplateEngine'

export default function App() {
  // ── Subject / topic selection ──────────────────────────────────────────────
  const [activeSubject, setActiveSubject] = usePersistedState('activeSubject', 'ENG1005')
  const [selected,      setSelected]      = usePersistedState('selected', {})

  const handleSubjectChange = (id) => {
    setActiveSubject(id)
    setSelected({})   // clear selection when switching subjects
  }

  const toggleSub = useCallback((name) => {
    setSelected(prev => ({ ...prev, [name]: !prev[name] }))
  }, [])

  const toggleTopic = useCallback((subNames, allOn) => {
    setSelected(prev => {
      const next = { ...prev }
      subNames.forEach(n => { next[n] = !allOn })
      return next
    })
  }, [])

  // ── Generation controls ────────────────────────────────────────────────────
  const [qCount,        setQCount]        = usePersistedState('qCount', 5)
  const [unlimited,     setUnlimited]     = usePersistedState('unlimited', false)
  const [questions,     setQuestions]     = usePersistedState('questions', [])

  const subject = subjects.find(s => s.id === activeSubject)

  // Flatten all templates for the active subject that match selected subtopics
  const applicableTemplates = useMemo(() => {
    if (!subject) return []
    const allTemplates = []

    subject.topics.forEach(t => {
      if (t.templates) {
        // ENG1005-style: flat templates array on topic
        t.templates.forEach(tmpl => {
          if (!tmpl.subtopic || selected[tmpl.subtopic]) allTemplates.push(tmpl)
        })
      } else if (t.subtopics) {
        // Scaffold-style: subtopics array with their own templates
        t.subtopics.forEach(sub => {
          if (selected[sub.name]) {
            (sub.templates || []).forEach(tmpl => allTemplates.push(tmpl))
          }
        })
      }
    })
    return allTemplates
  }, [subject, selected])

  const selCount = Object.values(selected).filter(Boolean).length

  const generate = () => {
    if (applicableTemplates.length === 0) return

    const count = unlimited ? 20 : Math.max(1, Math.min(50, qCount))
    const out   = []

    for (let i = 0; i < count; i++) {
      const tmpl = applicableTemplates[Math.floor(Math.random() * applicableTemplates.length)]
      try {
        // Use written engine for mode:'written' templates, math engine otherwise
        const rendered = (tmpl.mode === 'written' || tmpl.computeFn)
          ? renderWrittenTemplate(tmpl)
          : renderTemplate(tmpl)
        out.push(rendered)
      } catch (err) {
        console.error(`Failed to render template "${tmpl.id}":`, err)
      }
    }
    setQuestions(out)
  }

  // ── Notes ──────────────────────────────────────────────────────────────────
  const { getNote, setNote, deleteNote, allNotes } = useNotes()
  const [notesOpen,       setNotesOpen]       = useState(false)
  const [editNoteId,      setEditNoteId]       = useState(null)

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <TopicSidebar
        subjects={subjects}
        activeSubject={activeSubject}
        onSubjectChange={handleSubjectChange}
        selected={selected}
        onToggleSub={toggleSub}
        onToggleTopic={toggleTopic}
      />

      {/* ── Main ── */}
      <div className="main-area">
        {/* ── Top bar ── */}
        <div className="top-bar">
          <div className="top-bar-left">
            <h1 className="app-title">Question Generator</h1>
            <span className="subject-pill">{activeSubject}</span>
          </div>
          <div className="top-bar-right">
            <button
              className="notes-overview-btn"
              onClick={() => setNotesOpen(true)}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 2h10v8l-3 2H2V2z"/>
                <line x1="4" y1="5" x2="10" y2="5"/>
                <line x1="4" y1="7.5" x2="8" y2="7.5"/>
              </svg>
              All Notes
              {Object.values(allNotes).filter(n => n.trim()).length > 0 && (
                <span className="notes-count-badge">
                  {Object.values(allNotes).filter(n => n.trim()).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Generation Controls ── */}
        <div className="gen-bar">
          <div className="gen-bar-count">
            <label className="gen-label">Questions</label>
            <input
              type="number"
              className="count-input"
              min={1} max={50}
              value={qCount}
              disabled={unlimited}
              onChange={e => setQCount(Math.max(1, Math.min(50, +e.target.value)))}
            />
            <label className="toggle-label" onClick={() => setUnlimited(u => !u)}>
              <div className={`toggle-pill ${unlimited ? 'on' : ''}`}>
                <div className="toggle-dot"/>
              </div>
              Unlimited
            </label>
          </div>

          <div className="gen-bar-actions">
            <button
              className="btn-generate"
              onClick={generate}
              disabled={applicableTemplates.length === 0}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="2,1 13,7 2,13"/>
              </svg>
              Generate
            </button>
            {questions.length > 0 && (
              <button className="btn-clear" onClick={() => setQuestions([])}>
                Clear
              </button>
            )}
          </div>

          <div className="gen-bar-status">
            {selCount === 0
              ? <span className="status-hint">Select subtopics from the sidebar</span>
              : <span className="status-ok">{selCount} subtopic{selCount > 1 ? 's' : ''} selected · {applicableTemplates.length} template{applicableTemplates.length !== 1 ? 's' : ''} available</span>
            }
          </div>
        </div>

        {/* ── Question List ── */}
        <div className="question-list">
          {questions.length === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
                <rect x="8" y="6" width="32" height="36" rx="3"/>
                <line x1="15" y1="16" x2="33" y2="16"/>
                <line x1="15" y1="22" x2="33" y2="22"/>
                <line x1="15" y1="28" x2="25" y2="28"/>
              </svg>
              <p>Select topics and click <strong>Generate</strong> to produce questions.</p>
            </div>
          ) : (
            questions.map((q, i) => {
              const qid = `${q.meta.subtopic || q.meta.topic}::${i}`
              return (
                <QuestionCard
                  key={i}
                  question={q}
                  index={i}
                  noteText={getNote(qid)}
                  onNoteSave={setNote}
                />
              )
            })
          )}
        </div>
      </div>

      {/* ── All Notes Panel ── */}
      {notesOpen && (
        <AllNotesPanel
          allNotes={allNotes}
          onEdit={(id) => { setEditNoteId(id); setNotesOpen(false) }}
          onDelete={deleteNote}
          onClose={() => setNotesOpen(false)}
        />
      )}
    </div>
  )
}