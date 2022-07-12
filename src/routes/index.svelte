<script lang="ts">
  // import { writeText, readText, readtau } from "@tauri-apps/api/clipboard";

  import Editor from "$lib/editor/index.svelte";
  import content from "./content.json";
  import Carousel from "../lib/Carousel.svelte";

  let value = "You can type here and copy the value to the clipboard!";

  async function copyToClipboard(text) {
    console.log("hello");
    // await writeText(text);
    //assert(await readText(), 'Tauri is awesome!');
  }
</script>


<img class="w-full h-[200px] object-cover" src="https://i.pinimg.com/550x/6f/42/db/6f42dbaef1e190b3f35350c27e694e1d.jpg" alt="">
<div class="container mx-auto p-5">

  <h1 class="text-3xl font-bold">
    Welcome to <a target="_blank" href="https://tauri.app">Tauri</a> -
    <a target="_blank" href="https://kit.svelte.dev">SvelteKit</a>
    -
    <a target="_blank" href="https://tailwindcss.com/"> TailwindCss </a>
  </h1>
  <p>By <a target="_blank" href="https://ctwhome.com">@ctwhome</a></p>
  <!--  <p class="mt-10 bg-amber-300">-->
  <!--    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation-->
  <!--  </p>-->
  <!--  <textarea name="input" bind:value cols="60" rows="10" class="w-full" />-->
  <!--  <div class="btn" on:click={() => copyToClipboard(value)}>-->
  <!--    Copy text to clipboard-->
  <!--  </div>-->
</div>

<div class="container mx-auto p-5">
  <Carousel />
  <Editor {content} />
</div>


