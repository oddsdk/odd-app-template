<script lang="ts">
  import { themeStore } from '$src/stores'
  import SequenceInput from '$routes/sequences/components/inputs/SequenceInput.svelte'

  let sequenceError = false

  function handleSequenceInput(event: CustomEvent<{ sequence: number[] }>) {
    const { sequence } = event.detail

    console.log('received sequence', sequence)

    // Search for sequence and display it

    sequenceError = false
  }

  function handleSequenceError() {
    sequenceError = true
  }
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div
    class="grid grid-flow-row grid-rows-[6rem_auto] w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  >
    <SequenceInput
      on:input={handleSequenceInput}
      on:error={handleSequenceError}
    />
    {#if sequenceError}
      <div class="grid grid-flow-col items-center">
        <div class="text-lg text-red-600 dark:text-red-400">
          Integers must increase from left to right.
        </div>
      </div>
    {:else}
      <div class="grid grid-flow-col items-center">
        <div class="text-lg">Enter some integers in increasing order.</div>
      </div>
    {/if}
  </div>
</section>
