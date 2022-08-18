<script lang="ts">
  import { galleryStore } from '../../../stores'
  import { getImagesFromWNFS } from '$lib/gallery'
  import FileUploadCard from '$components/gallery/upload/FileUploadCard.svelte'
  import ImageCard from '$components/gallery/imageGallery/ImageCard.svelte'
  import LoadingSpinner from '$components/common/LoadingSpinner.svelte'

  // Get images from the user's public WNFS
  getImagesFromWNFS()
</script>

{#if $galleryStore.loading}
  <div class="flex justify-center items-center p-12">
    <LoadingSpinner />
  </div>
{:else}
  <section class="overflow-hidden text-gray-700 ">
    <div class="p-4 mx-auto">
      <div class="flex flex-wrap -m-1 md:-m-2">
        {#each $galleryStore.publicImages as image}
          <ImageCard {image} />
        {/each}
        <FileUploadCard />
      </div>
    </div>
  </section>
{/if}
