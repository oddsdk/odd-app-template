<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import IntegerInput from '$routes/sequences/components/inputs/IntegerInput.svelte'

  let dispatch = createEventDispatcher()
  let integers: number[] = [null, null, null, null, null]

  function handleInput(event: CustomEvent<{ value: number; index: number }>) {
    const { value, index } = event.detail

    integers[index] = value

    dispatch('input', { sequence: integers.filter(num => num !== null) })
  }
</script>

<div class="flex flex-row h-24 justify-center items-center">
  {#each integers as integer, index}
    <IntegerInput
      {index}
      {integer}
      autofocus={index === 0}
      on:change={handleInput}
    />
    {#if index !== integers.length - 1}
      <span class="inline-block h-6 px-1 py-2 text-xl">,</span>
    {/if}
  {/each}
</div>
