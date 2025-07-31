export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  size: number;
  modifiedAt: Date;
  extension?: string;
  itemCount?: number; // For folders
}