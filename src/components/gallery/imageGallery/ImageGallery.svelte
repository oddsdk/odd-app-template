<script lang="ts">
  import { onDestroy } from 'svelte'
  import { get as getStore } from 'svelte/store'
  import { galleryStore } from '../../../stores'
  import { AREAS, getImagesFromWNFS } from '$lib/gallery'
  import FileUploadCard from '$components/gallery/upload/FileUploadCard.svelte'
  import ImageCard from '$components/gallery/imageGallery/ImageCard.svelte'

  // Get images from the user's public WNFS
  getImagesFromWNFS()

  // Get initial selectedArea
  let selectedArea = getStore(galleryStore).selectedArea

  // If galleryStore.selectedArea changes from private to public, re-run getImagesFromWNFS
  const unsubscribe = galleryStore.subscribe(async updatedStore => {
    if (selectedArea !== updatedStore.selectedArea) {
      selectedArea = updatedStore.selectedArea
      await getImagesFromWNFS()
    }
  })

  onDestroy(unsubscribe)
</script>

<section class="overflow-hidden text-gray-700">
  <div class="p-4 mx-auto">
    <div class="flex flex-wrap -m-1 md:-m-2">
      <FileUploadCard />
      {#each $galleryStore.selectedArea === AREAS.PRIVATE ? $galleryStore.privateImages : $galleryStore.publicImages as image}
        <ImageCard {image} />
      {/each}
    </div>
  </div>
</section>
