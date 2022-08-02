export type Session = {
  username: string
  authed: boolean
  loading: boolean
  error?: SessionError
}

type SessionError = 'Insecure Context' | 'Unsupported Browser'


export const errorToMessage = (error: SessionError): string => {
  switch (error) {
    case 'Insecure Context':
      return 'Application must be run in a secure context'

    case 'Unsupported Browser':
      return 'Application does not support this browser'
  }
}