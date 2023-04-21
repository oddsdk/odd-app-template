<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import IntegerInput from '$routes/sequences/components/inputs/IntegerInput.svelte'

  let dispatch = createEventDispatcher()
  let inputs = []
  let integers: number[] = new Array(5).fill(null)

  function handleFocusNext(event: CustomEvent<{ index: number }>) {
    const { index } = event.detail

    const nextIndex = index + 1

    if (nextIndex < inputs.length) {
      inputs[nextIndex].focus()
    }
  }

  function handleFocusPrevious(event: CustomEvent<{ index: number }>) {
    const { index } = event.detail

    const previousIndex = index - 1

    if (previousIndex >= 0) {
      inputs[previousIndex].focus()
    }
  }

  function handleInput(event: CustomEvent<{ value: number; index: number }>) {
    const { value, index } = event.detail

    integers[index] = value

    dispatch('input', { sequence: integers.filter(num => num !== null) })
  }
</script>

<div class="flex flex-row h-24 justify-center items-center">
  {#each integers as integer, index}
    <IntegerInput
      bind:this={inputs[index]}
      {index}
      {integer}
      autofocus={index === 0}
      on:change={handleInput}
      on:focusnext={handleFocusNext}
      on:focusprevious={handleFocusPrevious}
    />
    {#if index !== integers.length - 1}
      <span class="inline-block h-6 px-1 py-2 text-xl">,</span>
    {/if}
  {/each}
</div>
