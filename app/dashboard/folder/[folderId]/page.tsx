"use client"

import { getFolderById, getDocuments } from "@/server/docs"
import { PageWrapper } from "@/components/page-wrapper"
import {Folder, Document} from "@/lib/types"
import DocumentCard from "@/components/document-card"
export default async function DocumentPage({ params }: { params: { folderId: string } }) {
    const folderId = params.folderId
    const folder = await getFolderById(folderId)
    const documents = await getDocuments(folderId)
    const folderComplete: Folder = {
        id: folder.data?.id ?? "",
        name: folder.data?.name ?? "",
        authorId: folder.data?.authorId ?? "",
        createdAt: folder.data?.createdAt ?? new Date(),
        documents: documents.data ?? [],
    }

    return <PageWrapper breadcrumbs={[
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: folderComplete.name,
            href: `/dashboard/folder/${folderId}`,
        }
    ]}>{folderComplete.name}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {folderComplete.documents?.map((document) => (
            <DocumentCard key={document.id} document={document} />
        ))}
    </div>
    </PageWrapper>
}