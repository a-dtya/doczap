

"use client"

import { getDocumentById } from "@/server/docs"
import { PageWrapper } from "@/components/page-wrapper"
import RichTextEditor from "@/components/rich-text-editor"
import { JSONContent } from "@tiptap/react"
export default async function DocumentPage({ params }: { params: { documentId: string } }) {
    const documentId = params.documentId
    const document = await getDocumentById(documentId)
    return <PageWrapper breadcrumbs={[
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: document.data?.title ?? "Document",
            href: `/dashboard/document/${documentId}`,
        }
    ]}>{document.data?.title}
    <RichTextEditor content={document.data?.content as JSONContent[]} documentId={documentId}/>
    </PageWrapper>
}