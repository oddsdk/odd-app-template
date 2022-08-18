<script lang="ts">
  import { getImagesFromWNFS, uploadImageToWNFS } from '$lib/gallery'
  import FileUploadIcon from '$components/icons/FileUploadIcon.svelte'

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

<div class="flex flex-wrap w-1/6">
  <label
    for="dropzone-file"
    class="group flex flex-col justify-center items-center w-full m-1 md:m-2 object-cover rounded-lg hover:border-primary overflow-hidden text-gray-500 dark:text-gray-400 hover:text-primary transition-colors ease-in bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer"
  >
    <div class="flex flex-col justify-center items-center pt-5 pb-6">
      <FileUploadIcon />
      <p class="mb-2 text-sm">
        <span class="font-semibold">Click to upload</span>
      </p>
      <p class="text-xs">SVG, PNG, JPG or GIF</p>
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
