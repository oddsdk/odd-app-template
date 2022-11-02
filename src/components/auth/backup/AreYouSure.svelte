<script lang="ts">
  import { goto } from '$app/navigation'

  import { filesystemStore, sessionStore } from '../../../stores'
  import { setBackupStatus } from '$lib/auth/backup'

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
  <div class="modal-box w-narrowModal relative text-center">
    <div>
      <h3 class="mb-8 text-base">Are you sure?</h3>

      <p class="mb-7 text-left">
        Without a backup device, if you lose this device or reset your browser,
        you will not be able to recover your account data.
      </p>

      <button
        class="btn btn-primary"
        on:click={() => goto('/delegate-account')}
      >
        Connect a backup device
      </button>
      <span
        class="text-error underline block mt-4 text-sm text-red-600 cursor-pointer"
        on:click={skipBackup}
      >
        YOLO&mdash;I'll risk just one device for now
      </span>
    </div>
  </div>
</div>
