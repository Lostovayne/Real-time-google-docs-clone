"use client";
import Image from "@tiptap/extension-image";
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

const Editor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);

  const editor = useEditor({
    onCreate: ({ editor }) => {
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
      // Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({ nested: true }),
      TaskList,
    ],
    content: `
        <h1>ProseMirror</h1>
        <p>ProseMirror is a text editor library that allows you to build and use a text editor in a web browser.</p>
        <p>ProseMirror is a text editor library that allows you to build and use a text editor in a web browser.</p>

        <h2>Features</h2>
        <ul>
          <li>Rich text formatting</li>
          <li>Collaboration</li>
          <li>Customizable toolbar</li>
        </ul>

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
