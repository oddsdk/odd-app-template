<script lang="ts">
  import { accountLinkingConsumerStore } from '../../../stores'
  import { createAccountLinkingConsumer } from '$lib/common/webnative'
  import type { Page } from '@sveltejs/kit'
  import type { Readable } from 'svelte/store'
  import { page } from '$app/stores'

  let url = $page.url
  const username = url.searchParams.get('username')
  // clear the params
  url.searchParams.delete('username')
  history.replaceState(null, document.title, url.toString())

  console.log('username: ', username)

  const initAccountLinkingConsumer = async () => {
    const accountLinkingConsumer = await createAccountLinkingConsumer(username)
    accountLinkingConsumerStore.set(accountLinkingConsumer)

    accountLinkingConsumer.on('challenge', ({ pin }) => {
      console.log('pin: ', pin)
    })

    accountLinkingConsumer.on('link', ({ approved, username }) => {
      console.log('approved: ', approved)

      // Send up a toast
      // Load the filesystem and put on the store (call in webnative lib?)
      // Redirect to '/'
    })
  }

  initAccountLinkingConsumer()
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Link Device</h3>
      <div>
        <a class="btn btn-primary mb-5 w-full" href="/register">
          Create a new account
        </a>
        <a class="btn btn-primary btn-outline w-full" href="/">
          I have an existing account
        </a>
      </div>
    </div>
  </div>
</div>
