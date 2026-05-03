/**
 * topics/acc1100/utils.js
 * Shared utility functions for ACC1100 dynamic question generation.
 */

export function randInt(min, max, step = 1) {
  const steps = Math.floor((max - min) / step)
  return min + Math.floor(Math.random() * (steps + 1)) * step
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}