<script lang="ts">
  import type * as webnative from 'webnative'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { addNotification } from '$lib/notifications'
  import { createAccountLinkingConsumer } from '$lib/auth/linking'
  import { loadAccount } from '$lib/auth/account'
  import type { LinkDeviceView } from '$lib/views'
  import FilesystemActivity from '$components/common/FilesystemActivity.svelte'
  import LinkDevice from '$components/auth/link-device/LinkDevice.svelte'

  import { extractSearchParam } from '$lib/utils'

  let view: LinkDeviceView = 'link-device'

  let accountLinkingConsumer: webnative.AccountLinkingConsumer
  let displayPin: string = ''

  const hashedUsername = extractSearchParam($page.url, 'hashedUsername')
  const fullUsername = decodeURIComponent(
    extractSearchParam($page.url, 'username')
  )

  const initAccountLinkingConsumer = async () => {
    accountLinkingConsumer = await createAccountLinkingConsumer(hashedUsername)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      displayPin = pin.join('')
    })

    accountLinkingConsumer.on('link', async ({ approved }) => {
      if (approved) {
        view = 'load-filesystem'

        await loadAccount(hashedUsername, fullUsername)

        addNotification("You're now connected!", 'success')
        goto('/')
      } else {
        addNotification('The connection attempt was cancelled', 'info')
        goto('/')
      }
    })
  }

  const cancelConnection = async () => {
    addNotification('The connection attempt was cancelled', 'info')

    await accountLinkingConsumer?.cancel()
    goto('/')
  }

  initAccountLinkingConsumer()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />

{#if view === 'link-device'}
  <LinkDevice pin={displayPin} on:cancel={cancelConnection} />
{:else if view === 'load-filesystem'}
  <FilesystemActivity activity="Loading" />
{/if}
