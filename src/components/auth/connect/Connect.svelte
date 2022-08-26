<script lang="ts">
  import { appName } from '$lib/app-name'
</script>

<input type="checkbox" id="my-modal-5" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <a href="/" class="btn btn-xs btn-circle absolute right-2 top-2">✕</a>

    <div>
      <h3 class="mb-7 text-xl font-serif">Connect to {appName}</h3>
      <div>
        <a class="btn btn-primary mb-5 w-full" href="/register">
          Create a new account
        </a>
        <a class="btn btn-primary btn-outline w-full" href="/link-device">
          I have an existing account
        </a>
      </div>
    </div>
  </div>
</div>
