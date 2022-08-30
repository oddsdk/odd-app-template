<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { galleryStore } from '../../../stores'
  import type { Gallery, Image } from '$lib/gallery'
  import { deleteImageFromWNFS } from '$lib/gallery'

  export let image: Image
  export let isModalOpen: boolean = false
  let previousImage: Image | undefined
  let nextImage: Image | undefined
  let showPreviousArrow: boolean
  let showNextArrow: boolean
  let gallery: Gallery

  const dispatch = createEventDispatcher()

  const unsubcribe = galleryStore.subscribe(newState => (gallery = newState))

  /**
   * Close the modal, clear the image state vars, set `isModalOpen` to false
   * and dispatch the close event to clear the image from the parent's state
   */
  const handleCloseModal: () => void = () => {
    image = null
    previousImage = null
    nextImage = null
    isModalOpen = false
    dispatch('close')
  }

  /**
   * Delete an image from the user's WNFS
   */
  const handleDeleteImage: () => Promise<void> = async () => {
    await deleteImageFromWNFS(image.name)
    handleCloseModal()
  }

  /**
   * Set the previous and next images to be toggled to when the arrows are clicked
   */
  const setCarouselState = () => {
    const imageList = image.private
      ? gallery.privateImages
      : gallery.publicImages
    const currentIndex = imageList.findIndex(val => val.cid === image.cid)
    previousImage =
      imageList[currentIndex - 1] ?? imageList[imageList.length - 1]
    nextImage = imageList[currentIndex + 1] ?? imageList[0]

    showPreviousArrow = imageList.length > 1 && !!previousImage
    showNextArrow = imageList.length > 1 && !!nextImage
  }

  /**
   * Load the correct image when a user clicks the Next or Previous arrows
   * @param direction
   */
  const handleNextOrPrevImage: (
    direction: 'next' | 'prev'
  ) => void = direction => {
    image = direction === 'prev' ? previousImage : nextImage
    setCarouselState()
  }

  /**
   * Detect `Escape` key presses to close the modal or `ArrowRight`/`ArrowLeft`
   * presses to navigate the carousel
   * @param event
   */
  const handleKeyDown: (event: KeyboardEvent) => void = event => {
    if (event.key === 'Escape') handleCloseModal()

    if (showNextArrow && event.key === 'ArrowRight')
      handleNextOrPrevImage('next')

    if (showPreviousArrow && event.key === 'ArrowLeft')
      handleNextOrPrevImage('prev')
  }

  onMount(() => {
    setCarouselState()
  })

  // Unsubscribe from galleryStore updates
  onDestroy(unsubcribe)
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if !!image}
  <!-- bind:checked can't be set to !!image, so we need to set it to a boolean(casting image as a boolean throws a svelte error, so we're using isModalOpen) -->
  <input
    type="checkbox"
    id={`image-modal-${image.cid}`}
    class="modal-toggle"
    bind:checked={isModalOpen}
  />
  <label
    for={`image-modal-${image.cid}`}
    class="modal cursor-pointer z-50"
    on:click|self={handleCloseModal}
  >
    <div
      class="modal-box relative text-center text-base-content border dark:border-slate-600"
    >
      <label
        for={`image-modal-${image.cid}`}
        class="btn btn-xs btn-circle absolute right-2 top-2 dark:bg-slate-600"
        on:click={handleCloseModal}
      >
        ✕
      </label>
      <div>
        <h3 class="mb-7 text-xl font-serif">{image.name}</h3>

        <div class="relative">
          {#if showPreviousArrow}
            <button
              class="absolute top-1/2 -left-[25px] -translate-y-1/2 inline-block text-center text-[40px]"
              on:click={() => handleNextOrPrevImage('prev')}
            >
              &#8249;
            </button>
          {/if}
          <img
            class="block object-cover object-center w-full h-full mb-4"
            alt={`Image: ${image.name}`}
            src={image.src}
          />
          {#if showNextArrow}
            <button
              class="absolute top-1/2 -right-[25px] -translate-y-1/2 inline-block text-center text-[40px]"
              on:click={() => handleNextOrPrevImage('next')}
            >
              &#8250;
            </button>
          {/if}
        </div>
        <div class="flex flex-col items-center justify-center">
          <a
            href={`https://ipfs.runfission.net/ipfs/${image.cid}/userland`}
            target="_blank"
            class="underline mb-4 hover:text-slate-500"
          >
            View on IPFS
          </a>
          <p class="mb-4">
            Created at {new Date(image.ctime).toDateString()}
          </p>
          <div class="flex items-center justify-between gap-4">
            <a href={image.src} download={image.name} class="btn btn-primary">
              Download Image
            </a>
            <button
              class="btn bg-error text-white"
              on:click={handleDeleteImage}
            >
              Delete Image
            </button>
          </div>
        </div>
      </div>
    </div>
  </label>
{/if}
