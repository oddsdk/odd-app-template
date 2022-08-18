<script lang="ts">
  import ImageModal from '$components/gallery/imageGallery/ImageModal.svelte'
  import ImageOptionsDropdown from '$components/gallery/imageGallery/ImageOptionsDropdown.svelte'
  import type { Image } from '$lib/gallery'

  export let image: Image
  const { name, src } = image
</script>

<div class="flex flex-wrap w-1/4">
  <div class="relative group w-full p-1 md:p-2">
    <div
      class="flex items-center justify-center absolute top-1 right-1 bottom-1 left-1 md:top-2 md:right-2 md:bottom-2 md:left-2 rounded-lg bg-[#00000060] opacity-0 group-hover:opacity-100 transition-opacity ease-in"
    >
      <ImageOptionsDropdown fileName={name} />
      <ImageModal {image} />
    </div>
    <img
      class="block object-cover object-center w-full h-full rounded-lg"
      alt={`Gallery Image: ${name}`}
      {src}
    />
  </div>
</div>
