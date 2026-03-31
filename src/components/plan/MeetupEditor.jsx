import { useState, useContext, useRef } from 'react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { Button } from '../common/Button.jsx'
import { isValidLat, isValidLng } from '../../lib/geo.js'
import { useGeocode } from '../../hooks/useGeocode.js'
import { MapPin, Loader2 } from 'lucide-react'

export function MeetupEditor() {
  const { state, dispatch } = useContext(FleetContext)
  const meetup = state.sharedPlan.meetupPoint
  const [form, setForm] = useState({ ...meetup })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const { suggestions, loading, lookup, clear } = useGeocode()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const wrapperRef = useRef(null)

  function handleNameChange(e) {
    const val = e.target.value
    setForm(f => ({ ...f, name: val }))
    lookup(val)
    setShowSuggestions(true)
  }

  function pickSuggestion(s) {
    setForm(f => ({ ...f, name: s.name, lat: s.lat, lng: s.lng }))
    setShowSuggestions(false)
    clear()
  }

  function validate() {
    const errs = {}
    if (!form.name?.trim()) errs.name = 'Name is required'
    if (!isValidLat(form.lat)) errs.lat = 'Valid latitude (-90 to 90)'
    if (!isValidLng(form.lng)) errs.lng = 'Valid longitude (-180 to 180)'
    return errs
  }

  function save() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    dispatch({
      type: ACTIONS.MEETUP_POINT_UPDATED,
      payload: { ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) },
    })
    setErrors({})
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function field(key, label, placeholder, extraProps = {}) {
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
        <input
          value={form[key] ?? ''}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400"
          {...extraProps}
        />
        {errors[key] && <p className="text-xs text-red-500 mt-0.5">{errors[key]}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Location name with geocode autocomplete */}
      <div className="relative" ref={wrapperRef}>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Location Name</label>
        <div className="relative">
          <input
            value={form.name ?? ''}
            onChange={handleNameChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="e.g. Moss Landing Marina"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400 pr-8"
          />
          {loading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin absolute right-2.5 top-2.5" />}
        </div>
        {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onMouseDown={() => pickSuggestion(s)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-ocean-50 border-b border-gray-100 last:border-0"
              >
                <p className="text-gray-800 truncate">{s.name}</p>
                <p className="text-xs text-gray-400">{s.lat.toFixed(4)}, {s.lng.toFixed(4)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {field('lat', 'Latitude', '36.8046')}
        {field('lng', 'Longitude', '-121.787')}
      </div>
      {field('etaWindow', 'ETA Window', 'e.g. 14:00 – 15:00')}
      <Button onClick={save} variant={saved ? 'success' : 'primary'} className="w-full">
        <MapPin className="w-4 h-4" aria-hidden="true" />
        {saved ? 'Saved!' : 'Save Meetup Point'}
      </Button>
    </div>
  )
}
