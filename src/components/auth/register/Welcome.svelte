<script lang="ts">
  import { sessionStore } from '../../../stores'
  import WelcomeCheckIcon from '$components/icons/WelcomeCheckIcon.svelte'
  import { appName } from '$lib/app-info'
</script>

<input type="checkbox" id="link-device-modal" checked class="modal-toggle" />
<div class="modal">
  <div
    class="modal-box w-80 relative text-center dark:border-slate-600 dark:border"
  >
    <div>
      <h3 class="mb-7 text-xl font-serif">
        Welcome, {$sessionStore.username}!
      </h3>
      <div class="flex justify-center">
        <span>
          <WelcomeCheckIcon />
        </span>
      </div>
      <div>
        <p class="mt-8 mb-4">Your account has been created.</p>

        <div class="mb-8">
          <input type="checkbox" id="password-message" class="peer hidden" />
          <label
            class="text-primary underline mb-8 hover:cursor-pointer peer-checked:hidden"
            for="password-message"
          >
            Wait&mdash;what's my password?
          </label>
          <p class="hidden peer-checked:block">
            You don't need a password! <br />
            {appName} uses public key cryptography to authenticate you with this
            device.
          </p>
        </div>

        <a class="btn btn-primary" href="/backup">Continue</a>
      </div>
    </div>
  </div>
</div>
