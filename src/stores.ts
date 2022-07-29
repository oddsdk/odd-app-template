import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type FileSystem from 'webnative/fs/index'

import { loadTheme } from '$lib/theme'
import type { Session } from '$lib/session'
import type { Theme } from '$lib/theme'

export const theme: Writable<Theme> = writable(loadTheme())

export const sessionStore: Writable<Session> = writable({
  username: '',
  authed: false,
  loading: true
})

export const filesystemStore: Writable<FileSystem | null> = writable(null)