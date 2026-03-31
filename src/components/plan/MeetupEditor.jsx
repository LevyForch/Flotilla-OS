import { useState, useContext } from 'react'
import { FleetContext } from '../../App.jsx'
import { ACTIONS } from '../../lib/fleetReducer.js'
import { Button } from '../common/Button.jsx'
import { isValidLat, isValidLng } from '../../lib/geo.js'
import { MapPin } from 'lucide-react'

export function MeetupEditor() {
  const { state, dispatch } = useContext(FleetContext)
  const meetup = state.sharedPlan.meetupPoint
  const [form, setForm] = useState({ ...meetup })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

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
      {field('name', 'Location Name', 'e.g. Moss Landing Marina')}
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
