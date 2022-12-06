<script lang="ts">
  import clipboardCopy from 'clipboard-copy'

  import { sessionStore } from '$src/stores'
  import { addNotification } from '$lib/notifications'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  const handleCopyUsername = async (): Promise<void> => {
    await clipboardCopy($sessionStore.username)
    addNotification('Copied to clipboard', 'success')
  }

  $: usernameParts = $sessionStore.username.split('#')
</script>

<div>
  <h3 class="text-lg mb-4">Username</h3>
  <div class="flex items-center">
    <p>
      {usernameParts[0]}
      <span class="text-neutral-500 -ml-[3px]">
        #{usernameParts[1].substring(0, 12)}...{usernameParts[1].substring(
          usernameParts[1].length - 5
        )}
      </span>
    </p>
    <button
      class="pl-2 hover:text-neutral-500 transition-colors"
      on:click={handleCopyUsername}
    >
      <ClipboardIcon />
    </button>
  </div>
</div>
