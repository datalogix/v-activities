import shuffle from 'lodash.shuffle'

export { shuffle }

export function compare (v1?: unknown, v2?: unknown) {
  if (v1 === undefined || v2 === undefined || v1 === null || v2 === null) {
    return false
  }

  if ((typeof v1 === 'object' && v1 !== null) || (typeof v2 === 'object' && v2 !== null)) {
    return JSON.stringify(v1) === JSON.stringify(v2)
  }

  return String(v1).toLocaleUpperCase() === String(v2).toLocaleUpperCase()
}
