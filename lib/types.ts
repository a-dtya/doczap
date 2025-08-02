

export type Folder = {
  id: string;
  name: string;
  authorId: string;
  createdAt: Date | null;
  documents: Document[];
}

export type Document = {
  id: string;
  title: string;
  content: unknown;
  folderId: string | null;
  authorId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
