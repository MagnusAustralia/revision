import { useState, useEffect } from 'react'

const PREFIX = 'mqg::state::'

export function usePersistedState(key, defaultValue) {
  const storageKey = PREFIX + key

  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {}
  }, [storageKey, state])

  return [state, setState]
}