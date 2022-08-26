<script lang="ts">
  import clipboardCopy from 'clipboard-copy'
  import QRCode from 'qrcode-svg'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  import { createAccountLinkingProducer } from '$lib/auth/linking'
  import { filesystemStore, sessionStore, theme } from '../../../stores'
  import { setBackupStatus } from '$lib/auth/backup'
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  let url = $page.url
  let usernameParam = url.searchParams.get('username')

  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  let view: 'backup-device' | 'delegate-account' = usernameParam
    ? `delegate-account`
    : 'backup-device'

  let connectionLink = null
  let qrcode = null

  let pin: number[]
  let pinInput = ''
  let pinError = false
  let confirmPin = () => {}
  let rejectPin = () => {}

  onMount(() => {
    sessionStore.subscribe(val => {
      const username = val.username

      if (username && usernameParam) {
        view = 'delegate-account'

        if (username !== usernameParam) {
          console.error(
            `Requested connection for ${usernameParam} does not match your username`
          )
        }

        initAccountLinkingProducer(username)
      } else if (username) {
        const origin = window.location.origin

        connectionLink = `${origin}/link-device?username=${username}`
        qrcode = new QRCode({
          content: connectionLink,
          color: $theme === 'light' ? '#334155' : '#E2E8F0',
          background: '#ffffff00'
        }).svg()

        initAccountLinkingProducer(username)
      }
    })
  })

  const initAccountLinkingProducer = async (username: string) => {
    const accountLinkingProducer = await createAccountLinkingProducer(username)

    accountLinkingProducer.on('challenge', detail => {
      pin = detail.pin
      confirmPin = detail.confirmPin
      rejectPin = detail.rejectPin

      view = 'delegate-account'
    })

    accountLinkingProducer.on('link', async ({ approved }) => {
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
                Enter the connection code from that device to approve this
                connection.
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
