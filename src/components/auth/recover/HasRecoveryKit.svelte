<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { store } from 'webnative/common/root-key'
  import { loadFileSystem } from 'webnative/filesystem'
  import { assemble } from 'webnative'
  import { SESSION_TYPE } from 'webnative/capabilities'
  import { provide } from 'webnative/session'
  import * as uint8arrays from 'uint8arrays'
  import { goto } from '$app/navigation'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { NAMESPACE, initialize } from '$lib/init'
  import { USERNAME_STORAGE_KEY, loadAccount } from '$lib/auth/account'
  import type { RecoveryView } from '$lib/views'
  import Upload from '$components/icons/Upload.svelte'

  export const handleFileInput: (
    files: FileList
  ) => Promise<void> = async files => {
    console.log('files', files)
    const reader = new FileReader()

    reader.onload = async event => {
      try {
        const {
          authStrategy,
          program: {
            components: { crypto, depot, manners, reference, storage }
          }
        } = $sessionStore

        const parts = (event.target.result as string)
          .split('username: ')[1]
          .split('systemUsername: ')

        const username = parts[0].replace(/(\r\n|\n|\r)/gm, '')
        console.log('username', username)

        const systemUsername = parts[1]
          .split('key: ')[0]
          .replace(/(\r\n|\n|\r)/gm, '')
        console.log('systemUsername', systemUsername)

        const readKey = uint8arrays.fromString(
          parts[1].split('key: ')[1].replace(/(\r\n|\n|\r)/gm, ''),
          'base64pad'
        )
        console.log('readKey', readKey)

        storage.setItem(USERNAME_STORAGE_KEY, username)

        const rootDID = await reference.didRoot.lookup(systemUsername)
        console.log('rootDID', rootDID)

        const stored = await store({
          accountDID: rootDID,
          readKey,
          crypto: crypto
        })
        console.log('stored', stored)

        const fs = await loadFileSystem({
          username: systemUsername,
          rootKey: readKey,
          config: { namespace: NAMESPACE },
          dependencies: { crypto, depot, manners, reference, storage }
        })
        console.log('fs', fs)

        filesystemStore.set(fs)

        // const assembled = await assemble(
        //   { namespace: NAMESPACE },
        //   $sessionStore.program.components
        // )
        // console.log('assembled', assembled)

        // const session = await assembled.auth.session()
        // console.log('session', session)

        await provide(storage, {
          type: SESSION_TYPE,
          username: systemUsername
        })
        // console.log('provided', provided)

        await loadAccount(systemUsername, username)

        // await initialize()

        console.log('$sessionStore', $sessionStore)

        goto('/')
      } catch (error) {
        console.error(error)
      }
    }
    reader.onerror = error => console.error(error)
    reader.readAsText(files[0])
  }

  // Handle files uploaded directly through the file input
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }

  const dispatch = createEventDispatcher()

  const navigate = (view: RecoveryView) => {
    dispatch('navigate', { view })
  }
</script>

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[590px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">Recover your account</h1>

  <p>
    If you’ve lost access to all of your connected devices, you can use your
    recovery kit to restore access to your private data.
  </p>

  <div class="flex flex-col gap-2">
    <label
      for="upload-recovery-kit"
      class="btn btn-primary !btn-lg !h-[56px] !min-h-0 w-fit gap-2"
    >
      <Upload /> Upload your recovery kit
    </label>
    <input
      bind:files
      id="upload-recovery-kit"
      type="file"
      accept=".txt"
      class="hidden"
    />
    <p class="text-xxs">
      {`It should be a file named Webnative-RecoveryKit-{yourUsername}.txt`}
    </p>
  </div>

  <button on:click={() => navigate('no-recovery-kit')} class="underline">
    I don’t have a recovery kit
  </button>
</div>
