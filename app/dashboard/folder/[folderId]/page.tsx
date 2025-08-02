// app/dashboard/folder/[folderId]/page.tsx
import { getFolderById, getDocuments } from "@/server/docs"
import { PageWrapper } from "@/components/page-wrapper"
import { Folder, Document } from "@/lib/types"
import DocumentCard from "@/components/document-card"
import CreateDocumentButton from "@/components/create-document-button"

export default async function DocumentPage({
  params,
}: {
  params: { folderId: string }
}) {
  const { folderId } = await params // <--- the fix


  const folderRes = await getFolderById(folderId)
  const docsRes = await getDocuments(folderId)

  if (!folderRes.success) {
    return (
      <PageWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      >
        <div className="text-red-500">Failed to load folder: {folderRes.message}</div>
      </PageWrapper>
    )
  }

  const folderData = folderRes.data
  const documentsData: Document[] = (docsRes.success && Array.isArray(docsRes.data))
    ? docsRes.data
    : []

  const folderComplete: Folder & { documents: Document[] } = {
    id: folderData?.id ?? "",
    name: folderData?.name ?? "Untitled Folder",
    authorId: folderData?.authorId ?? "",
    createdAt: folderData?.createdAt ?? new Date(),
    documents: documentsData,
  }


  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: folderComplete.name,
          href: `/dashboard/folder/${folderId}`,
        },
      ]}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">{folderComplete.name}</h1>
        <CreateDocumentButton folderId={folderId} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {folderComplete.documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
        {folderComplete.documents.length === 0 && (
          <div className="col-span-full p-6 bg-muted rounded">
            <p className="text-center">This folder has no documents yet.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
