<script>
  import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    Link2Icon,
    TypeIcon
  } from "svelte-feather-icons";

</script>
<span
  class="button"
  on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  class:active={editor.isActive("heading", { level: 2 })}
>
        <TypeIcon />
      </span>
<span
  class="button"
  on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
  class:active={editor.isActive("heading", { level: 3 })}
>
        <TypeIcon  />
      </span>
<span
  class="button"
  on:click={() => editor.chain().focus().toggleBold().run()}
  class:active={editor.isActive("bold")}
>
        <BoldIcon />
      </span>
<span
  class="button"
  on:click={() => editor.chain().focus().toggleItalic().run()}
  class:active={editor.isActive("italic")}
>
        <ItalicIcon />
      </span>
<span
  class="button"
  on:click={() => editor.chain().focus().toggleCodeBlock().run()}
  class:active={editor.isActive("customNode")}
>
        <CodeIcon />
      </span>
