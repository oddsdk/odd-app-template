<script lang="ts">
  import { onDestroy } from 'svelte'
  import { galleryStore } from '../../../stores'
  import { AREAS, getImagesFromWNFS } from '$lib/gallery'
  import type { Image } from '$lib/gallery'
  import FileUploadCard from '$components/gallery/upload/FileUploadCard.svelte'
  import ImageCard from '$components/gallery/imageGallery/ImageCard.svelte'
  import ImageModal from '$components/gallery/imageGallery/ImageModal.svelte'

  // Get images from the user's public WNFS
  getImagesFromWNFS()

  /**
   * Open the ImageModal and pass it the selected `image` from the gallery
   * @param image
   */
  let selectedImage: Image
  const setSelectedImage: (image: Image) => void = image =>
    (selectedImage = image)

  const clearSelectedImage = () => (selectedImage = null)

  // If galleryStore.selectedArea changes from private to public, re-run getImagesFromWNFS
  let selectedArea = null
  const unsubscribe = galleryStore.subscribe(async updatedStore => {
    // Get initial selectedArea
    if (!selectedArea) {
      selectedArea = updatedStore.selectedArea
    }

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
        <ImageCard {image} openModal={setSelectedImage} />
      {/each}
    </div>
  </div>

  {#if selectedImage}
    <ImageModal
      image={selectedImage}
      isModalOpen={!!selectedImage}
      on:close={clearSelectedImage}
    />
  {/if}
</section>
