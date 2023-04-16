<script lang="ts">
  import { type Area, AREAS } from './lib/sequences'

  import { sessionStore } from '$src/stores'
  import { sequencesStore } from '$routes/sequences/stores'
  import Collection from '$routes/sequences/components/Collection.svelte';
  import Container from '$routes/sequences/components/Container.svelte'
  import Search from '$routes/sequences/components/Search.svelte';

  function handleChangeTab(area: Area) {
    sequencesStore.update(store => ({
      ...store,
      selectedArea: area
    }))
  }
</script>

<div class="p-2 mb-14 text-center">
  {#if $sessionStore.session}
    <div class="flex items-center justify-center translate-y-1/2 w-fit m-auto">
      <div class="tabs border-2 overflow-hidden border-base-content rounded-lg">
        {#each AREAS as area}
          <button
            on:click={() => handleChangeTab(area)}
            class="tab h-10 font-bold text-sm ease-in {$sequencesStore.selectedArea ===
            area
              ? 'tab-active bg-base-content text-base-100'
              : 'bg-base-100 text-base-content'}"
          >
            {area}
          </button>
        {/each}
      </div>
    </div>

    <Container>
      {#if $sequencesStore.selectedArea === 'Search'}
        <Search />
      {:else if $sequencesStore.selectedArea === 'Collection'}
        <Collection />
      {/if}
    </Container>
  {/if}
</div>
