<script lang="ts">
  import * as odd from '@oddjs/odd'
  import { filesystemStore, themeStore } from '$src/stores'
  import { onDestroy } from 'svelte'
  import clipboardCopy from 'clipboard-copy'

  import { getContentCID, getSequences } from '../lib/sequences'
  import { ipfsGatewayUrl } from '$lib/app-info'
  import CollectionList from './collection/CollectionList.svelte'

  let cidQuery = ''
  let fs: odd.FileSystem
  let sequences = []

  const unsubscribeFileSystemStore = filesystemStore.subscribe(fileSystem => {
    fs = fileSystem
  })

  async function loadSequences() {
    // TODO List the contents of the sequence directory

    // TODO Parse sequence files to list of sequences

    // TODO Remove this placeholder
    sequences = await getSequences([1, 1, 2, 3, 5])
  }

  async function copyCID(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail

    if (fs) {
      const cid = await getContentCID(oeisNumber, fs)
      await clipboardCopy(cid)
    }
  }

  async function copyLink(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail

    if (fs) {
      const cid = await getContentCID(oeisNumber, fs)
      const url = `https://ipfs.${ipfsGatewayUrl}/ipfs/${cid}/userland`
      await clipboardCopy(url)
    }
  }

  function addSequence() {
    // TODO Lookup a sequence by CID from the gateway
    // Validate sequence
    // Write the result into the sequences directory
  }

  onDestroy(unsubscribeFileSystemStore)

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
