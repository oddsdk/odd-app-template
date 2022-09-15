<script lang="ts">
  import type { ConnectView } from '$lib/views'
  import Connect from '$components/auth/connect/Connect.svelte'
  import OpenConnectedDevice from '$components/auth/connect/OpenConnectedDevice.svelte'

  let view: ConnectView = 'connect'

  const navigate = (event: CustomEvent<{ view: ConnectView }>) => {
    view = event.detail.view
  }
</script>

{#if view === 'connect'}
  <Connect on:navigate={navigate} />
{:else if view === 'open-connected-device'}
  <OpenConnectedDevice />
{/if}
