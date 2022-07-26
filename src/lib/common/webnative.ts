import * as webnative from 'webnative'

// import type FileSystem from 'webnative/fs/index'
import { setup } from 'webnative'
import { asyncDebounce } from '$lib/common/utils'

// runfission.net = staging
setup.endpoints({ api: 'https://runfission.net', user: 'fissionuser.net' })

let state: webnative.AppState

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: true })

export const initialize = async (): Promise<void> => {
  try {
    const st = await webnative.app({ useWnfs: true })
    state = st

    switch (state.scenario) {
      case webnative.AppScenario.NotAuthed:
        console.log('Not logged in')
        break

      case webnative.AppScenario.Authed:
        console.log('Logged in')
        break

      default:
        break
    }
  } catch (error) {
    switch (error) {
      case webnative.InitialisationError.InsecureContext:
        console.log('Insecure context')
        break

      case webnative.InitialisationError.UnsupportedBrowser:
        console.log('Unsupported browser')
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
  const { success } = await webnative.account.register({
    username,
    email: 'null@null.com'
  })
  return success
}

// interface StateFS {
//   fs?: FileSystem
// }

// export const getWNFS: () => FileSystem = () => (state as StateFS)?.fs
