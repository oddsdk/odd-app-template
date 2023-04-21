<svelte:options accessors={true} />

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let autofocus = false
  export let index
  export let integer = null
  export const focus = () => {
    inputRef.focus()
  }

  let dispatch = createEventDispatcher()
  let inputRef

  onMount(function () {
    if (autofocus) {
      inputRef.focus()
    }
  })

  function handleChange() {
    dispatch('change', { value: integer, index })
  }

  function handleInput(value) {
    // Remove non-numeric characters
    const filtered = value.replace(/\D/g, '')
    integer = filtered.length > 0 ? +filtered : null

    // Focus next input on comma
    if (value.includes(',')) {
      dispatch('focusnext', { index })
    }
  }

  function handleKeydown(event: {
    currentTarget: { value: string }
    key: string
  }) {
    const {
      currentTarget: { value },
      key
    } = event

    if (value.length === 0 && key === 'Backspace') {
      dispatch('focusprevious', { index })
    }
  }

  function getInputWidth(value: number | null): number {
    return !value ? 2.5 : value.toString().length * 1.5 + 1.5
  }
</script>

<input
  type="text"
  class="p-2 bg-base-100 rounded-sm outline-none text-xl text-center border border-neutral-200 dark:border-neutral-700 focus:border-neutral-500 dark:focus:border-neutral-500"
  style:width={`${getInputWidth(integer)}rem`}
  bind:value={integer}
  bind:this={inputRef}
  on:change={handleChange}
  on:input={event => handleInput(event.currentTarget.value)}
  on:keydown={handleKeydown}
/>
