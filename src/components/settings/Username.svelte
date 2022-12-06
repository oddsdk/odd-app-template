<script lang="ts">
  import clipboardCopy from 'clipboard-copy'

  import { sessionStore } from '$src/stores'
  import { addNotification } from '$lib/notifications'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'
  import TruncatedUsername from '$components/settings/TruncatedUsername.svelte'

  const handleCopyUsername = async (): Promise<void> => {
    await clipboardCopy($sessionStore.username.full)
    addNotification('Copied to clipboard', 'success')
  }
</script>

<div>
  <h3 class="text-lg mb-4">Username</h3>
  <div class="flex items-center">
    <p>
      <TruncatedUsername />
    </p>
    <button
      class="pl-2 hover:text-neutral-500 transition-colors"
      on:click={handleCopyUsername}
    >
      <ClipboardIcon />
    </button>
  </div>
</div>
