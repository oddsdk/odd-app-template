import { appName } from '$lib/app-info'
import type { Session as WebnativeSession } from 'webnative'

export type Session = {
  username: string
  session: WebnativeSession | null
  loading: boolean
  backupCreated: boolean
  error?: SessionError
}

type SessionError = 'Insecure Context' | 'Unsupported Browser'

export const errorToMessage = (error: SessionError): string => {
  switch (error) {
    case 'Insecure Context':
      return `${appName} requires a secure context (HTTPS)`

    case 'Unsupported Browser':
      return `Your browser does not support ${appName}`
  }
}
