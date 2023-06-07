export function hmsToSeconds (value: string | number) {
  return value.toString().split(':').reduce((acc, time) => (60 * acc) + +time, 0)
}

export function formatSeconds (value: number) {
  return new Date(value * 1000).toISOString().substring(14, 19)
}
