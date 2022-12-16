<script lang="ts">
  import { goto } from '$app/navigation'

  import { RECOVERY_STATES } from '$lib/auth/account'
  import RightArrow from '$components/icons/RightArrow.svelte'
  import Upload from '$components/icons/Upload.svelte'

  export let handleFileInput: (files: FileList) => Promise<void>
  export let state: RECOVERY_STATES

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
