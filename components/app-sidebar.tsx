import * as React from "react"
import Logo from "@/components/ui/logo"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import SidebarData from "./sidebar-data"

import { getFolders, getDocuments } from "@/server/docs"

import { Folder } from "@/lib/types"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const folders: Folder[] = []
  const foldersResponse = await getFolders()
  for (const folder of foldersResponse?.data ?? []) {
    const documents = await getDocuments(folder.id)
    folders.push({
      id: folder.id,
      name: folder.name,
      authorId: folder.authorId,
      createdAt: folder.createdAt,
      documents: documents?.data ?? [],
    })
  }
  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...folders?.map((folder)=>{
        return {
          name: folder.name,
          url: `/dashboard/folder/${folder.id}`,
          items: folder.documents.map((document)=>{
            return {
              title: document.title,
              url: `/dashboard/folder/${folder.id}/document/${document.id}`,
            }
          })
        }
      }) ?? []
    ],
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo className="h-8 w-auto"/>
        <SearchForm/>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
