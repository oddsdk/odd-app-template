import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

import type { Gallery } from '$routes/gallery/lib/gallery'

export enum AREAS {
  PUBLIC = 'Public',
  PRIVATE = 'Private'
}

export const galleryStore: Writable<Gallery> = writable({
  loading: true,
  publicImages: [],
  privateImages: [],
  selectedArea: AREAS.PUBLIC,
})
