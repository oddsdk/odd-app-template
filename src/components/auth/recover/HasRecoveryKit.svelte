<script lang="ts">
  import { store } from 'webnative/common/root-key'
  import { loadFileSystem } from 'webnative/filesystem'
  import { provide } from 'webnative/session'
  import * as uint8arrays from 'uint8arrays'
  import { goto } from '$app/navigation'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { NAMESPACE } from '$lib/init'
  import {
    USERNAME_STORAGE_KEY,
    loadAccount,
    prepareUsername
  } from '$lib/auth/account'
  import Check from '$components/icons/CheckIcon.svelte'
  import RightArrow from '$components/icons/RightArrow.svelte'
  import Upload from '$components/icons/Upload.svelte'

  enum RECOVERY_STATES {
    Ready,
    Processing,
    Error,
    Done
  }
  let state = $sessionStore.session
    ? RECOVERY_STATES.Done
    : RECOVERY_STATES.Ready

  /**
   * Parse the user's `username` and `readKey` from the uploaded recovery kit and pass them into
   * webnative to recover the user's account and populate the `session` and `filesystem` stores
   * @param files
   */
  export const handleFileInput: (
    files: FileList
  ) => Promise<void> = async files => {
    const reader = new FileReader()

    reader.onload = async event => {
      state = RECOVERY_STATES.Processing

      try {
        const {
          authStrategy,
          program: {
            components: { crypto, depot, manners, reference, storage }
          }
        } = $sessionStore

        const parts = (event.target.result as string)
          .split('username: ')[1]
          .split('key: ')

        const username = parts[0].replace(/(\r\n|\n|\r)/gm, '')
        const hashedUsername = await prepareUsername(username)

        const readKey = uint8arrays.fromString(
          parts[1].replace(/(\r\n|\n|\r)/gm, ''),
          'base64pad'
        )

        storage.setItem(USERNAME_STORAGE_KEY, username)

        const rootDID = await reference.didRoot.lookup(hashedUsername)

        // Store the accountDID and readKey in webnative so they can be used internally load the file system
        await store({
          accountDID: rootDID,
          readKey,
          crypto: crypto
        })

        // Recover the user's file system then pass it to the filesystemStore
        const fs = await loadFileSystem({
          username: hashedUsername,
          rootKey: readKey,
          config: { namespace: NAMESPACE },
          dependencies: { crypto, depot, manners, reference, storage }
        })
        filesystemStore.set(fs)

        // Save the current session to storage so it persists throughout hard refreshes
        await provide(storage, {
          type: authStrategy.implementation.type,
          username: hashedUsername
        })

        // Load account data into sessionStore
        await loadAccount(hashedUsername, username)

        state = RECOVERY_STATES.Done
      } catch (error) {
        console.error(error)
        state = RECOVERY_STATES.Error
      }
    }

    reader.onerror = error => {
      console.error(error)
      state = RECOVERY_STATES.Error
    }

    reader.readAsText(files[0])
  }

  // Handle files uploaded directly through the file input
  let files: FileList
  $: if (files) {
    handleFileInput(files)
  }

  $: buttonData = {
    [RECOVERY_STATES.Processing]: {
      text: 'Processing recovery kit...',
      props: {
        disabled: state === RECOVERY_STATES.Processing,
        $$on_click: () => {}
      }
    },
    [RECOVERY_STATES.Done]: {
      text: 'Continue to the app',
      props: {
        $$on_click: () => goto('/')
      }
    }
  }
</script>

<div
  class="min-h-[calc(100vh-96px)] flex flex-col items-start justify-center max-w-[590px] m-auto gap-6 pb-5 text-sm"
>
  <h1 class="text-xl">Recover your account</h1>

  {#if state === RECOVERY_STATES.Done}
    <h3 class="flex items-center gap-2 font-normal text-base text-green-600">
      <Check /> Account recovered!
    </h3>
    <p>
      Welcome back <strong>{$sessionStore.username.trimmed}.</strong>
      We were able to successfully recover all of your private data.
    </p>
  {:else}
    <p>
      If you’ve lost access to all of your connected devices, you can use your
      recovery kit to restore access to your private data.
    </p>
  {/if}

  {#if state === RECOVERY_STATES.Error}
    <p class="text-red-600">
      We were unable to recover your account. Please double check that you
      uploaded the correct file.
    </p>
  {/if}

  <div class="flex flex-col gap-2">
    {#if state === RECOVERY_STATES.Ready || state === RECOVERY_STATES.Error}
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
    {:else}
      {@const { $$on_click, ...props } = buttonData[state].props}
      <button
        class="btn btn-primary !btn-lg !h-[56px] !min-h-0 w-fit gap-2"
        {...props}
        on:click={$$on_click}
      >
        {#if state === RECOVERY_STATES.Processing}
          <span
            class="animate-spin ease-linear rounded-full border-2 border-t-2 border-t-orange-500 border-neutral-900 w-[16px] h-[16px] text-sm"
          />
        {/if}
        {buttonData[state].text}
        {#if state === RECOVERY_STATES.Done}
          <RightArrow />
        {/if}
      </button>
    {/if}

    {#if state !== RECOVERY_STATES.Done}
      <p class="text-xxs">
        {`It should be a file named Webnative-RecoveryKit-{yourUsername}.txt`}
      </p>
    {/if}
  </div>
</div>
