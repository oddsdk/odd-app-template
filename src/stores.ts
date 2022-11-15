import { writable } from 'svelte/store'
import type { Program } from 'webnative'
import type { Writable } from 'svelte/store'
import type FileSystem from 'webnative/fs/index'

import { loadTheme } from '$lib/theme'
import type { AccountSettings } from '$lib/account-settings'
import type { Notification } from '$lib/notifications'
import type { Session } from '$lib/session'
import type { Theme } from '$lib/theme'

export const themeStore: Writable<Theme> = writable(loadTheme())

export const sessionStore: Writable<Session> = writable({
  username: null,
  session: null,
  loading: true,
  backupCreated: null
})

export const filesystemStore: Writable<FileSystem | null> = writable(null)

export const notificationStore: Writable<Notification[]> = writable([])

export const programStore: Writable<Program | null> = writable(null)

export const accountSettingsStore: Writable<AccountSettings> = writable({
  avatar: null,
  loading: true,
})
