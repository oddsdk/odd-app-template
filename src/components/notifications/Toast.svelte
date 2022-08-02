<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'

  import CheckThinIcon from '$components/icons/CheckThinIcon.svelte'
  import XThinIcon from '$components/icons/XThinIcon.svelte'

  export let kind: 'success' | 'error'
  export let message: string

  const dispatch = createEventDispatcher()

  const clearNotification = () => {
    dispatch('clear')
  }
</script>

<div
  class="toast"
  on:click={clearNotification}
  out:fade={{ duration: 800, easing: quintOut }}
>
  <div
    class="alert {kind === 'success' ? 'alert-success' : 'alert-error'} text-sm"
  >
    <div>
      {#if kind === 'success'}
        <CheckThinIcon />
      {:else if kind === 'error'}
        <XThinIcon />
      {/if}
      <span class="pl-1">{message}</span>
    </div>
  </div>
</div>
