import type * as odd from '@oddjs/odd'

import { appName } from '$lib/app-info'

type Username = {
  full: string
  hashed: string
  trimmed: string
}

export type Session = {
  username: Username
  session: odd.Session | null
  authStrategy: odd.AuthenticationStrategy | null
  program: odd.Program
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
