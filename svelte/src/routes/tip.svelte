<script >
  import { onMount, onDestroy } from "svelte";
  import { Editor, Node } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import Placeholder from "@tiptap/extension-placeholder";
  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    Link2Icon,
    TypeIcon
  } from "svelte-feather-icons";

  let bubbleMenuElement;
  let element;
  let parentElement;
  let editor;

  onMount(() => {
    editor = new Editor({
      editorProps: {
        attributes: {
          class: "dt-prose"
        }
      },
      element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Write something..."
        }),
        BubbleMenu.configure({
          element: bubbleMenuElement
        })
      ],
      content: `<p class="">Write something...</p><p class="">Write something...</p><p class="">Write something...</p>`,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      }
    });
  });

  onDestroy(() => {
    editor && editor.destroy();
  });
</script>

<div className="dt-editor">
  <div class="flex gap-2 bg-base-100 p-1 rounded shadow-md" bind:this={bubbleMenuElement}>
    {#if editor}
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
    {/if}
  </div>

  <div bind:this={element} />
</div>

<style>
  .button{
      @apply btn-primary cursor-pointer
  }
  .button.active{
      @apply btn-secondary cursor-pointer
  }
</style>
