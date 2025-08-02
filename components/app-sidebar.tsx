import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
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

import { getFolders, getDocuments } from "@/server/docs"

type Folder = {
  id: string;
  name: string;
  authorId: string;
  createdAt: Date | null;
  documents: Document[];
}

type Document = {
  id: string;
  title: string;
  content: unknown;
  folderId: string | null;
  authorId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

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
          url: `/dashboard/${folder.id}`,
          items: folder.documents.map((document)=>{
            return {
              title: document.title,
              url: `/dashboard/${folder.id}/${document.id}`,
            }
          })
        }
      }) ?? []
    ],
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.name}
            title={item.name}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.name}{" "}
                  {item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
