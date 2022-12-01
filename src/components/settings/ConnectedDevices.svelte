<script lang="ts">
  import { sessionStore } from '$src/stores'
</script>

<div>
  <h3 class="text-lg mb-4">Connected devices</h3>
  {#if $sessionStore.backupCreated}
    <p class="mb-4">
      You've already connected an additional device, but you can connect more.
    </p>
  {:else}
    <p class="mb-4">You have no other connected devices.</p>
  {/if}
  <a class="btn btn-primary" href="/delegate-account">
    Connect an additional device
  </a>
</div>
