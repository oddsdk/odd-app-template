<script lang="ts">
  import { sessionStore } from '$src/stores'
</script>

<div>
  <h3 class="text-lg mb-4">Username</h3>
  <p>{$sessionStore.username}</p>
</div>
