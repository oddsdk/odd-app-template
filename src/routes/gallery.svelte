<script lang="ts">
  import { sessionStore } from '../stores'
  import Dropzone from '$components/gallery/upload/Dropzone.svelte'
  import ImageGallery from '$components/gallery/imageGallery/ImageGallery.svelte'
</script>

<div class="p-2 text-center">
  <h1 class="mb-10">Gallery</h1>

  {#if $sessionStore.authed}
    <Dropzone>
      <ImageGallery />
    </Dropzone>
  {/if}
</div>
