import type * as webnative from 'webnative'
import type * as Crypto from 'webnative/components/crypto/implementation.js'

import { appName } from '$lib/app-info'

export type Session = {
  username: string
  hashedUsername: string
  session: webnative.Session | null
  authStrategy: webnative.AuthenticationStrategy | null
  crypto?: Crypto.Implementation
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
