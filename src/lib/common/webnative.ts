import * as webnative from 'webnative'
import { setup } from 'webnative'

import { asyncDebounce } from '$lib/common/utils'
import { filesystemStore, sessionStore } from '../../stores'
import { AREAS, GALLERY_DIRS } from '$lib/gallery'
import { getBackupStatus, type BackupStatus } from '$lib/auth/backup'

// runfission.net = staging
setup.endpoints({
  api: 'https://runfission.net',
  lobby: 'https://auth.runfission.net',
  user: 'fissionuser.net'
})

let state: webnative.AppState

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: false })

export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null

    state = await webnative.app({ useWnfs: true })

    switch (state.scenario) {
      case webnative.AppScenario.NotAuthed:
        sessionStore.set({
          username: '',
          authed: false,
          loading: false,
          backupCreated: null
        })
        break

      case webnative.AppScenario.Authed:
        backupStatus = await getBackupStatus(state.fs)

        sessionStore.set({
          username: state.username,
          authed: state.authenticated,
          loading: false,
          backupCreated: backupStatus.created
        })

        filesystemStore.set(state.fs)
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

  if (!success) return success

  const fs = await webnative.bootstrapRootFileSystem()
  filesystemStore.set(fs)

  // Create public and private directories for the gallery
  await fs.mkdir(webnative.path.directory(...GALLERY_DIRS[AREAS.PUBLIC]))
  await fs.mkdir(webnative.path.directory(...GALLERY_DIRS[AREAS.PRIVATE]))

  sessionStore.update(session => ({
    ...session,
    username,
    authed: true
  }))

  return success
}

export const loadAccount = async (username: string): Promise<void> => {
  await checkDataRoot(username)

  const fs = await webnative.loadRootFileSystem()
  filesystemStore.set(fs)

  const backupStatus = await getBackupStatus(fs)

  sessionStore.update(session => ({
    ...session,
    username,
    authed: true,
    backupCreated: backupStatus.created
  }))
}

const checkDataRoot = async (username: string): Promise<void> => {
  let dataRoot = await webnative.dataRoot.lookup(username)

  if (dataRoot) return

  return new Promise((resolve) => {
    const maxRetries = 20
    let attempt = 0

    const dataRootInterval = setInterval(async () => {
      console.warn('Could not fetch filesystem data root. Retrying.')

      dataRoot = await webnative.dataRoot.lookup(username)

      if (!dataRoot && attempt < maxRetries) {
        attempt++
        return
      }

      clearInterval(dataRootInterval)
      resolve()
    }, 500)
  })
}