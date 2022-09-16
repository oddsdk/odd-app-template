<script lang="ts">
  import { page } from '$app/stores'

  import { extractSearchParam } from '$lib/utils'
  import type { BackupView } from '$lib/views'
  import AreYouSure from '$components/auth/backup/AreYouSure.svelte'
  import Backup from '$components/auth/backup/Backup.svelte'

  let view = extractSearchParam($page.url, 'view') ?? 'backup'

  const navigate = (event: CustomEvent<{ view: BackupView }>) => {
    view = event.detail.view
  }
</script>

{#if view === 'backup'}
  <Backup on:navigate={navigate} />
{:else if view === 'are-you-sure'}
  <AreYouSure />
{/if}
