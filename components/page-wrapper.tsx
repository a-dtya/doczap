import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "./ui/sidebar";
import Logout from "./logout";

interface PageWrapperProps{
    children: React.ReactNode;
    breadcrumbs: {
        label: string;
        href: string;
    }[];
}

export function PageWrapper({children, breadcrumbs}: PageWrapperProps){
return <div className="flex flex-col gap-4">
    <header className="flex items-center border-b px-4 py-2 bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
            <SidebarTrigger aria-label="Toggle sidebar" />
            <Breadcrumb>
                <BreadcrumbList>
                {breadcrumbs.map((b, i) => (
                
                    <BreadcrumbItem key={i}>
                    <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            </div>
        <div className="p-2">
        <Logout />
        </div>
    </div>
    </header>

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto">
    {children}
    </div>

</div> 
}