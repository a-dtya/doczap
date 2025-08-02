import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder } from "@/lib/types"
import Link from "next/link"
import { Trash2 } from "lucide-react"

interface FolderCardProps {
folder: Folder
}

export default function FolderCard({ folder }: FolderCardProps) {
return (
    <Card>
    <CardHeader>
        <CardTitle>{folder.name}</CardTitle>
        <CardDescription>{folder.createdAt?.toDateString() ?? ""}</CardDescription>
    </CardHeader>
    <CardContent>
        <p>{folder.documents.length} documents</p>
    </CardContent>
    <CardFooter>
        <Link href={`/dashboard/folder/${folder.id}`}>
            <Button variant="outline">View</Button>
        </Link>
        <Button variant="destructive"><Trash2 className="h-4 w-4"/></Button>
    </CardFooter>
    </Card>
)
}