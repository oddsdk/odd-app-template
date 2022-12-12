<script lang="ts">
  import { page } from '$app/stores'

  import { extractSearchParam } from '$lib/utils'
  import type { RecoveryView } from '$lib/views'
  import HasRecoveryKit from '$components/auth/recover/HasRecoveryKit.svelte'
  import NoRecoveryKit from '$components/auth/recover/NoRecoveryKit.svelte'

  let view = extractSearchParam($page.url, 'view') ?? 'has-recovery-kit'

  const navigate = (event: CustomEvent<{ view: RecoveryView }>) => {
    view = event.detail.view
  }
</script>

{#if view === 'has-recovery-kit'}
  <HasRecoveryKit on:navigate={navigate} />
{:else if view === 'no-recovery-kit'}
  <NoRecoveryKit on:navigate={navigate} />
{/if}
