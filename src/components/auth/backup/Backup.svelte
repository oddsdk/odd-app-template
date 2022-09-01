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
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div id="backup-message" class="peer-checked:hidden">
      <h3 class="mb-7 text-xl font-serif">Backup your account</h3>
      <p class="mt-8 mb-4">
        Your {appName} account & its data live only on your devices.
      </p>

      <p class="mt-8 mb-4">
        We highly recommend connecting your account on at least one more device,
        so that you have a backup.
      </p>

      <button class="btn btn-primary" on:click={() => goto('delegate-account')}>
        Connect a backup device
      </button>
      <button
        class="btn btn-xs btn-link text-base font-normal underline mt-4"
        on:click={() => navigate('are-you-sure')}
      >
        Skip for now
      </button>
    </div>
  </div>
</div>
