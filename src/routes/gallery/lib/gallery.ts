import { get as getStore } from 'svelte/store'
import * as wn from 'webnative'
import { partition } from 'webnative/fs/index'

import { filesystemStore } from '$src/stores'
import { AREAS, galleryStore } from '$routes/gallery/stores'
import { addNotification } from '$lib/notifications'
import { fileToUint8Array } from '$lib/utils'

export type Image = {
  cid: string
  ctime: number
  name: string
  private: boolean
  size: number
  src: string
}

export type Gallery = {
  publicImages: Image[] | null
  privateImages: Image[] | null
  selectedArea: AREAS
  loading: boolean
}

type Link = {
  size: number
}

export const GALLERY_DIRS = {
  [ AREAS.PUBLIC ]: wn.path.directory('public', 'gallery'),
  [ AREAS.PRIVATE ]: wn.path.directory('private', 'gallery')
}
const FILE_SIZE_LIMIT = 20

/**
 * Get images from the user's WNFS and construct the `src` value for the images
 */
export const getImagesFromWNFS: () => Promise<void> = async () => {
  try {
    // Set loading: true on the galleryStore
    galleryStore.update(store => ({ ...store, loading: true }))

    const { selectedArea } = getStore(galleryStore)
    const isPrivate = selectedArea === AREAS.PRIVATE
    const fs = getStore(filesystemStore)

    // Set path to either private or public gallery dir
    const path = GALLERY_DIRS[ selectedArea ]

    // Get list of links for files in the gallery dir
    const items = await fs.exists(path)
      ? await fs.ls(path, { withItemKind: true })
      : []

    let images = await Promise.all(
      items.map(async ({ metadata, name, path }) => {
        if (!wn.path.isFile(path)) return null

        // TODO: `cid` var should be renamed or removed for the private side.
        // let cid

        // const part = partition(path)
        // switch (part.name) {
        //   case "private": cid = await fs.capsuleRef(part.path); break;
        //   case "public": cid = await fs.contentCID(part.path); break;
        // }

        // Create a blob to use as the image `src`
        const blob = new Blob([ await fs.read(path, "bytes") ])
        const src = URL.createObjectURL(blob)

        const ctime = metadata.created

        return {
          cid: null,
          ctime,
          name,
          private: isPrivate,
          size: 0, // TODO: No size calculation in rs-wnfs/webnative yet
          src
        }
      })
    )

    // Sort images by ctime(created at date)
    // NOTE: this will eventually be controlled via the UI
    images = images.filter(a => !!a)
    images.sort((a, b) => b.ctime - a.ctime)

    // Push images to the galleryStore
    galleryStore.update(store => ({
      ...store,
      ...(isPrivate
        ? {
          privateImages: images
        }
        : {
          publicImages: images
        }),
      loading: false
    }))
  } catch (error) {
    console.error(error)
    galleryStore.update(store => ({
      ...store,
      loading: false
    }))
  }
}

/**
 * Upload an image to the user's private or public WNFS
 * @param image
 */
export const uploadImageToWNFS: (
  image: File
) => Promise<void> = async image => {
  try {
    const { selectedArea } = getStore(galleryStore)
    const fs = getStore(filesystemStore)

    // Reject files over 20MB
    const imageSizeInMB = image.size / (1024 * 1024)
    if (imageSizeInMB > FILE_SIZE_LIMIT) {
      throw new Error('Image can be no larger than 20MB')
    }

    // Reject the upload if the image already exists in the directory
    const imageExists = await fs.exists(
      wn.path.combine(GALLERY_DIRS[ selectedArea ], wn.path.file(image.name))
    )
    if (imageExists) {
      throw new Error(`${image.name} image already exists`)
    }

    // Create a sub directory and add some content
    await fs.mkdir(GALLERY_DIRS[ selectedArea ])
    await fs.write(
      wn.path.combine(GALLERY_DIRS[ selectedArea ], wn.path.file(image.name)),
      "bytes",
      await fileToUint8Array(image)
    )

    addNotification(`${image.name} image has been published`, 'success')
  } catch (error) {
    addNotification(error.message, 'error')
    console.error(error)
  }
}

/**
 * Delete an image from the user's private or public WNFS
 * @param name
 */
export const deleteImageFromWNFS: (
  name: string
) => Promise<void> = async name => {
  try {
    const { selectedArea } = getStore(galleryStore)
    const fs = getStore(filesystemStore)

    const imageExists = await fs.exists(
      wn.path.combine(GALLERY_DIRS[ selectedArea ], wn.path.file(name))
    )

    if (imageExists) {
      // Remove images from server
      await fs.rm(wn.path.combine(GALLERY_DIRS[ selectedArea ], wn.path.file(name)))

      // Announce the changes to the server
      await fs.publish()

      addNotification(`${name} image has been deleted`, 'success')

      // Refetch images and update galleryStore
      await getImagesFromWNFS()
    } else {
      throw new Error(`${name} image has already been deleted`)
    }
  } catch (error) {
    addNotification(error.message, 'error')
    console.error(error)
  }
}

/**
 * Handle uploads made by interacting with the file input directly
 */
export const handleFileInput: (
  files: FileList
) => Promise<void> = async files => {
  await Promise.all(
    Array.from(files).map(async file => {
      await uploadImageToWNFS(file)
    })
  )

  // Refetch images and update galleryStore
  await getImagesFromWNFS()
}
