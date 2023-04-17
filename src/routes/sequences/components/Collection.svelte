<script lang="ts">
  import { themeStore } from '$src/stores'
  import clipboardCopy from 'clipboard-copy'

  import { getSequences } from '../lib/sequences'
  import CollectionList from './collection/CollectionList.svelte'

  let sequences = []
  let cidQuery = ''

  async function loadSequences() {
    // TODO List the contents of the sequence directory

    // TODO Parse sequence files to list of sequences

    // TODO Remove this placeholder
    sequences = await getSequences([1, 1, 2, 3, 5])
  }

  function copyCID(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail
    // TODO Write a getCID function that takes a path and returns a CID
    // Wrap in try-catch and throw if path does not exist

    console.log('copy CID', oeisNumber)
  }

  function copyLink(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail

    console.log('copy link', oeisNumber)
  }

  function addSequence() {
    // TODO Lookup a sequence by CID from the gateway
    // Validate sequence
    // Write the result into the sequences directory
  }

  loadSequences()
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div
    class="grid grid-flow-row grid-rows-[2rem_auto] gap-6 w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  >
    <div class="grid grid-flow-col grid-cols-[1fr_4rem] gap-1.5">
      <input
        class="w-full p-1.5 border border-base-content rounded-md outline-orange-200 text-base-content dark:text-base-100"
        type="text"
        placeholder="Enter a CID"
        bind:value={cidQuery}
      />
      <button
        class="rounded-md bg-orange-200 hover:bg-orange-500 text-base-content dark:text-base-100 transition-colors ease-in"
        on:click|preventDefault={addSequence}
        on:keypress|preventDefault={addSequence}
      >
        Add
      </button>
    </div>
    <CollectionList {sequences} on:copycid={copyCID} on:copylink={copyLink} />
  </div>
</section>
