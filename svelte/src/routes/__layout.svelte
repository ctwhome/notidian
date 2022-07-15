<script>
  import "../app.css";
  import NavigationBar from "../lib/NavigationBar.svelte";
  import Header from "../lib/header/Header.svelte";

</script>


<main class="flex flex-col w-screen h-screen bg-base-100 ">
  <div class="fixed w-full top-0 z-10 bg-base-200 saturate-[180%] bg-opacity-70 backdrop-blur-md flex justify-center h-[30px]"
       style="-webkit-app-region: drag">
    Page title
  </div>
  <div class="flex pt-[30px] overflow-hidden">
    <NavigationBar />
    <div class="w-full h-[calc(100vh+30px)] overflow-scroll -mt-[30px] pt-[30px]">
      <slot />
    </div>

  </div>

</main>
