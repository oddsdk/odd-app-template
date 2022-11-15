import * as webnative from 'webnative'

import { filesystemStore, programStore, sessionStore } from '../stores'
import { getBackupStatus, type BackupStatus } from '$lib/auth/backup'


export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null

    const program: webnative.Program = await webnative.program({
      appInfo: { creator: "Fission", name: "WAT" },
      debug: true // TODO: Add a flag or script to turn debugging on/off
    })

    programStore.set(program)

    if (program.session) {
      // Authed
      backupStatus = await getBackupStatus(program.session.fs)

      sessionStore.set({
        username: program.session.username,
        session: program.session,
        loading: false,
        backupCreated: backupStatus.created
      })

      filesystemStore.set(program.session.fs)

    } else {
      // Not authed
      sessionStore.set({
        username: '',
        session: null,
        loading: false,
        backupCreated: null
      })

    }

  } catch (error) {
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