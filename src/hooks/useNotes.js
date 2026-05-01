/**
 * hooks/useNotes.js
 *
 * Persists per-question notes to localStorage.
 * Key format: `note::<questionId>` where questionId is a stable string
 * derived from the template id + generation index.
 */

import { useState, useCallback } from 'react'

const STORAGE_PREFIX = 'mqg::note::'

function storageKey(questionId) {
  return `${STORAGE_PREFIX}${questionId}`
}

export function useNotes() {
  // Load all existing notes from localStorage on mount
  const loadAll = () => {
    const notes = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const qid = key.slice(STORAGE_PREFIX.length)
        notes[qid] = localStorage.getItem(key) || ''
      }
    }
    return notes
  }

  const [notes, setNotes] = useState(loadAll)

  const setNote = useCallback((questionId, text) => {
    localStorage.setItem(storageKey(questionId), text)
    setNotes(prev => ({ ...prev, [questionId]: text }))
  }, [])

  const getNote = useCallback((questionId) => {
    return notes[questionId] || ''
  }, [notes])

  const deleteNote = useCallback((questionId) => {
    localStorage.removeItem(storageKey(questionId))
    setNotes(prev => {
      const next = { ...prev }
      delete next[questionId]
      return next
    })
  }, [])

  // All question IDs that have a non-empty note
  const noteIds = Object.keys(notes).filter(id => notes[id].trim().length > 0)

  return { getNote, setNote, deleteNote, noteIds, allNotes: notes }
}
