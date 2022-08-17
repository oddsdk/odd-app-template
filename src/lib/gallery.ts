import { get as getStore } from 'svelte/store'
import * as wn from 'webnative'
import { filesystemStore } from '../stores'

/**
 * Upload an image to either the user's public or private WNFS
 * @param image
 */
const uploadImageToWNFS: (
  image: File
) => Promise<void> = async image => {
  try {
    const fs = getStore(filesystemStore)

    const imageExists = await fs.exists(
      wn.path.file('public', 'gallery', image.name)
    )

    if (!imageExists) {
      // Create a sub directory and add some content
      await fs.write(wn.path.file('public', 'gallery', image.name), image)

      // Announce the changes to the server
      await fs.publish()
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Process files being dropped in the drop zone and ensure they are images
 * @param event
 */
export const handleDrop: (event: DragEvent) => Promise<void> = async event => {
  // Prevent default behavior (Prevent file from being opened)
  event.preventDefault()

  console.log(
    `${event.dataTransfer.items.length} file${
      event.dataTransfer.items.length > 1 ? 's' : ''
    } dropped`
  )

  // Use DataTransferItemList interface to access the file(s)
  // NOTE: DataTransfer.items is suppported by every browser except IE ¯\_(ツ)_/¯
  for (let i = 0; i < event.dataTransfer.items.length; i++) {
    if (event.dataTransfer.items[i].kind === 'file') {
      const file: File = event.dataTransfer.items[i].getAsFile()

      // If dropped items aren't files, reject them
      if (!file.type.match('image/*')) {
        console.error('Please upload images only')
      } else {
        console.log(`file[${i}].name = ${file.name}`)
        await uploadImageToWNFS(file)
      }
    }
  }
}

/**
 * This is needed to prevent the default behaviour of the file opening in browser
 * when it is dropped
 * @param event
 */
export const handleDragOver: (event: DragEvent) => void = event => {
  event.preventDefault()
}

/**
 * Handle uploads made by interacting with the file input directly
 */
export const handleFileInput: (files: FileList) => Promise<void> = async files => {
  await Promise.all(
    Array.from(files).map(async file => {
      await uploadImageToWNFS(file)
    })
  )
}
