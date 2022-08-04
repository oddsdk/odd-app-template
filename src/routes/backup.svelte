<script lang="ts">
  import type { BackupView } from '$lib/views'
  import Backup from '$components/auth/backup/Backup.svelte'
  import BackupDevice from '$components/auth/backup/BackupDevice.svelte'
  import AreYouSure from '$components/auth/backup/AreYouSure.svelte'

  let view: BackupView = 'backup'

  const navigate = (event: CustomEvent<{ view: BackupView }>) => {
    view = event.detail.view
  }
</script>

{#if view === 'backup'}
  <Backup on:navigate={navigate} />
{:else if view === 'backup-device'}
  <BackupDevice on:navigate={navigate} />
{:else if view === 'are-you-sure'}
  <AreYouSure on:navigate={navigate} />
{/if}
