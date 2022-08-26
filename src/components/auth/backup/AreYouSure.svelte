<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { filesystemStore, sessionStore } from '../../../stores'
  import { setBackupStatus } from '$lib/auth/backup'
  import type { BackupView } from '$lib/views'
  import { goto } from '$app/navigation'

  const dispatch = createEventDispatcher()

  const navigate = (view: BackupView) => {
    dispatch('navigate', { view })
  }

  const skipBackup = () => {
    setBackupStatus($filesystemStore, { created: false })

    sessionStore.update(session => ({
      ...session,
      backupCreated: false
    }))

    goto('/')
  }
</script>

<input type="checkbox" id="are-you-sure-modal" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div>
      <h3 class="mb-7 text-xl font-serif">Are you sure?</h3>

      <p class="mt-8 mb-6">
        Without a backup device, if you lose this device or reset your browser,
        you will not be able to recover your account data.
      </p>
      <button class="btn btn-primary" on:click={() => goto('delegate-account')}>
        Connect a backup device
      </button>
      <span
        class="text-error underline block mt-4 cursor-pointer"
        on:click={skipBackup}
      >
        YOLO&mdash;I'll risk just one device for now
      </span>
    </div>
  </div>
</div>
