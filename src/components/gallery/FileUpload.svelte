<script lang="ts">
  import { handleDragOver, handleDrop, handleFileInput } from '$lib/gallery'
  import FileUploadIcon from '$components/icons/FileUploadIcon.svelte'

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
