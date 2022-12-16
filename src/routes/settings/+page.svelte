<script lang="ts">
  import { goto } from '$app/navigation'
  import { sessionStore } from '$src/stores'
  import AvatarUpload from '$components/settings/AvatarUpload.svelte'
  import ConnectedDevices from '$components/settings/ConnectedDevices.svelte'
  import RecoveryKit from '$components/settings/RecoveryKit.svelte'
  import ThemePreferences from '$components/settings/ThemePreferences.svelte'
  import Username from '$components/settings/Username.svelte'
</script>

{#if $sessionStore.session}
  <div
    class="min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)] pt-8 md:pt-16 flex flex-col items-start max-w-[690px] m-auto gap-10 pb-28 text-sm"
  >
    <h1 class="text-xl">Account Settings</h1>

    <div class="flex flex-col items-start justify-center gap-6">
      <AvatarUpload />

      <Username />

      <ThemePreferences />

      <ConnectedDevices />

      <RecoveryKit />
    </div>
  </div>
{:else}
  {goto('/')}
{/if}
