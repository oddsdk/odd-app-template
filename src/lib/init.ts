import * as webnative from 'webnative'
import { setup } from 'webnative'

import { filesystemStore, sessionStore } from '../stores'
import { getBackupStatus, type BackupStatus } from '$lib/auth/backup'

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: false })

export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null

    const state: webnative.AppState = await webnative.app({ useWnfs: true })

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