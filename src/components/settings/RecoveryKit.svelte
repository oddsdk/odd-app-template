<script lang="ts">
  import RecoveryKitModal from '$components/settings/RecoveryKitModal.svelte'

  let modalOpen = false

  const handleToggleModal = async () => (modalOpen = !modalOpen)
</script>

<div class="flex flex-col gap-4">
  <h3 class="text-lg">Recovery Kit</h3>
  <p>
    Your recovery kit will restore access to your data in the event that you
    lose access to all of your connected devices. We recommend you store your
    kit in a safe place, separate from those devices.
  </p>

  <button class="btn btn-primary w-fit" on:click={handleToggleModal}>
    Create your recovery kit
  </button>
</div>

{#if modalOpen}
  <RecoveryKitModal {handleToggleModal} />
{/if}
