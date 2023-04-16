<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import IntegerInput from '$routes/sequences/components/inputs/IntegerInput.svelte'

  let dispatch = createEventDispatcher()
  let integers: number[] = [null, null, null, null, null]
  let errors: boolean[] = [false, false, false, false, false]

  function handleInput(event: CustomEvent<{ value: number; index: number }>) {
    const { value, index } = event.detail

    integers[index] = value

    // Check increasing order from left to right, ignoring empty inputs
    integers.forEach((number, index) => {
      errors[index] =
        number !== null
          ? integers.slice(0, index).some(num => number < num && num !== null)
          : false
    })

    if (errors.some(err => err)) {
      dispatch('error')
    } else {
      dispatch('input', { sequence: integers.filter(num => num !== null) })
    }
  }
</script>

<div class="flex flex-row h-24 justify-center items-center">
  {#each integers as integer, index}
    <IntegerInput
      {index}
      {integer}
      error={errors[index]}
      autofocus={index === 0}
      on:change={handleInput}
    />
    {#if index !== integers.length - 1}
      <span class="inline-block h-6 px-1 py-2 text-xl">,</span>
    {/if}
  {/each}
</div>
