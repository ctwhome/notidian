<script>
  import { files } from "../lib/files.store.ts";

  function filed(event) {
    console.log("🎹 no filtered", event.target.files);
    const clean = Object.values(event.target.files).filter(file => file.name !=='.DS_Store');
    console.log("🎹 clean", clean);
    files.set(clean);
  }
</script>

<img class="w-full h-[200px] object-cover" src="https://i.redd.it/8znbrku29lg71.png" alt="">

<input type="file" multiple webkitdirectory on:change={filed} />

