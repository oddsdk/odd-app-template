<script lang="ts">
  import { goto } from '$app/navigation'
  import { onDestroy, onMount } from 'svelte'
  import QRCode from 'qrcode-svg'

  import { addNotification } from '$lib/notifications'
  import { createAccountLinkingProducer } from '$lib/auth/linking'
  import { filesystemStore, sessionStore, themeStore } from '../../stores'
  import { getBackupStatus, setBackupStatus } from '$lib/auth/backup'
  import ConnectBackupDevice from '$components/auth/delegate-account/ConnectBackupDevice.svelte'
  import DelegateAccount from '$components/auth/delegate-account/DelegateAccount.svelte'

  import type { DelegateAccountView } from '$lib/views'

  let view: DelegateAccountView = 'connect-backup-device'

  let connectionLink = null
  let qrcode = null

  let fs = null
  let backupCreated = true

  let pin: number[]
  let pinInput = ''
  let pinError = false
  let confirmPin = () => {}
  let rejectPin = () => {}

  let unsubscribeFilesystemStore = () => {}
  let unsubscribeSessionStore = () => {}

  onMount(() => {
    unsubscribeFilesystemStore = filesystemStore.subscribe(async val => {
      fs = val

      if (fs) {
        const backupStatus = await getBackupStatus(fs)
        backupCreated = backupStatus.created
      }
    })

    unsubscribeSessionStore = sessionStore.subscribe(async val => {
      const hashedUsername = val.username.hashed
      const fullUsername = val.username.full

      if (hashedUsername && fullUsername) {
        const origin = window.location.origin

        connectionLink = `${origin}/link-device?hashedUsername=${hashedUsername}&username=${encodeURIComponent(
          fullUsername
        )}`
        qrcode = new QRCode({
          content: connectionLink,
          color: $themeStore.selectedTheme === 'light' ? '#171717' : '#FAFAFA',
          background:
            $themeStore.selectedTheme === 'light' ? '#FAFAFA' : '#171717',
          padding: 0,
          width: 250,
          height: 250,
          join: true
        }).svg()

        initAccountLinkingProducer(hashedUsername)
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

        if (fs) {
          await setBackupStatus(fs, { created: true })

          addNotification("You've connected a backup device!", 'success')
          goto('/')
        } else {
          addNotification(
            'Missing filesystem. Unable to create a backup device.',
            'error'
          )
        }
      }
    })
  }

  const checkPin = () => {
    if (pin.join('') === pinInput) {
      confirmPin()
    } else {
      pinError = true
    }
  }

  const cancelConnection = () => {
    rejectPin()

    addNotification('The connection attempt was cancelled', 'info')
    goto('/')
  }

  onDestroy(() => {
    unsubscribeFilesystemStore()
    unsubscribeSessionStore()
  })
</script>

{#if view === 'connect-backup-device'}
  <ConnectBackupDevice {qrcode} {connectionLink} {backupCreated} />
{:else if view === 'delegate-account'}
  <DelegateAccount
    bind:pinInput
    bind:pinError
    on:cancel={cancelConnection}
    on:checkpin={checkPin}
  />
{/if}
