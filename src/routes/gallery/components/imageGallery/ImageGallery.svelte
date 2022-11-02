<script lang="ts">
  import { onDestroy } from 'svelte'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { AREAS, galleryStore } from '$routes/gallery/stores'
  import { getImagesFromWNFS, type Image } from '$routes/gallery/lib/gallery'
  import FileUploadCard from '$routes/gallery/components/upload/FileUploadCard.svelte'
  import ImageCard from '$routes/gallery/components/imageGallery/ImageCard.svelte'
  import ImageModal from '$routes/gallery/components/imageGallery/ImageModal.svelte'

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
  const unsubscribeGalleryStore = galleryStore.subscribe(async updatedStore => {
    // Get initial selectedArea
    if (!selectedArea) {
      selectedArea = updatedStore.selectedArea
    }

    if (selectedArea !== updatedStore.selectedArea) {
      selectedArea = updatedStore.selectedArea
      await getImagesFromWNFS()
    }
  })

  // Once the user has been authed, fetch the images from their file system
  let imagesFetched = false
  const unsubscribeSessionStore = sessionStore.subscribe((newState) => {
    if (newState.authed && $filesystemStore && !imagesFetched) {
      imagesFetched = true
      // Get images from the user's public WNFS
      getImagesFromWNFS()
    }
  })

  onDestroy(() => {
    unsubscribeGalleryStore()
    unsubscribeSessionStore()
  })
</script>

<section class="overflow-hidden text-gray-700">
  <div class="pt-8 p-6 md:p-8 mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:lg:grid-cols-6 gap-4"
    >
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
