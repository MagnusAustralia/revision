/**
 * components/TopicSidebar.jsx
 *
 * Left sidebar showing:
 *   - Subject tabs (ENG1005, ENG1014, etc.)
 *   - Collapsible topic groups with subtopic checkboxes
 */

import React, { useState } from 'react'

function Checkbox({ checked, partial }) {
  return (
    <div className={`chk ${checked ? 'on' : partial ? 'partial' : ''}`}>
      {checked && (
        <svg width="9" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="1,4 4,7 9,1"/>
        </svg>
      )}
      {!checked && partial && (
        <div className="chk-dash"/>
      )}
    </div>
  )
}

function SubtopicRow({ name, checked, onToggle }) {
  return (
    <div className="sub-row" onClick={onToggle}>
      <Checkbox checked={checked} />
      <span className="sub-name">{name}</span>
    </div>
  )
}

function TopicGroup({ topic, subtopics, selected, onToggleTopic, onToggleSub }) {
  const [open, setOpen] = useState(false)

  const subNames = subtopics.map(s => (typeof s === 'string' ? s : s.name))
  const allOn  = subNames.every(s => selected[s])
  const someOn = subNames.some(s => selected[s])

  const hasTemplates = subtopics.some(s => {
    if (typeof s === 'string') return true
    return (s.templates || []).length > 0
  })

  return (
    <div className="topic-group">
      <div className="topic-header" onClick={() => setOpen(o => !o)}>
        <div
          className="topic-chk-wrap"
          onClick={e => { e.stopPropagation(); onToggleTopic(subNames, allOn) }}
        >
          <Checkbox checked={allOn} partial={someOn && !allOn} />
        </div>
        <span className="topic-name">{topic}</span>
        {!hasTemplates && <span className="empty-badge">empty</span>}
        <span className={`topic-arrow ${open ? 'open' : ''}`}>▶</span>
      </div>
      {open && (
        <div className="subtopics">
          {subNames.map(name => (
            <SubtopicRow
              key={name}
              name={name}
              checked={!!selected[name]}
              onToggle={() => onToggleSub(name)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function TopicSidebar({ subjects, activeSubject, onSubjectChange, selected, onToggleSub, onToggleTopic }) {
  const subject = subjects.find(s => s.id === activeSubject)

  return (
    <div className="sidebar">
      {/* Subject tabs */}
      <div className="subject-tabs">
        {subjects.map(s => (
          <button
            key={s.id}
            className={`subject-tab ${s.id === activeSubject ? 'active' : ''}`}
            onClick={() => onSubjectChange(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="sidebar-section-label">Topics</div>

      {subject && subject.topics.length > 0 ? (
        subject.topics.map((t) => {
          const topicName = t.topic
          const subtopics = t.subtopics || t.templates?.map(tmpl => tmpl.subtopic).filter(Boolean) || []

          // For ENG1005-style (flat templates array), derive unique subtopics
          let subList = []
          if (t.subtopics) {
            subList = t.subtopics
          } else if (t.templates) {
            const seen = new Set()
            t.templates.forEach(tmpl => {
              if (tmpl.subtopic && !seen.has(tmpl.subtopic)) {
                seen.add(tmpl.subtopic)
                subList.push(tmpl.subtopic)
              }
            })
          }

          return (
            <TopicGroup
              key={topicName}
              topic={topicName}
              subtopics={subList}
              selected={selected}
              onToggleTopic={onToggleTopic}
              onToggleSub={onToggleSub}
            />
          )
        })
      ) : (
        <div className="sidebar-empty">
          No topics defined yet for {activeSubject}.
        </div>
      )}
    </div>
  )
}
