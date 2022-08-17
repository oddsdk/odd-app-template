<script lang="ts">
  import type { Image } from '$lib/gallery'

  export let image: Image
  const { cid, name, src } = image
</script>

<label for={`image-modal-${cid}`} class="btn modal-button">View</label>

<input type="checkbox" id={`image-modal-${cid}`} class="modal-toggle" />
<label for={`image-modal-${cid}`} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <img
      class="block object-cover object-center w-full h-full"
      alt={`Image: ${name}`}
      {src}
    />
  </label>
</label>
