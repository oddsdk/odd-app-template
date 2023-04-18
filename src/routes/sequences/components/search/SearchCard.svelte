<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type { Sequence } from '$routes/sequences/lib/sequences'
  import CheckIcon from '$routes/sequences/components/icons/Check.svelte'
  import SaveIcon from '$routes/sequences/components/icons/Save.svelte'

  export let sequence: Sequence

  let saveIconState: 'save' | 'check' = 'save'
  let dispatch = createEventDispatcher()

  function saveSequence() {
    dispatch('save', { sequence })

    saveIconState = 'check'

    setTimeout(() => {
      saveIconState = 'save'
    }, 2000)
  }
</script>

<div
  class="grid grid-rows-[2.5rem_auto] border border-neutral-500 dark:border-neutral-500 rounded-md"
>
  <div
    class="grid grid-flow-col grid-cols-2 bg-neutral-900 dark:bg-neutral-50 text-base-100 dark:text-base-100 rounded-t-md transition-colors ease-in"
  >
    <div class="flex flex-row px-3 justify-start items-center font-semibold">
      {sequence.id ?? 'No ID Number'}
    </div>
    <div
      class="flex flex-row px-3 gap-2 justify-end items-center cursor-pointer"
      on:click|preventDefault={saveSequence}
      on:keypress|preventDefault={saveSequence}
    >
      Save
      {#if saveIconState === 'save'}
        <SaveIcon />
      {:else}
        <CheckIcon />
      {/if}
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
