<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import QRCode from 'qrcode-svg'
  import { goto } from '$app/navigation'

  import { createAccountLinkingProducer } from '$lib/auth/linking'
  import { filesystemStore, sessionStore, theme } from '../../../stores'
  import { setBackupStatus } from '$lib/auth/backup'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  let view: 'backup-device' | 'delegate-account' = 'backup-device'

  const origin = window.location.origin
  const connectionLink = `${origin}/link-device?username=${$sessionStore.username}`
  const qrcode = new QRCode({
    content: connectionLink,
    color: $theme === 'light' ? '#334155' : '#E2E8F0',
    background: '#ffffff00'
  }).svg()

  let pin: number[]
  let pinInput = ''
  let pinError = false
  let confirmPin = () => {}
  let rejectPin = () => {}

  const initAccountLinkingProducer = async () => {
    const accountLinkingProducer = await createAccountLinkingProducer(
      $sessionStore.username
    )

    accountLinkingProducer.on(
      'challenge',
      ({ pin: p, confirmPin: confirm, rejectPin: reject }) => {
        pin = p
        confirmPin = confirm
        rejectPin = reject
        view = 'delegate-account'
      }
    )

    accountLinkingProducer.on('link', async ({ approved, username }) => {
      if (approved) {
        sessionStore.update(session => ({
          ...session,
          backupCreated: true
        }))

        const fs = $filesystemStore
        await setBackupStatus(fs, { created: true })

        goto('/')
        // Send up a toast on '/'
      }
    })
  }

  const copyLink = async () => {
    await clipboardCopy(connectionLink)
  }

  const checkPin = () => {
    if (pin.join('') === pinInput) {
      confirmPin()
    } else {
      pinError = true
    }
  }

  const refuseConnection = () => {
    rejectPin()

    view = 'backup-device'
  }

  initAccountLinkingProducer()
</script>

{#if view === 'backup-device'}
  <input
    type="checkbox"
    id="backup-device-modal"
    checked
    class="modal-toggle"
  />
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
          on:click={() => goto('/backup?view=are-you-sure')}
        >
          Skip for now
        </button>
      </div>
    </div>
  </div>
{:else if view === 'delegate-account'}
  <input
    type="checkbox"
    id="delegate-account-modal"
    checked
    class="modal-toggle"
  />
  <div class="modal">
    <div class="modal-box w-80 relative text-center">
      <div>
        <h3 class="mb-7 text-xl font-serif">
          A new device would like to connect to your account
        </h3>
        <div class="mb-5">
          <input
            id="pin"
            type="text"
            class="input input-bordered w-full max-w-xs mb-2"
            bind:value={pinInput}
          />
          <label for="pin" class="label">
            {#if !pinError}
              <span class="label-text-alt text-slate-500">
                Enter the connection code to approve the connection
              </span>
            {:else}
              <span class="label-text-alt text-error">
                Entered pin does not match a pin from a known device
              </span>
            {/if}
          </label>
        </div>
        <div>
          <button class="btn btn-primary mb-5 w-full" on:click={checkPin}>
            Approve the connection
          </button>
          <button
            class="btn btn-error btn-outline w-full"
            on:click={refuseConnection}
          >
            Refuse the connection
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
