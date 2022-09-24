import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { AREAS } from './lib/gallery'
import type { Gallery } from './lib/gallery'

export const galleryStore: Writable<Gallery> = writable({
  loading: true,
  publicImages: [],
  privateImages: [],
  selectedArea: AREAS.PUBLIC
})
