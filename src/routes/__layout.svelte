<script>
  import DaisyuiThemeSwitcher from "$lib/DaisyuiThemeSwitcher.svelte";

  import "../app.css";
  import NavigationBar from "../lib/NavigationBar.svelte";
</script>

<div class="flex sticky  top-0 z-50">




  <DaisyuiThemeSwitcher />
</div>

<div class="flex">
  <NavigationBar />
  <div class="w-full">

  <slot/>
  </div>
</div>
