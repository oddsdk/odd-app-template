import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

import type { SequencesState } from '$routes/sequences/lib/sequences'


export const sequencesStore: Writable<SequencesState> = writable({
  selectedArea: 'Search',
})