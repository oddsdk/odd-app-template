<script lang="ts">
  import { galleryStore } from '../../stores'
  import { getImagesFromWNFS } from '$lib/gallery'
  import ImageOptionsDropdown from '$components/gallery/ImageOptionsDropdown.svelte'

  // Get images from the user's public WNFS
  getImagesFromWNFS()
</script>

{#if $galleryStore.loading}
  <div class="flex justify-center items-center">
    <div
      class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 rounded-full"
    />
  </div>
{:else}
  <section class="overflow-hidden text-gray-700 ">
    <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
      <div class="flex flex-wrap -m-1 md:-m-2">
        {#each $galleryStore.publicImages as { name, src }}
          <div class="flex flex-wrap w-1/3">
            <div class="relative group w-full p-1 md:p-2">
              <div
                class="block absolute top-1 right-1 bottom-1 left-1 md:top-2 md:right-2 md:bottom-2 md:left-2 rounded-lg bg-[#00000060] opacity-0 group-hover:opacity-100 transition-opacity ease-in"
              >
                <ImageOptionsDropdown fileName={name} />
              </div>
              <img
                class="block object-cover object-center w-full h-full rounded-lg"
                alt={`Gallery Image: ${name}`}
                {src}
              />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}
