import * as webnative from 'webnative'

import { dev } from '$app/environment'
import { filesystemStore, sessionStore } from '../stores'
import { getBackupStatus, type BackupStatus } from '$lib/auth/backup'

export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null

    const program: webnative.Program = await webnative.program({
      namespace: { creator: 'Fission', name: 'WAT' },
      debug: dev
    })

    if (program.session) {
      // Authed
      backupStatus = await getBackupStatus(program.session.fs)

      const fullUsername = localStorage.getItem('fullUsername')
      const username = fullUsername.split('#')[0]

      sessionStore.set({
        username: username,
        hashedUsername: program.session.username,
        session: program.session,
        authStrategy: program.auth,
        loading: false,
        backupCreated: backupStatus.created
      })

      filesystemStore.set(program.session.fs)

    } else {
      // Not authed
      sessionStore.set({
        username: '',
        hashedUsername: null,
        session: null,
        authStrategy: program.auth,
        // Temporarily adding a `crypto` key here so it can be accessed in the register flow, but maybe this should be saved somewhere else
        crypto: program.components.crypto,
        loading: false,
        backupCreated: null
      })

    }

  } catch (error) {
    console.error(error)

    switch (error) {
      case webnative.ProgramError.InsecureContext:
        sessionStore.update(session => ({
          ...session,
          loading: false,
          error: 'Insecure Context'
        }))
        break

      case webnative.ProgramError.UnsupportedBrowser:
        sessionStore.update(session => ({
          ...session,
          loading: false,
          error: 'Unsupported Browser'
        }))
        break
    }

  }
}
