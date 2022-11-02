<script lang="ts">
  export let activity: 'Initializing' | 'Loading'
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box rounded-lg shadow-sm w-narrowModal relative text-center"
  >
    <p class="flex items-center justify-center text-base-content">
      <span
        class="rounded-lg border-t-2 border-l-2 border-base-content w-4 h-4 inline-block animate-spin mr-2"
      />
      {activity} file system...
    </p>
  </div>
</div>
