<script lang="ts">
  import type { Sequence } from '$routes/sequences/lib/sequences'
  import SearchCard from '$routes/sequences/components/search/SearchCard.svelte'

  export let sequences: Sequence[]
</script>

<div class="grid grid-flow-row grid-rows-min gap-3">
  {#each sequences as sequence}
    <SearchCard {sequence} on:save />
  {/each}
</div>
