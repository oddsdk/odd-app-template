<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import { createEventDispatcher } from 'svelte'

  import { sessionStore } from '../../../stores'
  import type { BackupView } from '$lib/views'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  const dispatch = createEventDispatcher()

  const copyLink = async () => {
    const origin = window.location.origin
    const connectionLink = `${origin}/link?username=${$sessionStore.username}`

    await clipboardCopy(connectionLink)
  }

  const navigate = (view: BackupView) => {
    dispatch('navigate', { view })
  }
</script>

<input type="checkbox" id="backup-device-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div>
      <h3 class="mb-7 text-xl font-serif">Connect a backup device</h3>

      <!-- GIANT QR CODE GOES HERE -->
      QR Codes

      <p class="mt-8 mb-4">
        Scan this code on the new device, or share the connection link.
      </p>

      <button class="btn btn-primary btn-outline" on:click={copyLink}>
        <ClipboardIcon />
        <span class="ml-2">Copy connection link</span>
      </button>
      <button
        class="btn btn-xs btn-link text-base text-error font-normal underline mt-4"
        on:click={() => navigate('are-you-sure')}
      >
        Skip for now
      </button>
    </div>
  </div>
</div>
