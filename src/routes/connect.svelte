<script lang="ts">
  import Connect from '$components/auth/connect/Connect.svelte'
  import OpenConnectedDevice from '$components/auth/connect/OpenConnectedDevice.svelte'
  import type { ConnectView } from '$lib/views'

  let view: ConnectView = 'connect'

  const navigate = (event: CustomEvent<{ view: ConnectView }>) => {
    console.log(event.detail.view)
    view = event.detail.view
  }
</script>

{#if view === 'connect'}
  <Connect on:navigate={navigate} />
{:else if view === 'open-connected-device'}
  <OpenConnectedDevice />
{/if}
