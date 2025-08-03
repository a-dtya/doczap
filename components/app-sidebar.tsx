import * as React from "react"
import { ChevronRight, File } from "lucide-react"
import Logo from "@/components/ui/logo"
import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import SidebarData from "./sidebar-data"

import { getFolders, getDocuments } from "@/server/docs"

import { Folder, Document } from "@/lib/types"

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
        {/* We create a collapsible SidebarGroup for each parent. */}
        <SidebarData data={data}/>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
