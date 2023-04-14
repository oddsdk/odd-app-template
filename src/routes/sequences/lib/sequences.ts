export type Sequences = {
  loading: boolean
  selectedArea: Area
}

// Sequence UI areas
export const AREAS = [ 'Search', 'Collection' ] as const
export type Area = typeof AREAS[ number ]
