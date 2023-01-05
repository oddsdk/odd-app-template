import * as webnative from 'webnative'

import { dev } from '$app/environment'
import { filesystemStore, sessionStore } from '../stores'
import { getBackupStatus, type BackupStatus } from '$lib/auth/backup'
import { USERNAME_STORAGE_KEY, createDID } from '$lib/auth/account'
import { webnativeNamespace } from '$lib/app-info'

export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null

    const program: webnative.Program = await webnative.program({
      namespace: webnativeNamespace,
      debug: dev
    })

    if (program.session) {
      // Authed
      backupStatus = await getBackupStatus(program.session.fs)

      let fullUsername = await program.components.storage.getItem(USERNAME_STORAGE_KEY) as string

      // If the user is migrating from a version webnative-app-template before https://github.com/webnative-examples/webnative-app-template/pull/97/files#diff-a180510e798b8f833ebfdbe691c5ec4a1095076980d3e2388de29c849b2b8361R44,
      // their username won't contain a did, so we will need to manually append a DID and add it storage here
      if (!fullUsername) {
        const did = await createDID(program.components.crypto)
        fullUsername = `${program.session.username}#${did}`
        await program.components.storage.setItem(USERNAME_STORAGE_KEY, fullUsername)
        window.location.reload()
      }

      sessionStore.set({
        username: {
          full: fullUsername,
          hashed: program.session.username,
          trimmed: fullUsername.split('#')[0],
        },
        session: program.session,
        authStrategy: program.auth,
        program,
        loading: false,
        backupCreated: backupStatus.created
      })

      filesystemStore.set(program.session.fs)

    } else {
      // Not authed
      sessionStore.set({
        username: null,
        session: null,
        authStrategy: program.auth,
        program,
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
