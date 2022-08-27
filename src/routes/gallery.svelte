<script lang="ts">
  import { onDestroy } from 'svelte'
  import { goto } from '$app/navigation'
  import { galleryStore, sessionStore, theme as themeStore } from '../stores'
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

  // If the user is not authed redirect them to the home page
  const unsubscribe = sessionStore.subscribe(newState => {
    if (!newState.loading && !newState.authed) {
      goto('/')
    }
  })

  onDestroy(unsubscribe)
</script>

<div class="p-2 text-center">
  {#if $sessionStore.authed}
    <div class="flex mb-4">
      <div
        class="tabs tabs-boxed w-fit border {$themeStore === 'light'
          ? 'button-transparent'
          : 'border-primary'}"
      >
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
