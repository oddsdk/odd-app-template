<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type { Sequence } from '$routes/sequences/lib/sequences'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  export let sequence: Sequence

  let dispatch = createEventDispatcher()

  function copyCID() {
    dispatch('copycid', { oeisNumber: sequence.number })
  }

  function copyLink() {
    dispatch('copylink', { oeisNumber: sequence.number })
  }
</script>

<div
  class="grid grid-rows-[2.5rem_auto] border border-neutral-500 dark:border-neutral-500 rounded-md"
>
  <div
    class="grid grid-flow-col grid-cols-2 bg-neutral-900 dark:bg-neutral-200 text-base-100 dark:text-base-100 rounded-t-md transition-colors ease-in"
  >
    <div class="flex flex-row px-3 justify-start items-center font-semibold">
      {sequence.id ?? 'No ID Number'}
    </div>
    <div class="flex flex-row px-3 gap-5 justify-end">
      <div
        class="flex flex-row gap-2 justify-end items-center cursor-pointer"
        on:click|preventDefault={copyLink}
        on:keypress|preventDefault={copyLink}
      >
        Copy Link
        <ClipboardIcon />
      </div>
      <div
        class="flex flex-row gap-2 justify-end items-center cursor-pointer"
        on:click|preventDefault={copyCID}
        on:keypress|preventDefault={copyCID}
      >
        Copy CID
        <ClipboardIcon />
      </div>
    </div>
  </div>
  <div class="grid grid-flow-col grid-cols-2">
    <div class="px-3 py-1 text-start">
      <span class="font-semibold">Name</span>
      <div class="break-words">{sequence.name}</div>
    </div>
    <div class="px-3 py-1 text-start">
      <span class="font-semibold">Sequence</span>
      <div class="break-words">{sequence.data}</div>
    </div>
  </div>
</div>

<style>
  .val {
    word-wrap: break-word;
    display: inline-block;
  }
</style>
