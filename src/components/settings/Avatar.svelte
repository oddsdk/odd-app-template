<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores'
  import { getAvatarFromWNFS } from '$lib/account-settings'

  export let size = 'large'

  const sizeClasses =
    size === 'large'
      ? 'w-[88px] h-[88px] text-[40px]'
      : 'w-[40px] h-[40px] text-sm'

  getAvatarFromWNFS()
</script>

{#if $accountSettingsStore.avatar}
  <img
    class="object-cover rounded-full border-2 border-base-content {sizeClasses}"
    src={$accountSettingsStore.avatar.src}
    alt="User Avatar"
  />
{:else}
  <div
    class="flex items-center justify-center bg-base-content text-base-100 uppercase font-bold rounded-full {sizeClasses}"
  >
    {$sessionStore.username[0]}
  </div>
{/if}
