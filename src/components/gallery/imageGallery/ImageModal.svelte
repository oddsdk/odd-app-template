<script lang="ts">
  import { get as getStore } from 'svelte/store'
  import { galleryStore } from '../../../stores'
  import type { Image } from '$lib/gallery'
  import { deleteImageFromWNFS } from '$lib/gallery'

  export let image: Image
  export let isModalOpen: boolean = false
  let currentIndex: number
  let previousImage: Image | undefined
  let nextImage: Image | undefined

  /**
   * Close the modal and clear the `image` and set `isModalOpen to false
   */
  const handleCloseModal: () => void = () => {
    image = null
    isModalOpen = false
  }

  /**
   * Delete an image from the user's WNFS
   */
  const handleDeleteImage: () => Promise<void> = async () => {
    await deleteImageFromWNFS(image.name)
    handleCloseModal()
  }

  // Detect what the next or previous image is based on the index of the current image
  $: if (image) {
    const gallery = getStore(galleryStore)
    const imageList = image.private
      ? gallery.privateImages
      : gallery.publicImages
    currentIndex = imageList.findIndex(val => val.cid === image.cid)
    previousImage = imageList[currentIndex - 1]
    nextImage = imageList[currentIndex + 1]
    console.log('image', image)
    console.log('currentIndex', currentIndex)
    console.log('previousImage', previousImage)
    console.log('nextImage', nextImage)
  }

  /**
   * Load the correct image when a user clicks the Next or Previous arrows
   * @param direction
   */
  const handleNextOrPrevImage: (
    direction: 'next' | 'prev'
  ) => void = direction => {
    image = direction === 'prev' ? previousImage : nextImage
  }
</script>

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
    <div class="modal-box relative text-center">
      <label
        for={`image-modal-${image.cid}`}
        class="btn btn-xs btn-circle absolute right-2 top-2"
      >
        ✕
      </label>
      <div>
        <h3 class="mb-7 text-xl font-serif">{image.name}</h3>

        <div class="relative">
          {#if !!previousImage}
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
          {#if !!nextImage}
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
            href={`https://ipfs.io/ipfs/${image.cid}/userland`}
            target="_blank"
            class="underline mb-4"
          >
            View on IPFS
          </a>
          <p class="mb-4">
            Created at {new Date(image.ctime * 1000).toDateString()}
          </p>
          <a
            href={image.src}
            download={image.name}
            class="mb-4 btn btn-primary"
          >
            Download Image
          </a>
          <button class="btn bg-error text-white" on:click={handleDeleteImage}>
            Delete Image
          </button>
        </div>
      </div>
    </div>
  </label>
{/if}
