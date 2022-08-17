<script lang="ts">
  import { deleteImageFromWNFS } from '$lib/gallery'

  export let fileName: string

  const handleDeleteImage: () => Promise<void> = async () =>
    deleteImageFromWNFS(fileName)
</script>

<div class="absolute top-0 right-4">
  <div class="dropdown dropdown-end">
    <div tabindex="0" class="dots cursor-pointer text-base-100" />
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><button on:click={handleDeleteImage}>Delete Image</button></li>
    </ul>
  </div>
</div>

<style>
  .dots:after {
    content: '\22EE';
    font-size: 50px;
  }
</style>
