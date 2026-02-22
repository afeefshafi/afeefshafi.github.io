export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}
