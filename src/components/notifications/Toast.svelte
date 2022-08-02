<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'

  import { theme } from '../../stores'
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
        <CheckThinIcon color={$theme === 'light' ? '#b8ffd3' : '#002e12'} />
      {:else if kind === 'error'}
        <XThinIcon color={$theme === 'light' ? '#ffd6d7' : '#fec3c3'} />
      {/if}
      <span class="pl-1">{message}</span>
    </div>
  </div>
</div>
