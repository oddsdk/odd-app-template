import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { loadTheme } from '$lib/theme'
import type { Theme } from '$lib/theme'

export const theme: Writable<Theme> = writable(loadTheme())