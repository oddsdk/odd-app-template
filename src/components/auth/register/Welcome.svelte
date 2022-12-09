<script lang="ts">
  import { appName } from '$lib/app-info'
  import { sessionStore } from '../../../stores'
  import WelcomeCheckIcon from '$components/icons/WelcomeCheckIcon.svelte'
</script>

<input type="checkbox" id="link-device-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-narrowModal relative text-center">
    <div>
      <h3 class="mb-14 text-base">
        Welcome, {$sessionStore.username.trimmed}!
      </h3>
      <div class="flex justify-center mb-11 text-base-content">
        <WelcomeCheckIcon />
      </div>
      <div>
        <p class="mb-4 text-left">Your account has been created.</p>

        <div class="mb-8 text-left">
          <input type="checkbox" id="password-message" class="peer hidden" />
          <label
            class="text-blue-500 underline mb-8 hover:cursor-pointer peer-checked:hidden"
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
