<script lang="ts">
  import { sessionStore } from '$src/stores'

  import Register from '$components/auth/register/Register.svelte'
  import Welcome from '$components/auth/register/Welcome.svelte'
</script>

{#if $sessionStore.session}
  <Welcome />
{:else}
  <Register />
{/if}
