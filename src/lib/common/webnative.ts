import * as webnative from 'webnative'
// import type FileSystem from 'webnative/fs/index'
import { setup } from 'webnative'

import { asyncDebounce } from '$lib/common/utils'
import { sessionStore } from '../../stores'

// runfission.net = staging
setup.endpoints({ api: 'https://runfission.net', user: 'fissionuser.net' })

let state: webnative.AppState

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: true })

export const initialize = async (): Promise<void> => {
  try {
    state = await webnative.app({ useWnfs: true })

    switch (state.scenario) {
      case webnative.AppScenario.NotAuthed:
        sessionStore.set({
          username: '',
          authed: false,
          loading: false
        })
        break

      case webnative.AppScenario.Authed:
        sessionStore.set({
          username: state.username,
          authed: state.authenticated,
          loading: false
        })
        break

      default:
        break
    }
  } catch (error) {
    switch (error) {
      case webnative.InitialisationError.InsecureContext:
        sessionStore.update(session => ({
          ...session,
          loading: false,
          error: 'Insecure Context'
        }))
        break

      case webnative.InitialisationError.UnsupportedBrowser:
        sessionStore.update(session => ({
          ...session,
          loading: false,
          error: 'Unsupported Browser'
        }))
        break
    }
  }
}

export const isUsernameValid = async (username: string): Promise<boolean> => {
  return webnative.account.isUsernameValid(username)
}

const debouncedIsUsernameAvailable = asyncDebounce(
  webnative.account.isUsernameAvailable,
  300
)

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  return debouncedIsUsernameAvailable(username)
}

export const register = async (username: string): Promise<boolean> => {
  const { success } = await webnative.account.register({ username })

  return success
}

// interface StateFS {
//   fs?: FileSystem
// }

// export const getWNFS: () => FileSystem = () => (state as StateFS)?.fs
