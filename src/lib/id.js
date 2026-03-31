// Tiny ID generator (no crypto dependency needed)
let _counter = 0
export function genId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${++_counter}`
}
