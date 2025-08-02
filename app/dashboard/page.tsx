"use client"

import CreateFolderButton from "@/components/create-folder-button";
import { PageWrapper } from "@/components/page-wrapper";

export default function Dashboard() {
    return (
        <PageWrapper breadcrumbs={[
            {
                label: "Dashboard",
                href: "/dashboard",
            }
        ]}>
            <h1>Dashboard</h1>
            <CreateFolderButton />
        </PageWrapper>
    )
}