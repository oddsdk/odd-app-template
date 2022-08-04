<script lang="ts">
  import { sessionStore } from '../stores'

  import Register from '$components/auth/register/Register.svelte'
  import Welcome from '$components/auth/register/Welcome.svelte'
</script>

{#if $sessionStore.authed}
  <Welcome />
{:else}
  <Register />
{/if}
