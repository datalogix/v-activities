export { pascalCase } from 'change-case'

export type StringOptions = {
  alpha?: boolean
  numeric?: boolean
  space?: boolean
  hyphen?: boolean
  unicode?: boolean
  lowercase?: boolean
  uppercase?: boolean
  exclude?: string | string[]
}

export const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

export function ascii (str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function replace (str: string, replaceValue = '', options: StringOptions = {}) {
  const opts: StringOptions = {
    alpha: true,
    numeric: true,
    space: true,
    hyphen: true,
    unicode: true,
    lowercase: true,
    uppercase: true,
    ...options
  }

  const patterns: string[] = []

  if (opts.alpha && opts.lowercase) patterns.push('a-z'.toLocaleLowerCase())
  if (opts.alpha && opts.uppercase) patterns.push('a-z'.toLocaleUpperCase())
  if (opts.numeric) patterns.push('0-9')
  if (opts.space) patterns.push('\\s')
  if (opts.hyphen) patterns.push('\\-')
  if (opts.unicode && opts.lowercase) patterns.push('áàâãéèêíïóôõöúçñ'.toLocaleLowerCase())
  if (opts.unicode && opts.uppercase) patterns.push('áàâãéèêíïóôõöúçñ'.toLocaleUpperCase())

  return str.replace(new RegExp(`[^${patterns.join('')}]+`, 'ugi'), replaceValue)
}

export function generateString (num = 20, options: StringOptions = {}) {
  const opts: StringOptions = {
    alpha: true,
    numeric: true,
    space: true,
    hyphen: true,
    unicode: true,
    lowercase: true,
    uppercase: true,
    exclude: [],
    ...options
  }

  const patterns: string[] = []

  if (opts.alpha && opts.lowercase) patterns.push(LETTERS.toLocaleLowerCase())
  if (opts.alpha && opts.uppercase) patterns.push(LETTERS.toLocaleUpperCase())
  if (opts.numeric) patterns.push('0123456789')
  if (opts.space) patterns.push(' ')
  if (opts.hyphen) patterns.push('-')
  if (opts.unicode && opts.lowercase) patterns.push('áàâãéèêíïóôõöúçñ'.toLocaleLowerCase())
  if (opts.unicode && opts.uppercase) patterns.push('áàâãéèêíïóôõöúçñ'.toLocaleUpperCase())

  let str = ''

  while (str.length < num) {
    const char = patterns.join('').charAt(Math.floor(Math.random() * patterns.join('').length))

    if (!opts.exclude?.includes(char)) {
      str += char
    }
  }

  return str
}

export function generateChar (options: StringOptions = {}) {
  return generateString(1, options)
}

export function generateUniqueString (max = 20, options: StringOptions = {}): string {
  let result = ''

  while (result.length < max) {
    const char = generateChar(options)

    if (!result.includes(char)) {
      result += char
    }
  }

  return result
}

export function generateUniqueStringFromString (str: string, max = 20): string {
  const qtd = max - str.length

  if (qtd < 1) {
    return str
  }

  const options = generateOptionsFromString(str)
  options.exclude = str

  return str + generateUniqueString(qtd, options)
}

export function generateOptionsFromString (str: string): StringOptions {
  const opts: StringOptions = {
    alpha: false,
    numeric: false,
    space: false,
    hyphen: false,
    unicode: false,
    lowercase: false,
    uppercase: false
  }

  if (new RegExp(`[${LETTERS.toLocaleLowerCase()}]`).test(str)) {
    opts.alpha = true
    opts.lowercase = true
  }

  if (new RegExp(`[${LETTERS.toLocaleUpperCase()}]`).test(str)) {
    opts.alpha = true
    opts.uppercase = true
  }

  if (/[0-9]/.test(str)) opts.numeric = true
  if (/\s/.test(str)) opts.space = true
  if (/-/.test(str)) opts.hyphen = true

  if (new RegExp(`[${'áàâãéèêíïóôõöúçñ'.toLocaleLowerCase()}]`).test(str)) {
    opts.unicode = true
    opts.lowercase = true
  }

  if (new RegExp(`[${'áàâãéèêíïóôõöúçñ'.toLocaleUpperCase()}]`).test(str)) {
    opts.unicode = true
    opts.uppercase = true
  }

  return opts
}

export function shuffleString (str: string) {
  let result = str.split('')

  while (result.join('').toLocaleUpperCase() === str.toLocaleUpperCase()) {
    result = shuffle(result)
  }

  return result.join('')
}

export function shuffleStringUnique (str: string) {
  return shuffleString(Array.from(new Set(str.split(''))).join(''))
}

export function similarity (str1: string, str2: string) {
  const lowerStr1 = str1.toLocaleLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').trim()
  const lowerStr2 = str2.toLocaleLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').trim()

  const set1 = new Set(lowerStr1.split(''))
  const set2 = new Set(lowerStr2.split(''))

  const intersection = new Set([...set1].filter(char => set2.has(char)))
  const union = new Set([...set1, ...set2])

  return (intersection.size / union.size) * 100
}
