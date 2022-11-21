<script lang="ts">
  import { galleryStore } from '$routes/gallery/stores'
  import { handleFileInput } from '$routes/gallery/lib/gallery'
  import FileUploadIcon from '$routes/gallery/components/icons/FileUploadIcon.svelte'

  // Handle files uploaded directly through the file input
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }
</script>

<label
  for="upload-file"
  class="group btn !p-0 !h-auto flex flex-col justify-center items-center aspect-[22/23] object-cover rounded-lg shadow-orange hover:border-neutral-500 overflow-hidden transition-colors ease-in bg-base-100 border-2 box-content border-neutral cursor-pointer text-neutral-900 bg-gradient-to-r from-orange-300 to-orange-600"
>
  {#if $galleryStore.loading}
    <div class="flex justify-center items-center p-12">
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-t-orange-500 border-neutral-900 h-16 w-16 animate-spin"
      />
    </div>
  {:else}
    <div class="flex flex-col justify-center items-center pt-5 pb-6">
      <FileUploadIcon />
      <p class="mt-4 mb-2 text-sm">
        <span class="font-bold text-sm">Upload a photo</span>
      </p>
      <p class="text-xxs">SVG, PNG, JPG or GIF</p>
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
