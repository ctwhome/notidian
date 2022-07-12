<script>
  import { files } from "../lib/files.store.ts";

  function filed(event) {
    console.log("🎹 event", event.target.files);
    files.set(event.target.files);
  }
</script>

<img class="w-full h-[200px] object-cover" src="https://i.redd.it/8znbrku29lg71.png" alt="">

<input type="file" multiple webkitdirectory on:change={filed} />

