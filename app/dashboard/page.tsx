
import CreateFolderButton from "@/components/create-folder-button";
import { PageWrapper } from "@/components/page-wrapper";
import { getFolders } from "@/server/docs";
import FolderCard from "@/components/folder-card";

export default async function Dashboard() {
    const folders = await getFolders()
    return (
        <PageWrapper breadcrumbs={[
            {
                label: "Dashboard",
                href: "/dashboard",
            }
        ]}>
            <h1>Dashboard</h1>
            <CreateFolderButton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {folders.success && folders.data?.map((folder) => (
                    <FolderCard key={folder.id} folder={folder} />
                ))}
                {
                    folders.success && folders.data?.length === 0 && (
                        <p>No folders found</p>
                    )
                }
            </div>
        </PageWrapper>
    )
}