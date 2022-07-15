<script>
  import { files } from "../lib/files.store.ts";
  import { onMount } from "svelte";
  // import {ipcRenderer} from "electron";
  function filed(event) {
    console.log("🎹 no filtered", event.target.files);
    const clean = Object.values(event.target.files).filter(file => file.name !=='.DS_Store');
    console.log("🎹 clean", clean);
    files.set(clean);
  }

  let version
  async function clicki()  {

    let myJson = {data:"goes here"};
     version = await window.electron.NameIt()
      // console.log("🎹 nameit", await window.electron.NameIt('null', 'ha'));

    let responseText = await window.electron.write('',myJson);
    console.log("🎹 r",responseText );
    // window.webContents.send('asynchronous-message', {'SAVED': 'File Saved'});
    // const result = await ipcRenderer.invoke('my-invokable-ipc', {"hello": "world"});
    // console.log("🎹 result", result);
    // ...
  }

let c
  onMount(()=>{
      window.electron.GetCounter((event,counter)=> {
        c = counter
        })

   /* document.getElementById('drag').ondragstart = (event, counter) => {
      console.log("🎹 event",event, counter );
      // event.preventDefault()
      window.electron.startDrag('drag-and-drop.md')

    }*/
  })


</script>
{c}
<img class="w-full h-[200px] object-cover" src="https://i.redd.it/8znbrku29lg71.png" alt="">
{version}
<button on:click={clicki}>CLICK</button>
<input type="file" multiple webkitdirectory on:change={filed} />
<div id="drag" class="w-20 h-20 bg-blue-300"></div>
