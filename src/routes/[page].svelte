<script>
  import { files } from "../lib/files.store.ts";

  function filed(event) {
    console.log("🎹 event", event.target.files);
    files.set(event.target.files);

  }
</script>



<img class="w-full h-[200px] object-cover" src="https://i.pinimg.com/550x/6f/42/db/6f42dbaef1e190b3f35350c27e694e1d.jpg" alt="">


<input type="file" multiple webkitdirectory on:change={filed} />

