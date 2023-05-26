import shuffle from 'lodash.shuffle'

export { shuffle }

export function compare (v1?: unknown, v2?: unknown, caseSensitive?: boolean, specialCharacters?: boolean) {
  if (v1 === undefined || v2 === undefined || v1 === null || v2 === null) {
    return false
  }

  if (v1 instanceof File) {
    v1 = v1.name
  }

  if (v2 instanceof File) {
    v2 = v2.name
  }

  if ((typeof v1 === 'object' && v1 !== null) || (typeof v2 === 'object' && v2 !== null)) {
    v1 = JSON.stringify(v1)
    v2 = JSON.stringify(v2)
  }

  if (!caseSensitive) {
    v1 = String(v1).toLocaleUpperCase()
    v2 = String(v2).toLocaleUpperCase()
  }

  if (!specialCharacters) {
    v1 = ascii(String(v1))
    v2 = ascii(String(v2))
  }

  return v1 === v2
}
