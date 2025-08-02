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
import { Document } from "@/lib/types"
import Link from "next/link"
import { Eye, Trash2, Loader2 } from "lucide-react"
import { deleteDocumentById } from "@/server/docs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function DocumentCard({ document }: {document: Partial<Document>}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const content = document.content as string
    const handleDelete = async (id: string) => {
        try {
            setLoading(true)
            await deleteDocumentById(id)
            toast.success("Document deleted successfully")
            router.refresh()
        } catch (error) {
            console.log("Error @components/document-card.tsx handleDelete",error)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
return (
    <Card>
    <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>{document.createdAt?.toDateString() ?? ""}</CardDescription>
    </CardHeader>
    <CardContent>
        <p>{content?.length ?? 0} characters</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
        <Link href={`/dashboard/folder/${document.folderId}/document/${document.id}`}>
            <Button variant="outline"><Eye className="h-4 w-4"/></Button>
        </Link>
        <Button variant="destructive" onClick={() => handleDelete(document.id ?? "")} disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4"/>}</Button>
    </CardFooter>
    </Card>
)
}