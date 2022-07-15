<script>
  import { page } from '$app/stores'
  // import {dialog } from 'electron'

  console.log("🎹  page",$page );
  $: url = $page.params.page
  $: path = $page.url.searchParams.get('path')

  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
</script>



<img class="w-full h-[200px] object-cover" src="https://i.pinimg.com/550x/6f/42/db/6f42dbaef1e190b3f35350c27e694e1d.jpg" alt="">

{url}

