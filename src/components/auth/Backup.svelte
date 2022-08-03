<script lang="ts">
  import { appName } from '$lib/app-name'
</script>

<input type="checkbox" id="backup-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div>
      <input type="checkbox" id="skip-backup" class="peer hidden" />
      <div id="backup-message" class="peer-checked:hidden">
        <h3 class="mb-7 text-xl font-serif">Backup your account</h3>
        <p class="mt-8 mb-4">
          Your {appName} account & its data live only on your devices.
        </p>

        <p class="mt-8 mb-4">
          We highly recommend backing up your account on at least one additional
          device.
        </p>

        <a class="btn btn-primary" href="/backup-device">
          Connect a backup device
        </a>
        <label
          class="text-primary underline mt-4 block hover:cursor-pointer peer-checked:hidden"
          for="skip-backup"
        >
          Skip for now
        </label>
      </div>
      <div id="are-you-sure" class="hidden peer-checked:block">
        <h3 class="mb-7 text-xl font-serif">Are you sure?</h3>

        <p class="mt-8 mb-6">
          Without a backup device, if you lose this device or reset your
          browser, you will not be able to recover your account data.
        </p>
        <a class="btn btn-primary" href="/backup">Connect a backup device</a>
        <a class="text-error underline block mt-4" href="/">
          YOLO&mdash;I'll risk just one device for now
        </a>
      </div>
    </div>
  </div>
</div>
