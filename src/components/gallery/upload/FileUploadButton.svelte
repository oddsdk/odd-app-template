<script lang="ts">
  import { handleFileInput } from '$lib/gallery'
  import FileUploadIcon from '$components/icons/FileUploadIcon.svelte'

  // Handle files uploaded directly through the file input
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }
</script>

<label
  for="upload-file-button"
  class="hidden sm:flex flex-col justify-center items-center text-gray-500 dark:text-gray-400 cursor-pointer"
>
  <span class="btn btn-primary min-h-0 h-10">
    Click to upload <FileUploadIcon classes="ml-2 w-5 h-5" />
  </span>
  <input
    bind:files
    id="upload-file-button"
    type="file"
    multiple
    accept="image/*"
    class="hidden"
  />
</label>
