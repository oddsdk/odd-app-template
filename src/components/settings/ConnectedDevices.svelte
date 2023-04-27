<script lang="ts">
  import { goto } from '$app/navigation'

  import { sessionStore } from '$src/stores'
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-lg">Connected devices</h3>
  {#if $sessionStore.backupCreated}
    <p>You have connected at least one other device.</p>
  {:else}
    <p>You have no other connected devices.</p>
  {/if}
  <button class="btn btn-outline" on:click={() => goto('/delegate-account')}>
    Connect an additional device
  </button>
</div>
