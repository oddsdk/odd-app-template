<script lang="ts">
  import { onDestroy } from 'svelte'
  import * as odd from '@oddjs/odd'

  import { filesystemStore, themeStore } from '$src/stores'
  import { checkInitialize, checkSaveSequence, getSequences, type Sequence } from '$routes/sequences/lib/sequences'
  import SequenceInput from '$routes/sequences/components/inputs/SequenceInput.svelte'
  import SearchResults from './search/SearchResults.svelte'

  let fs: odd.FileSystem
  let sequences: Sequence[] = []

  const unsubscribeFileSystemStore = filesystemStore.subscribe(fileSystem => {
    fs = fileSystem
  })

  async function initialize() {
    if (fs) {
      /**
       * Create a sequences directory.
       *
       * We will store sequence files in a sequences directory in WNFS. Our first
       * step is to create the directory if it doesn't already exist. Fill in the
       * steps below to complete this exercise.
      */

      /**
       * TODO Create a path object for the sequences directory.
       *
       * WNFS has public and private file system directories. We want to store sequences 
       * in a "sequences" directory in the public directory. Our path should be like 
       * "public/sequences/". Note that you won't need to create a "public" directory.
       *
       * See the path documentation for path examples: https://docs.odd.dev/file-system-wnfs#paths
      */
      const path = null

      /**
        * TODO Check if the directory exists and create it if not.
        *
        * The file system interface has functions to check for existence or make a directory.
        *   - Exists: https://docs.odd.dev/file-system-wnfs#exists
        *   - Make directory: https://docs.odd.dev/file-system-wnfs#mkdir
        *
        * Use the path we created above when calling these functions.
      */
      const exists = null

      if (!exists) {
        // TODO Create the sequences directory

        /**
         * We've created our directory locally but also want to publish it to IPFS. 
         * The file system's publish function does this for us.
        */
        await fs.publish()
      }

      /**
       * This function checks your answer and logs the result to the devtools console.
       *
       * See https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools
       * for help opening the devtools and select the Console tab once you have opened them.
       */
       await checkInitialize(fs)
    }
  }

  async function saveSequence(event: CustomEvent<{ sequence: Sequence }>) {
    const { sequence } = event.detail

    console.log('Sequence to save:', sequence)

    if (fs) {
      /**
       * Save a sequence to the sequences directory.
       *
       * We save the sequence when a user clicks the save button for a sequence in the
       * search results. OEIS appears to use sequence.number as a unique identifier. We'll
       * use that in our file name.
      */

      /**
       * TODO Create a file path for the sequence. The file path should include each
       * path segment from the sequences directory followed by a file name.
       * The file name should use the sequence.number from the sequence data and a ".json"
       * file extension. For example, if the sequence number is 45, the file name would be "45.json".
       *
       * JavaScript template literals may help with creating the file name:
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
      */
      const path = null

      /**
        * Write the file to the sequences directory.
        *
        * The file system interface has a write function for saving files:
        * https://docs.odd.dev/file-system-wnfs#write
        *
        * Use the path we created above to write the encodedContent.
      */
      const encodedContent = new TextEncoder().encode(JSON.stringify(sequence))

      // TODO Write the file

      // Publish the change to IPFS
      await fs.publish()

      /**
      * This function checks your answer and logs the result to the devtools console.
      */
      await checkSaveSequence(fs, sequence.number)
    }
  }

  async function search(
    event: CustomEvent<{ sequence: number[] }>
  ) {
    const { sequence } = event.detail

    if (sequence.length >= 2) {
      /**
       * OPTIONAL ADVANCED EXERCISE
       * 
       * Our search function displays all search results from OEIS. Ideally, we
       * only want to show results we have yet to collect After completing the
       * Collection exercises, write a function to check collected sequences and
       * remove them from the search results.
      */
      sequences = await getSequences(sequence)
    }
  }

  onDestroy(unsubscribeFileSystemStore)

  initialize()
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
    <SequenceInput on:input={search} />
    {#if sequences === null}
      <div class="grid grid-flow-col">
        <div class="text-lg">No matching sequences found.</div>
      </div>
    {:else if sequences.length === 0}
      <div class="grid grid-flow-col">
        <div class="text-lg">Enter some integers.</div>
      </div>
    {:else}
      <SearchResults {sequences} on:save={saveSequence} />
    {/if}
  </div>
</section>
