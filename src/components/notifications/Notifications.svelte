<script lang="ts">
  import { flip } from 'svelte/animate'

  import { notificationStore } from '../../stores'
  import Notification from '$components/notifications/Notification.svelte'
</script>

{#if $notificationStore.length}
  <div class="fixed z-50 right-6 bottom-6 flex flex-col justify-center">
    {#each $notificationStore as notification (notification.id)}
      <div animate:flip>
        <Notification {notification} />
      </div>
    {/each}
  </div>
{/if}
