<script lang="ts">
  import type { Image } from '$lib/gallery'
  // import { galleryStore } from '../../../stores'
  // import ImageSlider from '$components/gallery/imageGallery/ImageSlider.svelte'

  export let image: Image
  const { id, name, src } = image
</script>

<label
  for={`image-modal-${id}`}
  class="absolute top-0 right-0 bottom-0 left-0 z-10 modal-button cursor-pointer"
/>

<input type="checkbox" id={`image-modal-${id}`} class="modal-toggle" />
<label for={`image-modal-${id}`} class="modal cursor-pointer z-50">
  <div class="modal-box relative text-center">
    <label
      for={`image-modal-${id}`}
      class="btn btn-xs btn-circle absolute right-2 top-2"
    >
      ✕
    </label>
    <!-- <ImageSlider images={$galleryStore.publicImages} /> -->
    <div>
      <h3 class="mb-7 text-xl font-serif">{name}</h3>
      <img
        class="block object-cover object-center w-full h-full mb-4"
        alt={`Image: ${name}`}
        {src}
      />
      <div class="">
        <a href={src} target="_blank" class="underline">View on IPFS</a>
      </div>
    </div>
  </div>
</label>
