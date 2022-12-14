import { get as getStore } from 'svelte/store'
import * as wn from 'webnative'
import { retrieve } from 'webnative/common/root-key'
import * as uint8arrays from 'uint8arrays'
import type { CID } from 'multiformats/cid'
import type { PuttableUnixTree, File as WNFile } from 'webnative/fs/types'
import type { Metadata } from 'webnative/fs/metadata'

import { accountSettingsStore, filesystemStore, sessionStore } from '$src/stores'
import { addNotification } from '$lib/notifications'
import { fileToUint8Array } from './utils'

export type Avatar = {
  cid: string
  ctime: number
  name: string
  size?: number
  src: string
}

export type AccountSettings = {
  avatar: Avatar
  loading: boolean
}
interface AvatarFile extends PuttableUnixTree, WNFile {
  cid: CID
  content: Uint8Array
  header: {
    content: Uint8Array
    metadata: Metadata
  }
}

export const ACCOUNT_SETTINGS_DIR = [ 'private', 'settings' ]
const AVATAR_DIR = [ ...ACCOUNT_SETTINGS_DIR, 'avatars' ]
const AVATAR_ARCHIVE_DIR = [ ...AVATAR_DIR, 'archive' ]
const AVATAR_FILE_NAME = 'avatar'
const FILE_SIZE_LIMIT = 20

/**
 * Move old avatar to the archive directory
 */
const archiveOldAvatar = async (): Promise<void> => {
  const fs = getStore(filesystemStore)

  // Return if user has not uploaded an avatar yet
  const avatarDirExists = await fs.exists(wn.path.file(...AVATAR_DIR))
  if (!avatarDirExists) {
    return
  }

  // Find the filename of the old avatar
  const path = wn.path.directory(...AVATAR_DIR)
  const links = await fs.ls(path)
  const oldAvatarFileName = Object.keys(links).find(key =>
    key.includes(AVATAR_FILE_NAME)
  )
  const oldFileNameArray = oldAvatarFileName.split('.')[ 0 ]
  const archiveFileName = `${oldFileNameArray[ 0 ]}-${Date.now()}.${oldFileNameArray[ 1 ]
    }`

  // Move old avatar to archive dir
  const fromPath = wn.path.file(...AVATAR_DIR, oldAvatarFileName)
  const toPath = wn.path.file(...AVATAR_ARCHIVE_DIR, archiveFileName)
  await fs.mv(fromPath, toPath)

  // Announce the changes to the server
  await fs.publish()
}

/**
 * Get the Avatar from the user's WNFS and construct its `src`
 */
export const getAvatarFromWNFS = async (): Promise<void> => {
  try {
    // Set loading: true on the accountSettingsStore
    accountSettingsStore.update(store => ({ ...store, loading: true }))

    const fs = getStore(filesystemStore)

    // If the avatar dir doesn't exist, silently fail and let the UI handle it
    const avatarDirExists = await fs.exists(wn.path.file(...AVATAR_DIR))
    if (!avatarDirExists) {
      accountSettingsStore.update(store => ({
        ...store,
        loading: false
      }))
      return
    }

    // Find the file that matches the AVATAR_FILE_NAME
    const path = wn.path.directory(...AVATAR_DIR)
    const links = await fs.ls(path)
    const avatarName = Object.keys(links).find(key =>
      key.includes(AVATAR_FILE_NAME)
    )

    // If user has not uploaded an avatar, silently fail and let the UI handle it
    if (!avatarName) {
      accountSettingsStore.update(store => ({
        ...store,
        loading: false
      }))
      return
    }

    const file = await fs.get(wn.path.file(...AVATAR_DIR, `${avatarName}`))

    // The CID for private files is currently located in `file.header.content`
    const cid = (file as AvatarFile).header.content.toString()

    // Create a base64 string to use as the image `src`
    const src = `data:image/jpeg;base64, ${uint8arrays.toString(
      (file as AvatarFile).content,
      'base64'
    )}`

    const avatar = {
      cid,
      ctime: (file as AvatarFile).header.metadata.unixMeta.ctime,
      name: avatarName,
      src
    }

    // Push images to the accountSettingsStore
    accountSettingsStore.update(store => ({
      ...store,
      avatar,
      loading: false
    }))
  } catch (error) {
    console.error(error)
    accountSettingsStore.update(store => ({
      ...store,
      avatar: null,
      loading: false
    }))
  }
}

