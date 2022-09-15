<script lang="ts">
  export let activity: 'Initializing' | 'Loading'
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box rounded-lg shadow-sm bg-slate-100 w-80 relative text-center dark:bg-slate-900 dark:border-slate-600 dark:border "
  >
    <p class="text-slate-500 dark:text-slate-50">
      <span
        class="rounded-lg border-t-2 border-l-2 border-slate-500 dark:border-slate-50 w-4 h-4 inline-block animate-spin mr-1"
      />
      {activity} file system...
    </p>
  </div>
</div>
