<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import QRCode from 'qrcode-svg'
  import { createEventDispatcher } from 'svelte'

  import {
    accountLinkingProducerStore,
    sessionStore,
    theme
  } from '../../../stores'
  import type { BackupView } from '$lib/views'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'
  import { createAccountLinkingProducer } from '$lib/common/webnative'
  import { goto } from '$app/navigation'

  const dispatch = createEventDispatcher()

  const origin = window.location.origin
  const connectionLink = `${origin}/link-device?username=${$sessionStore.username}`
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

  // Subscribe to the challenge event on the  and wait for the challenge event
  let confirmPin
  let rejectPin

  const initAccountLinkingProducer = async () => {
    const accountLinkingProducer = await createAccountLinkingProducer(
      $sessionStore.username
    )
    accountLinkingProducerStore.set(accountLinkingProducer)

    accountLinkingProducer.on(
      'challenge',
      ({ pin, confirmPin: confirm, rejectPin: reject }) => {
        confirmPin = confirm
        rejectPin = reject
        console.log('pin: ', pin)

        // Put pin, confirmPin, and rejectPin on the store

        confirmPin()
        goto('/delegate-account')
      }
    )
  }

  initAccountLinkingProducer()
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