/**
 * Upload an avatar image to the user's private WNFS
 * @param image
 */
export const uploadAvatarToWNFS = async (image: File): Promise<void> => {
  try {
    // Set loading: true on the accountSettingsStore
    accountSettingsStore.update(store => ({ ...store, loading: true }))

    const fs = getStore(filesystemStore)

    // Reject files over 20MB
    const imageSizeInMB = image.size / (1024 * 1024)
    if (imageSizeInMB > FILE_SIZE_LIMIT) {
      throw new Error('Image can be no larger than 20MB')
    }

    // Archive old avatar
    await archiveOldAvatar()

    // Rename the file to `avatar.[extension]`
    const updatedImage = new File(
      [ image ],
      `${AVATAR_FILE_NAME}.${image.name.split('.')[ 1 ]}`,
      {
        type: image.type
      }
    )

    // Create a sub directory and add the avatar
    await fs.write(
      wn.path.file(...AVATAR_DIR, updatedImage.name),
      await fileToUint8Array(updatedImage)
    )

    // Announce the changes to the server
    await fs.publish()

    addNotification(`Your avatar has been updated!`, 'success')
  } catch (error) {
    addNotification(error.message, 'error')
    console.error(error)
  }
}

export const generateRecoveryKit = async (): Promise<string> => {
  const {
    program: {
      components: { crypto, reference }
    },
    username: {
      full,
      hashed,
      trimmed,
    }
  } = getStore(sessionStore)

  // Get the user's read-key and base64 encode it
  const accountDID = await reference.didRoot.lookup(hashed)
  const readKey = await retrieve({ crypto, accountDID })
  const encodedReadKey = uint8arrays.toString(readKey, 'base64pad')

  // Get today's date to display in the kit
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const date = new Date()

  const content = `#     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
# @@@@@%     %@@@@@@%         %@@@@@@@%     %@@@@@
# @@@@@       @@@@@%            @@@@@@       @@@@@
# @@@@@%      @@@@@             %@@@@@      %@@@@@
# @@@@@@%     @@@@@     %@@%     @@@@@     %@@@@@@
# @@@@@@@     @@@@@    %@@@@%    @@@@@     @@@@@@@
# @@@@@@@     @@@@%    @@@@@@    @@@@@     @@@@@@@
# @@@@@@@    %@@@@     @@@@@@    @@@@@%    @@@@@@@
# @@@@@@@    @@@@@     @@@@@@    %@@@@@    @@@@@@@
# @@@@@@@    @@@@@@@@@@@@@@@@     @@@@@    @@@@@@@
# @@@@@@@    %@@@@@@@@@@@@@@@     @@@@%    @@@@@@@
# @@@@@@@     %@@%     @@@@@@     %@@%     @@@@@@@
# @@@@@@@              @@@@@@              @@@@@@@
# @@@@@@@%            %@@@@@@%            %@@@@@@@
# @@@@@@@@@%        %@@@@@@@@@@%        %@@@@@@@@@
# %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
#     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%
#
# This is your recovery kit. (It’s a yaml text file)
#
# Created for ${trimmed} on ${date.toLocaleDateString('en-US', options)}
#
# Store this somewhere safe.
#
# Anyone with this file will have read access to your private files.
# Losing it means you won’t be able to recover your account
# in case you lose access to all your linked devices.
#
# Our team will never ask you to share this file.
#
# To use this file, go to ${window.location.origin}/recover/
# Learn how to customize this kit for your users: https://guide.fission.codes/

username: ${full}
key: ${encodedReadKey}`

  return content
}
