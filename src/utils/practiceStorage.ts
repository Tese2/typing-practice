const FAVORITES_KEY = 'typing_favorites'
const RECENT_KEY = 'typing_recent'

function readIds(key: string): number[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]')
    return Array.isArray(value) ? value.filter((id): id is number => Number.isSafeInteger(id) && id > 0) : []
  } catch {
    return []
  }
}

function writeIds(key: string, ids: number[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids))
  } catch {
    // Favoriting and recent history remain optional when browser storage is unavailable.
  }
}

export function getFavoritePassageIds(): number[] {
  return readIds(FAVORITES_KEY)
}

export function toggleFavoritePassage(id: number): number[] {
  const favorites = new Set(getFavoritePassageIds())
  if (favorites.has(id)) favorites.delete(id)
  else favorites.add(id)
  const next = [...favorites]
  writeIds(FAVORITES_KEY, next)
  return next
}

export function getRecentPassageIds(): number[] {
  return readIds(RECENT_KEY)
}

export function recordRecentPassage(id: number): number[] {
  const next = [id, ...getRecentPassageIds().filter((recentId) => recentId !== id)].slice(0, 20)
  writeIds(RECENT_KEY, next)
  return next
}