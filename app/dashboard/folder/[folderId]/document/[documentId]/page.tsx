// app/dashboard/folder/[folderId]/document/[documentId]/page.tsx

import { getDocumentById, getFolderById } from "@/server/docs";
import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";

export default async function DocumentPage({ params }: { params: { documentId: string } }) {
    const { documentId } = await params;
    const document = await getDocumentById(documentId);
    const folder = await getFolderById(document?.data?.folderId ?? "");

    const initialContent = document.success ? document.data?.content : undefined;

    return (
        <PageWrapper breadcrumbs={
            [
                {
                    label: "Dashboard",
                    href: "/dashboard"
                },
                {
                    label: folder.data?.name ?? "Untitled Folder",
                    href: `/dashboard/folder/${folder.data?.id}`
                },
                {
                    label: document.data?.title ?? "Untitled Document",
                    href: `/dashboard/folder/${folder.data?.id}/document/${document.data?.id}`
                }
            ]
        }>
            {document.success && document.data?.title}
            <RichTextEditor content={initialContent as JSONContent} documentId={documentId} />
        </PageWrapper>
    );
}