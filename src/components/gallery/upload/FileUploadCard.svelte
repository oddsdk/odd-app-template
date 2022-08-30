<script lang="ts">
  import { galleryStore } from '../../../stores'
  import { handleFileInput } from '$lib/gallery'
  import FileUploadIcon from '$components/icons/FileUploadIcon.svelte'
  import LoadingSpinner from '$components/common/LoadingSpinner.svelte'

  // Handle files uploaded directly through the file input
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }
</script>

<div class="flex flex-wrap w-1/2 sm:w-1/4 lg:w-1/6">
  <label
    for="upload-file"
    class="group flex flex-col justify-center items-center w-full m-2 md:m-3 object-cover rounded-lg hover:border-primary overflow-hidden text-gray-500 dark:text-gray-400 hover:text-primary transition-colors ease-in bg-base-100 border-2 box-border border-gray-300 border-dashed cursor-pointer"
  >
    {#if $galleryStore.loading}
      <div class="flex justify-center items-center p-12">
        <LoadingSpinner />
      </div>
    {:else}
      <div class="flex flex-col justify-center items-center pt-5 pb-6">
        <FileUploadIcon />
        <p class="mb-2 text-sm">
          <span class="font-semibold">Click to upload</span>
        </p>
        <p class="text-xs">SVG, PNG, JPG or GIF</p>
      </div>
      <input
        bind:files
        id="upload-file"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
      />
    {/if}
  </label>
</div>
