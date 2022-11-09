<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { goto } from '$app/navigation'

  import { appName } from '$lib/app-info'
  import type { BackupView } from '$lib/views'

  const dispatch = createEventDispatcher()

  const navigate = (view: BackupView) => {
    dispatch('navigate', { view })
  }
</script>

<input type="checkbox" id="backup-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-narrowModal relative text-center">
    <div id="backup-message" class="peer-checked:hidden">
      <h3 class="mb-8 text-base">Backup your account</h3>
      <p class="mb-5 text-left">
        Your {appName} account & its data live only on your devices.
      </p>

      <p class="mb-8 text-left">
        We highly recommend backing up your account on at least one additional
        device.
      </p>

      <button
        class="btn btn-primary"
        on:click={() => goto('/delegate-account')}
      >
        Connect a backup device
      </button>
      <button
        class="btn btn-xs btn-link text-sm underline mt-4"
        on:click={() => navigate('are-you-sure')}
      >
        Skip for now
      </button>
    </div>
  </div>
</div>
