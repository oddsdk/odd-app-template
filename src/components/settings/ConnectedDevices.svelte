<script lang="ts">
  import { sessionStore } from '$src/stores'
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-lg">Connected devices</h3>
  {#if $sessionStore.backupCreated}
    <p>You have connected at least one other device.</p>
  {:else}
    <p>You have no other connected devices.</p>
  {/if}
  <a class="btn btn-outline" href="/delegate-account">
    Connect an additional device
  </a>
</div>
