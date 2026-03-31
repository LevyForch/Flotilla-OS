import { useState, useRef, useCallback } from 'react'
import { geocodeSearch } from '../lib/geocode.js'

const DEBOUNCE_MS = 400

/**
 * Hook that provides debounced geocoding suggestions.
 * Returns { suggestions, loading, lookup, clear }.
 */
export function useGeocode() {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)
  const abortRef = useRef(null)

  const lookup = useCallback((query) => {
    // Cancel any pending request
    clearTimeout(timerRef.current)
    abortRef.current?.abort()

    if (!query || query.trim().length < 3) {
      setSuggestions([])
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller
      try {
        const results = await geocodeSearch(query, { signal: controller.signal })
        setSuggestions(results)
      } catch {
        // AbortError or network error — silently ignore
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  const clear = useCallback(() => {
    clearTimeout(timerRef.current)
    abortRef.current?.abort()
    setSuggestions([])
    setLoading(false)
  }, [])

  return { suggestions, loading, lookup, clear }
}
