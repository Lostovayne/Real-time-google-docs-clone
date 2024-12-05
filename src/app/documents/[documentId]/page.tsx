import { FC, ReactElement } from "react";
import { Editor } from "./editor";

interface DocumentPageProps {
  // Prop types here
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentPage: FC<DocumentPageProps> = async ({ params }): Promise<ReactElement> => {
  const { documentId } = await params;
  console.log(documentId);
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F3F3F3]">
      <Editor />
    </div>
  );
};

export default DocumentPage;
