<script lang="ts">
  import { galleryStore } from '../../../stores'
  import { getImagesFromWNFS } from '$lib/gallery'
  import ImageCard from '$components/gallery/imageGallery/ImageCard.svelte'

  // Get images from the user's public WNFS
  getImagesFromWNFS()
</script>

{#if $galleryStore.loading}
  <div class="flex justify-center items-center">
    <div
      class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 rounded-full"
    />
  </div>
{:else}
  <section class="overflow-hidden text-gray-700 ">
    <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
      <div class="flex flex-wrap -m-1 md:-m-2">
        {#each $galleryStore.publicImages as image}
          <ImageCard {image} />
        {/each}
      </div>
    </div>
  </section>
{/if}
