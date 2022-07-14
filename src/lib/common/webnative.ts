import * as webnative from 'webnative'

import type FileSystem from 'webnative/fs/index'

let state: webnative.State

const fissionInit = {
  permissions: {
    app: {
      name: 'app-name',
      creator: 'creator-name',
    },
    // Ask the user permission to additional filesystem paths
    fs: {
      // private: [webnative.path.directory('Documents', 'Contacts')],
    },
  },
}

webnative.setup.debug({ enabled: true })

export const initialize = async (): Promise<void> => {
  try {
    const st = await webnative.initialise(fissionInit)
    state = st

    switch (state.scenario) {
      case webnative.Scenario.AuthCancelled:
      case webnative.Scenario.NotAuthorised:
        console.log('Not logged in')
        break

      case webnative.Scenario.AuthSucceeded:
      case webnative.Scenario.Continuation:
        console.log('Logged in')
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

// interface StateFS {
//   fs?: FileSystem
// }

// export const getWNFS: () => FileSystem = () => (state as StateFS)?.fs
