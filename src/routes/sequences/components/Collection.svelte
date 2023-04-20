<script lang="ts">
  import * as odd from '@oddjs/odd'
  import { filesystemStore, themeStore } from '$src/stores'
  import { onDestroy } from 'svelte'
  import clipboardCopy from 'clipboard-copy'

  import {
    getContentCID,
    getSequences,
    getSequencesFromListing
  } from '$routes/sequences/lib/sequences'
  import CollectionList from '$routes/sequences/components/collection/CollectionList.svelte'

  let cidQuery = ''
  let fs: odd.FileSystem
  let sequences = []

  const unsubscribeFileSystemStore = filesystemStore.subscribe(fileSystem => {
    fs = fileSystem
  })

  async function loadSequences() {
    if (fs) {
      /**
       * Load stored sequences from the file system.
       *
       * We want to load and display collected sequences when we view
       * the collection. In this exercise, you'll get a listing
       * of the contents of the sequences directory. We've provided code
       * for parsing the listing into an array of sequences.
       */

      /**
       * TODO Create a path object for the sequences directory. See
       * the instructions in Search.svelte and complete the Search
       * exercises before starting this one.
       */
      const path = null

      /**
       * TODO List the contents of the sequences directory.
       *
       * The file system interface has a function to list directory contents:
       * https://docs.odd.dev/file-system-wnfs#ls
       *
       * To be safe, check that the directory exists before listing its contents.
       */
      const exists = null

      if (exists) {
        // TODO List the contents of the sequences directory
        const listing = null

        sequences = await getSequencesFromListing(listing, fs)
      }
    }
  }

  async function copyCID(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail

    if (fs) {
      /**
       * Content identifiers (CIDs) are labels that point to content on
       * IPFS using content addressing. Read the IPFS docs for more information
       * about CIDs: https://docs.ipfs.tech/concepts/content-addressing/
       */
      const cid = await getContentCID(oeisNumber, fs)
      await clipboardCopy(cid)
    }
  }

  async function openLink(event: CustomEvent<{ oeisNumber: number }>) {
    const { oeisNumber } = event.detail

    if (fs) {
      const cid = await getContentCID(oeisNumber, fs)

      /**
       * We can view data on IPFS using an HTTP gateway. Content on IPFS
       * is distributed across IPFS nodes, which means we can view data on
       * any IPFS node that exposes an HTTP gateway.
       *
       * TODO The URL below links to a sequence on the Fission HTTP gateway.
       * Replace "ipfs.runfission.com" with "ipfs.io" to view the sequence on
       * the Protocol Labs HTTP gateway.
       */
      const url = `https://ipfs.runfission.com/ipfs/${cid}/userland`

      window.open(url, '_newtab')
    }
  }

  async function addSequence() {
    /**
     * OPTIONAL ADVANCED EXERCISE
     *
     * Add a sequence loaded by CID from an HTTP gateway.
     *
     * The openLink function above shows how to view sequence data on IPFS
     * once saved to the file system and published. We can also load a
     * sequence from the gateway and add it to our collection.
     *
     * Fetch a sequence using the cidQuery variable and write it to the
     * sequences directory. You won't be able to add a sequence that is already
     * in your collection, so ask one of your neighbors for a CID to test
     * your implementation.
     *
     * BONUS ROUND Validate the sequence data with OEIS. Use the getSequences
     * function (already imported in this module) or see this stackoverflow
     * answer for tips on querying OEIS: https://stackoverflow.com/a/38421600.
     *
     */
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
    <CollectionList {sequences} on:copycid={copyCID} on:openlink={openLink} />
  </div>
</section>
