<script lang="ts">
  import type { account } from 'webnative'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { addNotification } from '$lib/notifications'
  import { createAccountLinkingConsumer } from '$lib/auth/linking'
  import { loadAccount } from '$lib/common/webnative'

  let accountLinkingConsumer: account.AccountLinkingConsumer

  let displayPin: string = ''
  let url = $page.url
  const username = url.searchParams.get('username')

  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  const initAccountLinkingConsumer = async () => {
    accountLinkingConsumer = await createAccountLinkingConsumer(username)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      displayPin = pin.join(' ')
    })

    accountLinkingConsumer.on('link', async ({ approved, username }) => {
      if (approved) {
        await loadAccount(username)

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
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div class="grid grid-flow-row auto-rows-max gap-7">
      <h3 class="text-xl font-serif">Connection Requested</h3>
      <div class="grid grid-flow-row auto-rows-max gap-4 justify-items-center">
        {#if displayPin}
          <span
            class="btn btn-info btn-lg rounded-full text-2xl tracking-widest w-3/4 cursor-default"
          >
            {displayPin}
          </span>
        {/if}
        <span class="text-md">Enter this code on your connected device.</span>
        <div
          class="grid grid-flow-col auto-cols-max gap-4 justify-center items-center text-slate-500"
        >
          <span
            class="rounded-lg border-t-2 border-l-2 border-slate-600 dark:border-slate-50 w-4 h-4 block animate-spin"
          />
          Waiting for a response...
        </div>
      </div>
      <div>
        <button
          class="btn btn-primary btn-outline text-base font-normal mt-4"
          on:click={cancelConnection}
        >
          Cancel Request
        </button>
      </div>
    </div>
  </div>
</div>
