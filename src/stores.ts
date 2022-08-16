import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { account, fs as FileSystem } from 'webnative'

import { loadTheme } from '$lib/theme'
import type { Device } from '$lib/device'
import type { Session } from '$lib/session'
import type { Theme } from '$lib/theme'

export const theme: Writable<Theme> = writable(loadTheme())

export const sessionStore: Writable<Session> = writable({
  username: '',
  authed: false,
  loading: true
})

export const filesystemStore: Writable<FileSystem | null> = writable(null)

export const deviceStore: Writable<Device> = writable({ isMobile: true })

export const accountLinkingConsumerStore: Writable<account.AccountLinkingConsumer> = writable(
  null
)

export const accountLinkingProducerStore: Writable<{
  accountLinkingProducer: account.AccountLinkingProducer
  pin: number[]
  confirmPin: () => void
  rejectPin: () => void
 }> = writable(
  null
)
