import * as odd from '@oddjs/odd'
import { addNotification } from '$lib/notifications'
import { isFile } from '@oddjs/odd/fs/types/check'
import type { Link } from '@oddjs/odd/fs/types'
import type PublicFile from '@oddjs/odd/fs/v1/PublicFile'

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

  return result.results
}

export async function getSequencesFromListing(listing: { [name: string]: Link }, fs: odd.FileSystem): Promise<Sequence[]> {

  return []
}


// CIDs

export async function getContentCID(oeisNumber: number, fs: odd.FileSystem): Promise<string> {
  const filePath = odd.path.file('public', 'sequences', `${oeisNumber}.json`)

  const file = await fs.get(filePath)

  if (!isFile(file)) {
    addNotification(`Could not find public/sequences/${oeisNumber}.json.`, 'error')
    return ''
  }

  const cid = (file as PublicFile).cid.toString()

  return cid
}


// UI State and Controls

export type SequencesState = {
  loading: boolean
  selectedArea: Area
}

export const AREAS = [ 'Search', 'Collection' ] as const
export type Area = typeof AREAS[ number ]
