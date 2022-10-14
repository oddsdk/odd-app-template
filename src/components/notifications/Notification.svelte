<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import { themeStore } from '../../stores'
  import type { Notification } from '$lib/notifications'
  import CheckThinIcon from '$components/icons/CheckThinIcon.svelte'
  import InfoThinIcon from '$components/icons/InfoThinIcon.svelte'
  import WarningThinIcon from '$components/icons/WarningThinIcon.svelte'
  import XThinIcon from '$components/icons/XThinIcon.svelte'

  export let notification: Notification
</script>

<div
  in:fly={{ y: 20, duration: 400 }}
  out:fade
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <div class="alert alert-{notification.type} text-sm mb-3 peer-last:mb-0">
    <div>
      {#if notification.type === 'success'}
        <CheckThinIcon
          color={$themeStore === 'light' ? '#b8ffd3' : '#002e12'}
        />
      {:else if notification.type === 'error'}
        <XThinIcon color={$themeStore === 'light' ? '#ffd6d7' : '#fec3c3'} />
      {:else if notification.type === 'info'}
        <InfoThinIcon color="#1e3a8a" />
      {:else if notification.type === 'warning'}
        <WarningThinIcon color="#7c2d12" />
      {/if}
      <span class="pl-1">{@html notification.msg}</span>
    </div>
  </div>
</div>
