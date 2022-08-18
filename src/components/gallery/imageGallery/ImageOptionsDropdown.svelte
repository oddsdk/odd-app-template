<script lang="ts">
  import { deleteImageFromWNFS } from '$lib/gallery'

  export let fileName: string

  const handleDeleteImage: () => Promise<void> = async () =>
    deleteImageFromWNFS(fileName)
</script>

<!-- dropdown-hover -->
<div class="absolute -top-1 right-2">
  <div class="dropdown dropdown-hover dropdown-left">
    <div tabindex="0" class="dots cursor-pointer text-base-100" />
    <ul
      tabindex="0"
      class="dropdown-content menu !top-4 p-1 shadow bg-neutral rounded"
    >
      <li class="text-right">
        <button
          class="btn btn-xs btn-link text-sm p-0 font-normal"
          on:click={handleDeleteImage}
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</div>

<style>
  .dots:after {
    content: '\22EE';
    font-size: 40px;
  }
</style>
