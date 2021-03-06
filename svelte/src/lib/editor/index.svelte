<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/env';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Highlight from '@tiptap/extension-highlight';
	import Underline from '@tiptap/extension-underline';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import Image from '@tiptap/extension-image';
	import YouTube from '@tiptap/extension-youtube';
	import Link from '@tiptap/extension-link';
	import suggestion from './suggestion';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import Commands from './command';
	import CommandList from './CommandList.svelte';
	import { slashVisible, slashItems, slashProps, editorWidth } from '$lib/stores';

  // Drag items.. take wit with a grain of salt
  import DraggableItem from './DraggableItem.js'

  import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    CodeIcon,
    Link2Icon,
    TypeIcon
  } from "svelte-feather-icons";


	export let content;
	let output = false;
	let outputType;

	let selectedIndex = 0;
	$: selectedIndex = $slashVisible ? selectedIndex : 0;
	$: $editorWidth = w ? w : '0';

	function handleKeydown(event) {
		if (!$slashVisible) return;
		if (event.key === 'ArrowUp') {
			event.preventDefault();

			upHandler();
			return true;
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			downHandler();
			return true;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			enterHandler();
			return true;
		}

		return false;
	}

	function upHandler() {
		selectedIndex = (selectedIndex + $slashItems.length - 1) % $slashItems.length;
	}

	function downHandler() {
		selectedIndex = (selectedIndex + 1) % $slashItems.length;
	}

	function enterHandler() {
		selectItem(selectedIndex);
	}
	function selectItem(index) {
		const item = $slashItems[index];

		if (item) {
			//editor.chain().focus().toggleBold().run();
			//return console.log(item);
			let range = $slashProps.range;
			item.command({ editor, range });
		}
	}

	let element, editor, w, bubbleMenuElement;

	onMount(() => {
		if (browser) {
			editor = new Editor({
				element: element,
				editorProps: {
					attributes: {
						class: 'focus:outline-none flex flex-col items-center px-3 md:px-0'
					}
				},
				extensions: [
					StarterKit,
					Placeholder,
					TaskList,
					TaskItem,
					Link,
          Underline,
          Dropcursor.configure({
            class: 'text-primary',
            // color: '#ff0000',
            width: 5,
          }),
          BubbleMenu.configure({
            element: bubbleMenuElement
          }),
          YouTube.configure({
            nocookie: true,
            allowFullscreen: false, // todo: this doenst' seem to work, it is alwasy true
          }),
          Image,
          Highlight.configure({
            multicolor: true,
          }),
					Commands.configure({
						suggestion
					})
				],
				content,
				onTransaction: () => {
					// force re-render so `editor.isActive` works as expected
					editor = editor;
				},
				onUpdate: ({ editor }) => {
					// send the content to an API here
				}
			});
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>
<div class="sm:flex my-4">
  <button
    on:click={() => {
			output = editor.getJSON();
			outputType = 'json';
		}}
    class="m-2 border rounded-full px-4 py-2 border-slate-500 {outputType == 'json'
			? 'bg-blue-200'
			: ''}">See JSON Output</button
  >
  <button
    on:click={() => {
			output = editor.getHTML();
			outputType = 'html';
		}}
    class=" m-2 border rounded-full px-4 py-2 border-slate-500 {outputType == 'html'
			? 'bg-blue-200'
			: ''}">See HTML Output</button
  >
</div>

{#if editor}
  <div class="editor sticky top-[0px] z-[100]">
    <div class="bg-base-100 p-3">
      <button
        on:click={() => console.log && editor.chain().focus().toggleBold().run()}
        class={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        on:click={() => editor.chain().focus().toggleItalic().run()}
        class={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        on:click={() => editor.chain().focus().toggleStrike().run()}
        class={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCode().run()}
        class={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button on:click={() => editor.chain().focus().unsetAllMarks().run()}> clear marks </button>
      <button on:click={() => editor.chain().focus().clearNodes().run()}> clear nodes </button>
      <button
        on:click={() => editor.chain().focus().setParagraph().run()}
        class={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBulletList().run()}
        class={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleOrderedList().run()}
        class={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        on:click={() => editor.chain().focus().toggleCodeBlock().run()}
        class={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        on:click={() => editor.chain().focus().toggleBlockquote().run()}
        class={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button on:click={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button on:click={() => editor.chain().focus().setHardBreak().run()}> hard break </button>
      <button on:click={() => editor.chain().focus().undo().run()}> undo </button>
      <button on:click={() => editor.chain().focus().redo().run()}> redo </button>
    </div>
  </div>
{/if}

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
        <CodeIcon/>
      </span>
    <span
      class="button"
      on:click={() => editor.chain().focus().toggleCodeBlock().run()}
      class:active={editor.isActive("customNode")}
    >
        <CodeIcon/>
      </span>
    <span
      class="button"
      on:click={() => editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run()}
      class:active={editor.isActive("customNode")}
    >
        <CodeIcon/>
      </span>
    <span
      class="button"
      on:click={() => editor.chain().focus().toggleHighlight({ color: '#ff0011' }).run()}
      class:active={editor.isActive("customNode")}
    >
        <CodeIcon/>
      </span>
  {/if}
</div>
<div bind:this={element} />

<div class="prose" bind:clientWidth={w}>
	<div bind:this={element} on:keydown|capture={handleKeydown} />
</div>

<CommandList {selectedIndex} />


{#if output}
	<div class="sm:flex flex-row-reverse">
		<button
			class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
			on:click={() => (output = false)}
		>
			Clear output
		</button>
		<button
			class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
			on:click={() => navigator.clipboard.writeText(JSON.stringify(output))}
		>
			Copy output
		</button>
	</div>
	{JSON.stringify(output)}
{/if}

<style>

/*    Bubble */

.button{
    @apply  bg-base-100 cursor-pointer border-l
}
.button.active{
    @apply bg-base-300 cursor-pointer
}


  /* ----- */
:global(.prose p){
    @apply my-1
}
	:global(h1, h2, h3, h4, h5, h6, p, ul, ol) {
		width: 100%;
	}
	:global(.ProseMirror h1, .ProseMirror h2, .ProseMirror h3) {
		margin-bottom: 0.5rem;
	}

	:global(.ProseMirror p.is-empty::before) {
		content: "Type '/' for commands";
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h1.is-empty::before) {
		content: 'Heading 1';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h2.is-empty::before) {
		content: 'Heading 2';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h3.is-empty::before) {
		content: 'Heading 3';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h4.is-empty::before) {
		content: 'Heading 4';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h5.is-empty::before) {
		content: 'Heading 5';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h6.is-empty::before) {
		content: 'Heading 6';
		color: #adb5bd;
		float: left;
		height: 0;
	}

	:global ul[data-type='taskList'] {
		list-style: none;
		padding-left: 2px;
	}
	:global ul[data-type='taskList'] li {
		display: flex;
		align-items: top;
	}
	:global ul[data-type='taskList'] li p {
		margin: 0;
	}
	:global ul[data-type='taskList'] li label {
		padding-right: 18px;
	}
	:global ul[data-type='taskList'] li label input {
		border-radius: 0.25rem;
		border-color: #cbd5e1;
	}

</style>
