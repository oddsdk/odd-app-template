export type Session = {
  username: string
  authed: boolean
  loading: boolean
  error?: 'Insecure Context' | 'Unsupported Browser'
}