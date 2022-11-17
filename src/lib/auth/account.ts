import * as webnative from 'webnative'
import type FileSystem from 'webnative/fs/index'
import { get as getStore } from 'svelte/store'

import { asyncDebounce } from '$lib/utils'
import { filesystemStore, sessionStore } from '../../stores'
import { getBackupStatus } from '$lib/auth/backup'
import { ACCOUNT_SETTINGS_DIR } from '$lib/account-settings'
import { AREAS } from '$routes/gallery/stores'
import { GALLERY_DIRS } from '$routes/gallery/lib/gallery'


export const isUsernameValid = async (username: string): Promise<boolean> => {
  const session = getStore(sessionStore)
  return session.authStrategy.isUsernameValid(username)
}

const _isUsernameAvailable = async (
  username: string
) => {
  const session = getStore(sessionStore)
  return session.authStrategy.isUsernameAvailable(username)
}

const debouncedIsUsernameAvailable = asyncDebounce(
  _isUsernameAvailable,
  300
)

export const isUsernameAvailable = async (
  username: string
): Promise<boolean> => {
  return debouncedIsUsernameAvailable(username)
}

export const register = async (username: string): Promise<boolean> => {
  const authStrategy = getStore(sessionStore).authStrategy
  const { success } = await authStrategy.register({ username })

  if (!success) return success

  const session = await authStrategy.session()
  filesystemStore.set(session.fs)

  // TODO Remove if only public and private directories are needed
  await initializeFilesystem(session.fs)

  sessionStore.update(state => ({
    ...state,
    username,
    session
  }))

  return success
}

/**
 * Create additional directories and files needed by the app
 *
 * @param fs FileSystem
 */
const initializeFilesystem = async (fs: FileSystem): Promise<void> => {
  await fs.mkdir(webnative.path.directory(...GALLERY_DIRS[ AREAS.PUBLIC ]))
  await fs.mkdir(webnative.path.directory(...GALLERY_DIRS[ AREAS.PRIVATE ]))
  await fs.mkdir(webnative.path.directory(...ACCOUNT_SETTINGS_DIR))
}

export const loadAccount = async (username: string): Promise<void> => {
  const session = await getStore(sessionStore).authStrategy.session()

  filesystemStore.set(session.fs)

  const backupStatus = await getBackupStatus(session.fs)

  sessionStore.update(state => ({
    ...state,
    username,
    session,
    backupCreated: backupStatus.created
  }))
}
