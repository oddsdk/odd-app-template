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
      console.log('program.session', program.session)
      // Authed
      backupStatus = await getBackupStatus(program.session.fs)

      sessionStore.set({
        username: program.session.username,
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
        session: null,
        authStrategy: program.auth,
        loading: false,
        backupCreated: null
      })

    }

  } catch (error) {
    console.error(error)

    switch (error.message) {
      case webnative.ProgramError.InsecureContext:
        sessionStore.update(session => ({
          ...session,
          loading: false,
          error: 'Insecure Context'
        }))
        break

      /**
       * This is a bandaid fix or an error coming from ipfs-core -> ipfs-core-config -> datastore-level -> abstract-level
       * in FF private browsing mode ¯\_(ツ)_/¯
       */
      case 'Database is not open':
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
