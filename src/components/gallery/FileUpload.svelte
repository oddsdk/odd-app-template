<script lang="ts">
  import { getImagesFromWNFS, uploadImageToWNFS } from '$lib/gallery'
  import FileUploadIcon from '$components/icons/FileUploadIcon.svelte'

  /**
   * Process files being dropped in the drop zone and ensure they are images
   * @param event
   */
  export const handleDrop: (
    event: DragEvent
  ) => Promise<void> = async event => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault()

    const files = Array.from(event.dataTransfer.items)

    console.log(`${files.length} file${files.length > 1 ? 's' : ''} dropped`)

    // Iterate over the dropped files and upload them to WNFS
    await Promise.all(
      files.map(async (item, index) => {
        if (item.kind === 'file') {
          const file: File = item.getAsFile()

          // If the dropped files aren't images, we don't want them!
          if (!file.type.match('image/*')) {
            console.error('Please upload images only')
          } else {
            console.log(`file[${index + 1}].name = ${file.name}`)
            await uploadImageToWNFS(file)
          }
        }
      })
    )

    // Refetch images and update galleryStore
    await getImagesFromWNFS()
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
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }
</script>

<div class="flex justify-center items-center w-full">
  <label
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    for="dropzone-file"
    class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
  >
    <div class="flex flex-col justify-center items-center pt-5 pb-6">
      <FileUploadIcon />
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span class="font-semibold">Click to upload</span>
        or drag and drop
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </div>
    <input
      bind:files
      id="dropzone-file"
      type="file"
      multiple
      accept="image/*"
      class="hidden"
    />
  </label>
</div>
