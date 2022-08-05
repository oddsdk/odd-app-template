<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import QRCode from 'qrcode-svg'
  import { createEventDispatcher } from 'svelte'

  import { sessionStore, theme } from '../../../stores'
  import type { BackupView } from '$lib/views'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  const dispatch = createEventDispatcher()

  const origin = window.location.origin
  const connectionLink = `${origin}/link?username=${$sessionStore.username}`
  const qrcode = new QRCode({
    content: connectionLink,
    color: $theme === 'light' ? '#334155' : '#E2E8F0',
    background: '#ffffff00'
  }).svg()

  const copyLink = async () => {
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
      <h3 class="pb-1 text-xl font-serif">Connect a backup device</h3>
      {@html qrcode}
      <p class="font-extralight pt-1 mb-8">
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
