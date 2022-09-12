<script lang="ts">
  import { goto } from '$app/navigation'
  import clipboardCopy from 'clipboard-copy'

  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'

  export let qrcode
  export let connectionLink: string
  export let backupCreated: boolean

  const copyLink = async () => {
    await clipboardCopy(connectionLink)
  }
</script>

<input type="checkbox" id="backup-device-modal" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div>
      <h3 class="pb-1 text-xl font-serif">Connect a backup device</h3>
      {@html qrcode}
      <p class="pt-1 mb-8">
        Scan this code on the new device, or share the connection link.
      </p>
      <button class="btn btn-primary btn-outline" on:click={copyLink}>
        <ClipboardIcon />
        <span class="ml-2">Copy connection link</span>
      </button>
      {#if !backupCreated}
        <button
          class="btn btn-xs btn-link text-base text-error font-normal underline mt-4"
          on:click={() => goto('/backup?view=are-you-sure')}
        >
          Skip for now
        </button>
      {/if}
    </div>
  </div>
</div>
