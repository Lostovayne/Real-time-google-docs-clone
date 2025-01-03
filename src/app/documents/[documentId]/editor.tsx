"use client";

import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import { FontSize } from "@/extensions/font-size";
import { useEditorStore } from "@/store/use-editor-store";
import { EditorContent, useEditor } from "@tiptap/react";
import { common, createLowlight } from "lowlight";

const Editor = () => {
	const { setEditor } = useEditorStore();
	const lowlight = createLowlight();
	lowlight.register(common);

	const editor = useEditor({
		onCreate: ({ editor }) => {
			setEditor(editor);
		},
		onDestroy: () => {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor);
		},

		editorProps: {
			attributes: {
				style: "padding-left: 56px; padding-right:56px;",
				class:
					"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
			}
		},
		extensions: [
			StarterKit,
			FontSize,
			Heading,
			FontFamily,
			Color,
			TextAlign.configure({
				types: ["heading", "paragraph"]
			}),
			Highlight.configure({
				multicolor: true
			}),
			CodeBlockLowlight.configure({
				lowlight,
				defaultLanguage: "javascript"
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https"
			}),
			TextStyle,
			Code,
			ImageResize,
			Image,
			Table,
			TableCell,
			TableHeader,
			TableRow,
			TaskItem.configure({ nested: true }),
			TaskList,
			Underline
		],
		content: `
        <h1 className="text-6xl font-bold">Google Docs Editor </h1>

        <p>
          This is a simple example of what you can do with Demo. You can use
          it to create rich text editors. You can also use it to create simple
          text editors.
        </p>

        <p className="italic">
          This is an example of italic text. You can use it to add emphasis to
          your text.
        </p>

        <p className="font-bold">
          This is an example of bold text. You can use it to add emphasis to your
          text.
        </p>

        <ul>
          <li>This is a list of items</li>
          <li>This is another item</li>
        </ul>

        <p>
          This is a paragraph of text. You can use it to add a block of text to
          your document.
        </p>

        <p>
          You can also add code blocks. This is an example of a code block.
        </p>

        <pre><code>
          const saludar = (nombre) => {
            return \`Hola, \${nombre}\`;
          };
          console.log(saludar("Mundo"));
        </code></pre>

        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" />


      `,
		immediatelyRender: false
	});

	return (
		<div className="size-full overflow-x-auto bg-[#F9FBFD] min-h-screen px-4 print:p-0 print:bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default Editor;
