<script lang="ts">
  import ImageModal from '$components/gallery/imageGallery/ImageModal.svelte'
  import ImageOptionsDropdown from '$components/gallery/imageGallery/ImageOptionsDropdown.svelte'
  import type { Image } from '$lib/gallery'

  export let image: Image
  const { name, src } = image
</script>

<div class="flex flex-wrap w-1/6">
  <div
    class="relative group w-full m-1 md:m-2 rounded-lg border-4 border-transparent hover:border-primary overflow-hidden transition-colors ease-in"
  >
    <div
      class="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-[#00000035] opacity-0 group-hover:opacity-100 transition-opacity ease-in"
    >
      <ImageOptionsDropdown fileName={name} />
      <ImageModal {image} />
    </div>
    <img
      class="block object-cover object-center w-full h-full"
      alt={`Gallery Image: ${name}`}
      {src}
    />
  </div>
</div>
