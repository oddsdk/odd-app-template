<script lang="ts">
  import type { Image } from '$lib/gallery'

  export let image: Image
  export let openModal

  const handleOpenModal = () => openModal(image)
</script>

<div class="flex flex-wrap w-1/2 sm:w-1/4 lg:w-1/6">
  <div
    class="relative group w-full m-1 md:m-2 rounded-lg border-4 border-transparent hover:border-primary overflow-hidden transition-colors ease-in"
    on:click={handleOpenModal}
  >
    <div
      class="flex items-center justify-center absolute z-10 top-0 right-0 bottom-0 left-0 bg-[#00000035] opacity-0 group-hover:opacity-100 transition-opacity ease-in"
    />
    <div class="relative pb-[100%]">
      <img
        class="absolute block object-cover object-center w-full h-full"
        alt={`Gallery Image: ${image.name}`}
        src={image.src}
      />
    </div>
  </div>
</div>
