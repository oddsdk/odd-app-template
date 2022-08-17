<script lang="ts">
  import { sessionStore } from '../stores'
  import FileUpload from '$components/gallery/upload/FileUpload.svelte'
  import ImageGallery from '$components/gallery/imageGallery/ImageGallery.svelte'
</script>

<div class="p-2 text-center">
  <h1 class="mb-10">Gallery</h1>

  {#if $sessionStore.authed}
    <FileUpload />
    <ImageGallery />
  {/if}
</div>
