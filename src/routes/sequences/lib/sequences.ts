// OEIS API

/**
 * Sequence data type
 *
 * See https://oeis.org/eishelp2.html for more information on
 * the sequence data format
 *
 */
export type Sequence = {
  author: string
  comment: string[]
  created: string
  data: string
  example: string[]
  ext: string[]
  formula: string[]
  id: string
  keyword: string
  link: string[]
  maple: string
  mathematica: string[]
  name: string
  number: number
  offset: string
  program: string[]
  reference: string[]
  references: number
  revision: number
  time: string
  xref: string[]
}

export async function getSequences(sequence: number[]): Promise<Sequence[]> {
  const sequenceString = sequence.map(String).join(',')

  const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://oeis.org/search?fmt=json&q=${sequenceString}`)
  const response = await fetch(url)
  const result = await response.json()

  console.log('result', result)

  return result.results
}



// UI State and Controls

export type SequencesState = {
  loading: boolean
  selectedArea: Area
}

export const AREAS = [ 'Search', 'Collection' ] as const
export type Area = typeof AREAS[ number ]
