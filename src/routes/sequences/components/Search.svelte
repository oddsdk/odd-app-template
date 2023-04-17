<script lang="ts">
  import { themeStore } from '$src/stores'
  import { getSequences, type Sequence } from '$routes/sequences/lib/sequences'
  import SequenceInput from '$routes/sequences/components/inputs/SequenceInput.svelte'
  import SearchResults from './search/SearchResults.svelte'

  let sequences: Sequence[] = []

  async function handleSequenceInput(
    event: CustomEvent<{ sequence: number[] }>
  ) {
    const { sequence } = event.detail

    console.log('sequence', sequence)

    if (sequence.length >= 3) {
      sequences = await getSequences(sequence)
    }
  }

  async function saveSequence(event: CustomEvent<{ sequence: number[] }>) {
    const { sequence } = event.detail

    // TODO Save a sequence to the file system
    // -- Write instructions --
    console.log('sequence to save', sequence)

  }
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div
    class="grid grid-flow-row grid-rows-[6rem_auto] gap-6 w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  >
    <SequenceInput on:input={handleSequenceInput} />
    {#if sequences === null}
      <div class="grid grid-flow-col items-center">
        <div class="text-lg">No matching sequences found.</div>
      </div>
    {:else if sequences.length === 0}
      <div class="grid grid-flow-col items-center">
        <div class="text-lg">Enter some integers.</div>
      </div>
    {:else}
      <SearchResults {sequences} on:save={saveSequence} />
    {/if}
  </div>
</section>
