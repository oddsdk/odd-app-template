<script lang="ts">
  import { sessionStore } from '$src/stores'

  $: usernameParts = $sessionStore?.username?.full?.split('#')
</script>

{usernameParts[0]}
<span class="text-neutral-500 -ml-[3px]">
  #{usernameParts[1].substring(0, 12)}...{usernameParts[1].substring(
    usernameParts[1].length - 5
  )}
</span>
