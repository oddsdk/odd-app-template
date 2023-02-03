<script lang="ts">
  import * as uint8arrays from 'uint8arrays'

  import { sessionStore } from '$src/stores'
  import {
    RECOVERY_STATES,
    USERNAME_STORAGE_KEY,
    loadAccount,
    prepareUsername
  } from '$lib/auth/account'
  import Check from '$components/icons/CheckIcon.svelte'
  import RecoveryKitButton from './RecoveryKitButton.svelte'

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
            components: { crypto, reference, storage }
          }
        } = $sessionStore

        const parts = (event.target.result as string)
          .split('username: ')[1]
          .split('key: ')

        const readKey = uint8arrays.fromString(
          // Trim any whitespace from the parsed readKey
          parts[1].replace(/(\r\n|\n|\r)/gm, ''),
          'base64pad'
        )

        // Trim any whitespace from the parsed username
        const oldUsername = parts[0].replace(/(\r\n|\n|\r)/gm, '')
        const hashedOldUsername = await prepareUsername(oldUsername)
        const newRootDID = await $sessionStore.program.agentDID()

        // Construct a new username using the old `trimmed` name and `newRootDID`
        const newUsername = `${oldUsername.split('#')[0]}#${newRootDID}`
        const hashedNewUsername = await prepareUsername(newUsername)

        storage.setItem(USERNAME_STORAGE_KEY, newUsername)

        // Recover user's file system
        const { success } = await $sessionStore.program.fileSystem.recover({
          newUsername: hashedNewUsername,
          oldUsername: hashedOldUsername,
          readKey
        })
        if (!success) {
          throw new Error('Failed to recover file system')
        }

        // Load account data into sessionStore
        await loadAccount(hashedNewUsername, newUsername)

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
    <RecoveryKitButton {handleFileInput} {state} />

    {#if state !== RECOVERY_STATES.Done}
      <p class="text-xxs">
        {`It should be a file named Webnative-RecoveryKit-{yourUsername}.txt`}
      </p>
    {/if}
  </div>
</div>
