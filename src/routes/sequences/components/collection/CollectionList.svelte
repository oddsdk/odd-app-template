<script lang="ts">
  import type { Sequence } from '$routes/sequences/lib/sequences'
  import CollectionCard from '$routes/sequences/components/collection/CollectionCard.svelte'

  export let sequences: Sequence[]
</script>

<div class="grid grid-flow-row grid-rows-min gap-3">
  {#each sequences as sequence}
    <CollectionCard {sequence} on:copycid on:openlink />
  {/each}
</div>
