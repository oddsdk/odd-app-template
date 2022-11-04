<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores'
  import { handleFileInput } from '$lib/account-settings'
  import Avatar from '$components/settings/Avatar.svelte'

  // Handle a file uploaded directly through the file input
  let files: FileList
  $: if (files) {
    const file = Array.from(files)[0]
    handleFileInput(file)
  }
</script>

<h3 class="text-lg mb-4">Avatar</h3>
<div class="flex items-center gap-4">
  <Avatar />

  <label for="upload-avatar" class="btn btn-outline">Upload a new avatar</label>
  <input
    bind:files
    id="upload-avatar"
    type="file"
    accept="image/*"
    class="hidden"
  />
</div>
