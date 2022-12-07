<script lang="ts">
  import {
    activateOPButton,
    encodeOPSaveRequest
  } from '@1password/save-button/built/index.js'

  import { sessionStore } from '$src/stores'
  import { generateRecoveryKit } from '$lib/account-settings'
  import OnePassword from '$components/icons/OnePassword.svelte'
  import Download from '$components/icons/Download.svelte'

  export let handleToggleModal: () => void
  let encodedSaveRequest
  $: recoveryKit = null
  $: downloadLinkRef = null
  $: onePasswordBtnRef = null
  $: fileURL = null

  const prepareRecoveryKitDownload = async () => {
    recoveryKit = await generateRecoveryKit()

    const data = new Blob([recoveryKit], { type: 'text/plain' })

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (fileURL !== null) {
      window.URL.revokeObjectURL(fileURL)
    }

    fileURL = window.URL.createObjectURL(data)

    prepareSaveTo1Pass()
  }
  const recoveryKitPromise = prepareRecoveryKitDownload()

  const prepareSaveTo1Pass = () => {
    const saveRequest = {
      title: `Webnative-RecoveryKit-${$sessionStore.username.trimmed}`,
      fields: [
        {
          autocomplete: 'cc-name',
          value: 'Wendy J. Appleseed'
        }
      ],
      notes:
        'Plain text. You can use [Markdown](https://support.1password.com/markdown/) too.'
    }

    encodedSaveRequest = encodeOPSaveRequest(saveRequest)
  }

  $: if (downloadLinkRef && fileURL && onePasswordBtnRef) {
    downloadLinkRef.setAttribute(
      'download',
      `Webnative-RecoveryKit-${$sessionStore.username.trimmed}.txt`
    )

    downloadLinkRef.href = fileURL

    onePasswordBtnRef.setAttribute('value', encodedSaveRequest)
  }
</script>

<input type="checkbox" id="recovery-kit-modal" checked class="modal-toggle" />
<div class="modal !z-max">
  <div
    class="modal-box w-narrowModal sm:w-wideModal relative text-center sm:!pr-11 sm:!pb-11 sm:!pl-11"
  >
    <button
      class="btn btn-xs btn-circle absolute right-2 top-2"
      on:click={handleToggleModal}
    >
      ✕
    </button>

    <div>
      {#await recoveryKitPromise}
        <h3 class="mb-7 text-base">Creating your recovery kit...</h3>

        <div class="flex items-center justify-center text-base-content">
          <span
            class="rounded-lg border-t-2 border-l-2 border-base-content w-4 h-4 inline-block animate-spin mr-2"
          />
        </div>
      {:then}
        <h3 class="mb-7 text-base">Your recovery kit has been created!</h3>

        <div class="text-left mb-6">
          <p class="mb-2">Please store it somewhere safe for two reasons:</p>
          <ol class="list-decimal mb-2 pl-6">
            <li>
              <strong>It is powerful:</strong>
              Anyone with this recovery kit will have access to all of your private
              data.
            </li>
            <li>
              <strong>It's your backup plan:</strong>
              If you lose access to your connected devices, this kit will help you
              recover your private data.
            </li>
          </ol>
          <p>
            So, keep it somewhere you keep things you don't want to lose or have
            stolen.
          </p>
        </div>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="btn btn-primary w-[227px] gap-2 mb-4"
          bind:this={downloadLinkRef}
        >
          <Download /> Download recovery kit
        </a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <button
          class="onepassword-button w-[227px] btn btn-primary gap-2 !bg-gradient-to-tr !from-[#0572EC] !to-[#0364D3] !text-neutral-50"
          bind:this={onePasswordBtnRef}
          data-onepassword-type="credit-card"
          lang="en"
          data-theme="dark"
        >
          <OnePassword /> Save in 1Password
        </button>
      {/await}
    </div>
  </div>
</div>
