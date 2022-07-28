import { writable } from 'svelte/store'
import { loadTheme } from '$lib/theme'
import type { Session } from '$lib/session'
import type { Theme } from '$lib/theme'
import type { Writable } from 'svelte/store'

export const theme: Writable<Theme> = writable(loadTheme())

export const sessionStore: Writable<Session> = writable({
  username: '',
  authed: false,
  loading: true
})