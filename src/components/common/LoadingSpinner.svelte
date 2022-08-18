<div
  class="loader ease-linear rounded-full border-4 border-t-4 border-neutral h-16 w-16"
/>

<style>
  .loader {
    border-top-color: #3498db;
    animation: spinner 1s linear infinite;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
