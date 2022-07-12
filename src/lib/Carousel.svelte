<script>
  import { fade } from 'svelte/transition'

  const gallery_items = [{
    url: 'https://picsum.photos/id/237/400/300',
    description: 'Dog'
  }, {
    url: 'https://picsum.photos/id/238/400/300',
    description: 'Building'
  }, {
    url: 'https://picsum.photos/id/240/400/300',
    description: 'Staircase'
  }]

  let currentSlideItem = 0;

  const nextImage = () => {
    currentSlideItem = (currentSlideItem + 1) % gallery_items.length;
  }

  const prevImage = () => {
    if (currentSlideItem != 0) {
      currentSlideItem = (currentSlideItem - 1) % gallery_items.length;
    } else {
      currentSlideItem = gallery_items.length - 1;
    }
  }
</script>

{#each [gallery_items[currentSlideItem]] as item (currentSlideItem)}
  <img class="cursor-pointer" in:fade src={item.url} alt={item.description} width={400} height={300} on:click={() => nextImage()}/>
{/each}
<div class="carousel-buttons flex gap-1">
    <button on:click={() => prevImage()}>◀</button>
  {#each gallery_items as item, i (i)}
    <img class="cursor-pointer {currentSlideItem === i && 'ring-offset-0 border-primary border '}" on:click={()=>currentSlideItem = i } src={item.url} axlt={item.description} width={50} height={50}/>
  {/each}
    <button on:click={() => nextImage()}>▶</button>
</div>
