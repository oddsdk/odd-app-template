<script lang="ts">
  import { galleryStore, sessionStore } from '../stores'
  import Dropzone from '$components/gallery/upload/Dropzone.svelte'
  import ImageGallery from '$components/gallery/imageGallery/ImageGallery.svelte'
  import { AREAS } from '$lib/gallery'

  /**
   * Tab between the public/private areas and load associated images
   * @param area
   */
  const handleChangeTab: (area: AREAS) => void = area =>
    galleryStore.update(store => ({
      ...store,
      selectedArea: area
    }))
</script>

<div class="p-2 text-center">
  {#if $sessionStore.authed}
    <div class="flex mb-4">
      <div class="tabs tabs-boxed w-fit">
        {#each Object.keys(AREAS) as area}
          <button
            on:click={() => handleChangeTab(AREAS[area])}
            class="tab {$galleryStore.selectedArea === AREAS[area]
              ? 'tab-active'
              : 'hover:text-primary'} ease-in"
          >
            {AREAS[area]} WNFS
          </button>
        {/each}
      </div>
    </div>

    <Dropzone>
      <ImageGallery />
    </Dropzone>
  {/if}
</div>
