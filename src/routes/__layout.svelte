<script>
  import DaisyuiThemeSwitcher from "$lib/DaisyuiThemeSwitcher.svelte";

  import "../app.css";
</script>

<div class="flex sticky  top-0 z-50">


  <a class="btn" href="/">Home</a>
  <a class="btn" href="/about">About page</a>

  <DaisyuiThemeSwitcher />
</div>
<slot />
