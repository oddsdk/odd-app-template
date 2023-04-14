<script lang="ts">
  import { themeStore } from '$src/stores'
</script>

<section
  class="overflow-hidden {$themeStore.selectedTheme === 'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div class="p-6 md:p-8 pb-6 w-full">Sequences go here</div>
</section>
