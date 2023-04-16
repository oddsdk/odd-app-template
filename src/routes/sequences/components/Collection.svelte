<script lang="ts">
  import { themeStore } from '$src/stores'
</script>

<section
  class="min-h-[calc(100vh-190px)] overflow-hidden {$themeStore.selectedTheme ===
  'light'
    ? 'text-gray-800'
    : 'text-gray-200'}"
>
  <div
    class="grid grid-flow-row grid-rows-[6rem_auto] w-full min-h-[calc(100vh-190px)] p-6 md:p-8 pb-6"
  />
</section>
