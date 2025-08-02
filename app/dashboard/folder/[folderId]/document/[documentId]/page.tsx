

"use client"

import { getDocumentById, getFolderById } from "@/server/docs"
import { PageWrapper } from "@/components/page-wrapper"
import RichTextEditor from "@/components/rich-text-editor"
import { JSONContent } from "@tiptap/react"
export default async function DocumentPage({ params }: { params: { documentId: string } }) {
    const documentId = params.documentId
    const document = await getDocumentById(documentId)
    const folder = await getFolderById(document?.data?.folderId ?? "")
    return <PageWrapper breadcrumbs={[
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: folder?.data?.name ?? "Folder",
            href: `/dashboard/folder/${folder?.data?.id}`,
        },
        {
            label: document?.data?.title ?? "Document",
            href: `/dashboard/folder/${folder?.data?.id}/document/${documentId}`,
        }
    ]}>{document.data?.title}
    <RichTextEditor content={document.data?.content as JSONContent[]} documentId={documentId}/>
    </PageWrapper>
}