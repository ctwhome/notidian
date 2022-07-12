<script>
  import { files } from "../lib/files.store.ts";
  import DaisyuiThemeSwitcher from "$lib/DaisyuiThemeSwitcher.svelte";
</script>

<div class="flex flex-col gap-3 bg-base-200 p-4 h-full w-full max-w-[280px] ">
  <DaisyuiThemeSwitcher />
  <a class="btn btn-xs" href="/">Home</a>
  <a class="btn btn-xs" href="/about">About page</a>
  {#each $files as file}
    <div class="flex">
      <a class="line-clamp-1 flex-grow " href={file.name+'?path='+file.path}>{file.name}?{file.path} ss</a>
      <div class="btn btn-xs ml-2">m</div>
    </div>
<!--    <div class="line-clamp-1 flex-grow " on:click={window.open(`${file.path}`)}>{file.name}</div>-->
<!--      <div class="btn btn-xs ml-2">m</div>-->
<!--    </div>-->
  {/each}

</div>
