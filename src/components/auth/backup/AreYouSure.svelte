<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type { BackupView } from '$lib/views'

  const dispatch = createEventDispatcher()

  const navigate = (view: BackupView) => {
    dispatch('navigate', { view })
  }
</script>

<input type="checkbox" id="are-you-sure-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div>
      <h3 class="mb-7 text-xl font-serif">Are you sure?</h3>

      <p class="mt-8 mb-6">
        Without a backup device, if you lose this device or reset your browser,
        you will not be able to recover your account data.
      </p>
      <button
        class="btn btn-primary"
        on:click={() => navigate('backup-device')}
      >
        Connect a backup device
      </button>
      <a class="text-error underline block mt-4" href="/">
        YOLO&mdash;I'll risk just one device for now
      </a>
    </div>
  </div>
</div>
