<script lang="ts">
  import { onDestroy } from 'svelte'
  import * as wn from 'webnative'
  import type FileSystem from 'webnative/fs/index'

  import { filesystemStore } from '$src/stores'
  import { AREAS } from '$routes/gallery/stores'
  import { GALLERY_DIRS } from '$routes/gallery/lib/gallery'

  let fsCheckCompleted = false

  /**
   * Create additional directories and files needed by the gallery if they don't exist
   *
   * @param fs FileSystem
   */
  const initializeFilesystem = async (fs: FileSystem): Promise<void> => {
    const publicPathExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[AREAS.PUBLIC])
    )
    const privatePathExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[AREAS.PRIVATE])
    )

    if (!publicPathExists) {
      await fs.mkdir(wn.path.directory(...GALLERY_DIRS[AREAS.PUBLIC]))
    }

    if (!privatePathExists) {
      await fs.mkdir(wn.path.directory(...GALLERY_DIRS[AREAS.PRIVATE]))
    }

    fsCheckCompleted = true
  }

  const unsubscribe = filesystemStore.subscribe(async fs => {
    if (!fsCheckCompleted && !!fs) {
      await initializeFilesystem(fs)
    }
  })

  onDestroy(unsubscribe)
</script>

{#if fsCheckCompleted}
  <slot />
{/if}
