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
        <header className="flex items-center border-b">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
            <SidebarTrigger/>
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>  
            </div>
                <Logout/>
           
            </div>          
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
    </div> 
}