import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

import type { Sequences } from '$routes/sequences/lib/sequences'


export const sequencesStore: Writable<Sequences> = writable({
  loading: true,
  selectedArea: 'Search',
})