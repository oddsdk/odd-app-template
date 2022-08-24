<script lang="ts">
  import { page } from '$app/stores'
  import type { BackupView } from '$lib/views'
  import Backup from '$components/auth/backup/Backup.svelte'
  import AreYouSure from '$components/auth/backup/AreYouSure.svelte'

  let url = $page.url
  let view = url.searchParams.get('view') ?? 'backup'

  // clear the params
  url.searchParams.delete('view')
  history.replaceState(null, document.title, url.toString())

  const navigate = (event: CustomEvent<{ view: BackupView }>) => {
    view = event.detail.view
  }
</script>

{#if view === 'backup'}
  <Backup on:navigate={navigate} />
{:else if view === 'are-you-sure'}
  <AreYouSure on:navigate={navigate} />
{/if}
