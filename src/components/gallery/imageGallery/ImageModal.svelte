<script lang="ts">
  import type { Image } from '$lib/gallery'

  export let image: Image
  const { cid, name, src } = image
</script>

<label
  for={`image-modal-${cid}`}
  class="absolute top-0 right-0 bottom-0 left-0 z-10 modal-button cursor-pointer"
/>

<input type="checkbox" id={`image-modal-${cid}`} class="modal-toggle" />
<label for={`image-modal-${cid}`} class="modal cursor-pointer">
  <div class="modal-box relative text-center">
    <label
      for={`image-modal-${cid}`}
      class="btn btn-xs btn-circle absolute right-2 top-2"
    >
      ✕
    </label>

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
