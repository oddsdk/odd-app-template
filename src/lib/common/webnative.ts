import * as webnative from 'webnative'

import type FileSystem from 'webnative/fs/index'
import { USE_WNFS_IMPLEMENTATION } from 'webnative/auth/implementation/use-wnfs'
import { setup } from 'webnative'

// runfission.net = staging
setup.endpoints({ api: 'https://runfission.net', user: 'fissionuser.net' })

setup.setImplementations({ auth: USE_WNFS_IMPLEMENTATION.auth })

let state: webnative.State

const fissionInit = {
  permissions: {
    app: {
      name: 'app-name',
      creator: 'creator-name'
    },
    // Ask the user permission to additional filesystem paths
    fs: {
      // private: [webnative.path.directory('Documents', 'Contacts')],
    }
  }
}

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: true })

export const initialize = async (): Promise<void> => {
  try {
    const st = await webnative.initialise(fissionInit)
    state = st

    switch (state.scenario) {
      case webnative.Scenario.NotAuthorised:
        console.log('Not logged in')
        break

      case webnative.Scenario.Continuation:
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

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  return webnative.account.isUsernameAvailable(username)
}
// interface StateFS {
//   fs?: FileSystem
// }

// export const getWNFS: () => FileSystem = () => (state as StateFS)?.fs
