<script lang="ts">
  export let images = []
</script>

<div class="carousel w-full">
  {#each images as image, index}
    <div id={`slide${index + 1}`} class="carousel-item relative w-full">
      <img src={image.src} alt={image.name} class="w-full" />
      <div
        class="absolute flex justify-between transform -translate-y-1/2 top-1/2 right-5 left-5"
      >
        {#if index > 0}
          <a href={`#slide${index}`} class="btn btn-circle ml-right">❮</a>
        {/if}
        {#if index < images.length}
          <a href={`#slide${index + 2}`} class="btn btn-circle ml-auto">❯</a>
        {/if}
      </div>
    </div>
  {/each}
</div>
