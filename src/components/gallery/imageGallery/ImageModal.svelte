<script lang="ts">
  import type { Image } from '$lib/gallery'
  import { deleteImageFromWNFS } from '$lib/gallery'
  // import { galleryStore } from '../../../stores'

  export let image: Image
  export let isModalOpen: boolean = false

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
        <img
          class="block object-cover object-center w-full h-full mb-4"
          alt={`Image: ${image.name}`}
          src={image.src}
        />
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
