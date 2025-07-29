"use client"

import Logout from "@/components/logout";

export default function Dashboard() {
    return (
        <div className="flex justify-between items-center p-4">
            <h1>Dashboard</h1>
            <Logout />
        </div>
    )
}