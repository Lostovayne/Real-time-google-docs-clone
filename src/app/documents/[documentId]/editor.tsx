"use client";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import { useEditorStore } from "@/store/use-editor-store";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
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
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      Heading,
      FontFamily,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      TextStyle,
      Code,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({ nested: true }),
      TaskList,
      Underline,
    ],
    content: `
        <h1 className="text-6xl font-bold">Deus Editor</h1>

        <p>
          This is a simple example of what you can do with TipTap. You can use
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



        <img src="https://imgv3.fotor.com/images/side/Use-Fotors-Instagram-photo-editor-to-make-various-Instagram-photo-edits.jpg" />


      `,
    immediatelyRender: false,
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
