import { get as getStore } from 'svelte/store'
import * as wn from 'webnative'
import { filesystemStore, galleryStore } from '../stores'

const PUBLIC_GALLERY_DIR = ['public', 'gallery']

type Image = {
  name: string
  src: string
}

export type Gallery = {
  publicImages: Image[] | null
  // privateImages: Image[] | null // TODO: handle private files
  loading: boolean
}

/**
 * Get images from the user's public WNFS and construct the `src` value for the images
 */
export const getImagesFromWNFS: () => Promise<void> = async () => {
  try {
    // Set loading: true on the galleryStore
    galleryStore.update((store) => ({ ...store, loading: true }))

    const fs = getStore(filesystemStore)

    // Set path to public gallery dir
    const publicPath = wn.path.directory(...PUBLIC_GALLERY_DIR)

    // Get list of links for files in the public gallery dir
    const publicLinks = await fs.ls(publicPath)

    console.log('publicLinks', publicLinks)

    const images = Object.keys(publicLinks).map(name => ({
      name,
      src: `https://ipfs.io/ipfs/${publicLinks[
        name
      ]?.cid?.toString()}/userland`
    }))

    // Push images to the galleryStore
    galleryStore.update((store) => ({
      ...store,
      publicImages: images,
      loading: false,
    }))
  } catch (error) {
    console.error(error)
  }
}

/**
 * Upload an image to either the user's public WNFS
 * @param image
 */
export const uploadImageToWNFS: (
  image: File
) => Promise<void> = async image => {
  try {
    const fs = getStore(filesystemStore)

    // Check if image already exists in the public gallery dir
    const imageExists = await fs.exists(
      wn.path.file(...PUBLIC_GALLERY_DIR, image.name)
    )

    if (!imageExists) {
      // Create a sub directory and add some content
      await fs.write(wn.path.file(...PUBLIC_GALLERY_DIR, image.name), image)

      // Announce the changes to the server
      await fs.publish()

      console.log(`${image.name} image has been published`)
    } else {
      throw new Error(`${image.name} image alread exists`)
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Delete an image from the user's public WNFS
 * @param name
 */
export const deleteImageFromWNFS: (name: string) => Promise<void> = async (name) => {
  try {
    const fs = getStore(filesystemStore)

    const imageExists = await fs.exists(
      wn.path.file(...PUBLIC_GALLERY_DIR, name)
    )

    if (imageExists) {
      // Remove images from server
      await fs.rm(wn.path.file(...PUBLIC_GALLERY_DIR, name))

      // Announce the changes to the server
      await fs.publish()

      console.log(`${name} image has been deleted`)

      // Refetch images and update galleryStore
      await getImagesFromWNFS()
    } else {
      throw new Error(`${name} image has already been deleted`)
    }
  } catch (error) {
    console.error(error)
  }
}
