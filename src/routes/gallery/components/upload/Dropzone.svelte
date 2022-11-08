<script lang="ts">
  import {
    getImagesFromWNFS,
    uploadImageToWNFS
  } from '$routes/gallery/lib/gallery'
  import { addNotification } from '$lib/notifications'

  /**
   * Detect when a user drags a file in or out of the dropzone to change the styles
   */
  let isDragging = false
  const handleDragEnter: () => void = () => (isDragging = true)
  const handleDragLeave: () => void = () => (isDragging = false)

  /**
   * Process files being dropped in the drop zone and ensure they are images
   * @param event
   */
  const handleDrop: (event: DragEvent) => Promise<void> = async event => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault()

    const files = Array.from(event.dataTransfer.items)

    // Iterate over the dropped files and upload them to WNFS
    await Promise.all(
      files.map(async item => {
        if (item.kind === 'file') {
          const file: File = item.getAsFile()

          // If the dropped files aren't images, we don't want them!
          if (!file.type.match('image/*')) {
            addNotification('Please upload images only', 'error')
            console.error('Please upload images only')
          } else {
            await uploadImageToWNFS(file)
          }
        }
      })
    )

    // Refetch images and update galleryStore
    await getImagesFromWNFS()

    // Disable isDragging state
    isDragging = false
  }

  /**
   * This is needed to prevent the default behaviour of the file opening in browser
   * when it is dropped
   * @param event
   */
  const handleDragOver: (event: DragEvent) => void = event =>
    event.preventDefault()
</script>

<label
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  on:dragenter={handleDragEnter}
  on:dragleave={handleDragLeave}
  for="dropzone-file"
  class="block w-full min-h-[calc(100vh-190px)] rounded-lg border-2 border-solid border-base-content transition ease-in cursor-pointer {isDragging
    ? 'border-dashed !border-orange-700 bg-orange-50'
    : ''}"
>
  <slot />
</label>
