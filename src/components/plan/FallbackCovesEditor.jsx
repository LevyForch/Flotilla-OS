import { useState, useContext } from 'react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { Button } from '../common/Button.jsx'
import { EmptyState } from '../common/EmptyState.jsx'
import { isValidLat, isValidLng } from '../../lib/geo.js'
import { useGeocode } from '../../hooks/useGeocode.js'
import { genId } from '../../lib/id.js'
import { Plus, Trash2, Edit2, Check, X, Loader2 } from 'lucide-react'

const EMPTY_COVE = { name: '', lat: '', lng: '', notes: '' }

function CoveForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_COVE)
  const [errors, setErrors] = useState({})
  const { suggestions, loading, lookup, clear } = useGeocode()
  const [showSuggestions, setShowSuggestions] = useState(false)

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
    if (!form.name?.trim()) errs.name = 'Name required'
    if (!isValidLat(form.lat)) errs.lat = 'Valid lat'
    if (!isValidLng(form.lng)) errs.lng = 'Valid lng'
    return errs
  }

  function handleSave() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, lat: parseFloat(form.lat), lng: parseFloat(form.lng) })
  }

  return (
    <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-200">
      <div className="relative">
        <div className="relative">
          <input
            value={form.name}
            onChange={handleNameChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Cove name"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400 pr-7"
          />
          {loading && <Loader2 className="w-3.5 h-3.5 text-gray-400 animate-spin absolute right-2 top-2" />}
        </div>
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onMouseDown={() => pickSuggestion(s)}
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-ocean-50 border-b border-gray-100 last:border-0"
              >
                <p className="text-gray-800 truncate text-xs">{s.name}</p>
                <p className="text-xs text-gray-400">{s.lat.toFixed(4)}, {s.lng.toFixed(4)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            value={form.lat}
            onChange={e => setForm(f => ({ ...f, lat: e.target.value }))}
            placeholder="Latitude"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400"
          />
          {errors.lat && <p className="text-xs text-red-500">{errors.lat}</p>}
        </div>
        <div>
          <input
            value={form.lng}
            onChange={e => setForm(f => ({ ...f, lng: e.target.value }))}
            placeholder="Longitude"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ocean-400"
          />
          {errors.lng && <p className="text-xs text-red-500">{errors.lng}</p>}
        </div>
      </div>
      <textarea
        value={form.notes}
        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        placeholder="Notes (optional)"
        rows={2}
        className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ocean-400"
      />
      <div className="flex gap-2">
        <Button size="sm" variant="primary" onClick={handleSave}>
          <Check className="w-3 h-3" /> Save
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          <X className="w-3 h-3" /> Cancel
        </Button>
      </div>
    </div>
  )
}

export function FallbackCovesEditor() {
  const { state, dispatch } = useContext(FleetContext)
  const coves = state.sharedPlan.fallbackCoves
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  function addCove(data) {
    dispatch({ type: ACTIONS.FALLBACK_COVE_ADDED, payload: { ...data, id: genId('cove') } })
    setAdding(false)
  }

  function updateCove(data) {
    dispatch({ type: ACTIONS.FALLBACK_COVE_UPDATED, payload: data })
    setEditingId(null)
  }

  function removeCove(id) {
    dispatch({ type: ACTIONS.FALLBACK_COVE_REMOVED, payload: { id } })
  }

  return (
    <div className="space-y-3">
      {coves.length === 0 && !adding && (
        <EmptyState icon="🏝" title="No fallback coves" description="Add a safe harbor for emergencies" />
      )}
      {coves.map(cove => (
        <div key={cove.id}>
          {editingId === cove.id ? (
            <CoveForm
              initial={{ ...cove, lat: String(cove.lat), lng: String(cove.lng) }}
              onSave={updateCove}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start justify-between">
              <div>
                <p className="font-semibold text-sm text-navy-900">{cove.name}</p>
                <p className="text-xs text-gray-500">{cove.lat}, {cove.lng}</p>
                {cove.notes && <p className="text-xs text-gray-500 italic mt-0.5">"{cove.notes}"</p>}
              </div>
              <div className="flex gap-1 ml-2">
                <Button size="icon" variant="ghost" onClick={() => setEditingId(cove.id)} aria-label={`Edit ${cove.name}`}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => removeCove(cove.id)} aria-label={`Remove ${cove.name}`}>
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      {adding ? (
        <CoveForm onSave={addCove} onCancel={() => setAdding(false)} />
      ) : (
        <Button size="sm" variant="outline" onClick={() => setAdding(true)} className="w-full">
          <Plus className="w-4 h-4" /> Add Fallback Cove
        </Button>
      )}
    </div>
  )
}
