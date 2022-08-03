<script lang="ts">
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte'
  import { appName } from '$lib/appName'
</script>

<input type="checkbox" id="backup-device-modal" checked class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-80 relative text-center">
    <div>
      <input type="checkbox" id="skip-backup" class="peer hidden" />
      <div id="connect-device" class="peer-checked:hidden">
        <h3 class="mb-7 text-xl font-serif">Connect a backup device</h3>

        <!-- GIANT QR CODE GOES HERE -->
        QR Codes

        <p class="mt-8 mb-4">
          Scan this code on the new device, or share the connection link.
        </p>

        <a class="btn btn-primary btn-outline" href="/backup">
          <ClipboardIcon />
          <span class="ml-2">Copy connection link</span>
        </a>
        <label
          class="text-error underline mt-4 block hover:cursor-pointer peer-checked:hidden"
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
        <label class="btn btn-primary" for="skip-backup">
          Connect a backup device
        </label>
        <a class="text-error underline block mt-4" href="/">
          YOLO&mdash;I'll risk just one device for now
        </a>
      </div>
    </div>
  </div>
</div>
