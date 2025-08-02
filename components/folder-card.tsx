"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder } from "@/lib/types"
import Link from "next/link"
import { Eye, Trash2, Loader2 } from "lucide-react"
import { deleteFolderById, getDocuments } from "@/server/docs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function FolderCard({ folder }: {folder: Partial<Folder>}) {
    const [documents, setDocuments] = useState<Partial<Document>[]>([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleDelete = async (id: string) => {
        try {
            setLoading(true)
            await deleteFolderById(id)
            toast.success("Folder deleted successfully")
            router.refresh()
        } catch (error) {
            console.log("Error @components/folder-card.tsx handleDelete",error)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
useEffect(() => {
    if(!folder.id) {
        toast.error("Folder id not found")
    }
    const fetchDocuments = async () => {
        const documents = await getDocuments(folder?.id ?? "")
        if(documents.success){
            setDocuments(documents.data ?? [])
        }
    }
    fetchDocuments()
}, [folder])
return (
    <Card>
    <CardHeader>
        <CardTitle>{folder.name}</CardTitle>
        <CardDescription>{folder.createdAt?.toDateString() ?? ""}</CardDescription>
    </CardHeader>
    <CardContent>
        <p>{documents?.length ?? 0} documents</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
        <Link href={`/dashboard/folder/${folder.id}`}>
            <Button variant="outline"><Eye className="h-4 w-4"/></Button>
        </Link>
        <Button variant="destructive" onClick={() => handleDelete(folder.id ?? "")} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4"/>}</Button>
    </CardFooter>
    </Card>
)
}