<script lang="ts">
  import type { account } from 'webnative'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { addNotification } from '$lib/notifications'
  import { createAccountLinkingConsumer } from '$lib/auth/linking'
  import { loadAccount } from '$lib/common/webnative'

  let accountLinkingConsumer: account.AccountLinkingConsumer

  let loadingFilesystem = false

  let displayPin: string = ''
  let url = $page.url
  const username = url.searchParams.get('username')

  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  const initAccountLinkingConsumer = async () => {
    accountLinkingConsumer = await createAccountLinkingConsumer(username)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      displayPin = pin.join('')
    })

    accountLinkingConsumer.on('link', async ({ approved, username }) => {
      if (approved) {
        loadingFilesystem = true

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
{#if loadingFilesystem}
  <div class="modal">
    <div
      class="modal-box rounded-lg shadow-sm bg-slate-100 w-80 relative text-center dark:bg-slate-900 dark:border-slate-600 dark:border "
    >
      <p class="text-slate-500 dark:text-slate-50">
        <span
          class="rounded-lg border-t-2 border-l-2 border-slate-500 dark:border-slate-50 w-4 h-4 inline-block animate-spin mr-1"
        />
        Loading file system...
      </p>
    </div>
  </div>
{:else}
  <div class="modal">
    <div
      class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
    >
      <div class="grid grid-flow-row auto-rows-max gap-7">
        <h3 class="text-xl font-serif">Connection Requested</h3>
        <div
          class="grid grid-flow-row auto-rows-max gap-4 justify-items-center"
        >
          {#if displayPin}
            <span
              class="btn bg-blue-100 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900 border-0 btn-lg rounded-full text-3xl tracking-[.18em] w-3/4 cursor-default font-mono font-light"
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
{/if}
