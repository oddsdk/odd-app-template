import * as odd from '@oddjs/odd'
import type FileSystem from '@oddjs/odd/fs/index'

export type BackupStatus = { created: boolean } | null

export const setBackupStatus = async (fs: FileSystem, status: BackupStatus): Promise<void> => {
  const backupStatusPath = odd.path.file('private', 'backup-status.json')
  await fs.write(backupStatusPath, new TextEncoder().encode(JSON.stringify(status)))
  await fs.publish()
}

export const getBackupStatus = async (fs: FileSystem): Promise<BackupStatus> => {
  const backupStatusPath = odd.path.file('private', 'backup-status.json')

  if (await fs.exists(backupStatusPath)) {
    const fileContent = await fs.read(backupStatusPath)

    try {
      return JSON.parse(
        new TextDecoder().decode(fileContent)
      ) as BackupStatus
    } catch (err) {
      console.warn(`Unable to load backup status: ${err.message || err}`)
    }

    return { created: false }
  } else {
    return { created: false }
  }
}
