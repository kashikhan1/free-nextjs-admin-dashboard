"use client";
import { useState, useCallback } from "react";
import { FileItem } from "@/types/file";

// Mock data for demonstration
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    path: "/Documents",
    size: 0,
    modifiedAt: new Date("2024-01-15"),
    itemCount: 12,
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    path: "/Images",
    size: 0,
    modifiedAt: new Date("2024-01-14"),
    itemCount: 8,
  },
  {
    id: "3",
    name: "project-proposal.pdf",
    type: "file",
    path: "/project-proposal.pdf",
    size: 2048576,
    modifiedAt: new Date("2024-01-13"),
    extension: "pdf",
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "file",
    path: "/presentation.pptx",
    size: 5242880,
    modifiedAt: new Date("2024-01-12"),
    extension: "pptx",
  },
  {
    id: "5",
    name: "screenshot.png",
    type: "file",
    path: "/screenshot.png",
    size: 1048576,
    modifiedAt: new Date("2024-01-11"),
    extension: "png",
  },
  {
    id: "6",
    name: "data.xlsx",
    type: "file",
    path: "/data.xlsx",
    size: 3145728,
    modifiedAt: new Date("2024-01-10"),
    extension: "xlsx",
  },
];

const mockSubfolderFiles: Record<string, FileItem[]> = {
  "/Documents": [
    {
      id: "doc1",
      name: "report.docx",
      type: "file",
      path: "/Documents/report.docx",
      size: 1024000,
      modifiedAt: new Date("2024-01-15"),
      extension: "docx",
    },
    {
      id: "doc2",
      name: "notes.txt",
      type: "file",
      path: "/Documents/notes.txt",
      size: 2048,
      modifiedAt: new Date("2024-01-14"),
      extension: "txt",
    },
  ],
  "/Images": [
    {
      id: "img1",
      name: "photo1.jpg",
      type: "file",
      path: "/Images/photo1.jpg",
      size: 2048000,
      modifiedAt: new Date("2024-01-14"),
      extension: "jpg",
    },
    {
      id: "img2",
      name: "logo.svg",
      type: "file",
      path: "/Images/logo.svg",
      size: 15360,
      modifiedAt: new Date("2024-01-13"),
      extension: "svg",
    },
  ],
};

export const useFileManager = () => {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [currentFolder, setCurrentFolder] = useState<string>("/");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const navigateToFolder = useCallback((path: string) => {
    setCurrentFolder(path);
    setSelectedFiles([]);
    
    // Load files for the folder (in a real app, this would be an API call)
    if (path === "/") {
      setFiles(mockFiles);
    } else {
      setFiles(mockSubfolderFiles[path] || []);
    }
  }, []);

  const navigateUp = useCallback(() => {
    if (currentFolder === "/") return;
    
    const parentPath = currentFolder.split("/").slice(0, -1).join("/") || "/";
    navigateToFolder(parentPath);
  }, [currentFolder, navigateToFolder]);

  const createFolder = useCallback((name: string) => {
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name,
      type: "folder",
      path: currentFolder === "/" ? `/${name}` : `${currentFolder}/${name}`,
      size: 0,
      modifiedAt: new Date(),
      itemCount: 0,
    };

    setFiles(prev => [newFolder, ...prev]);
  }, [currentFolder]);

  const uploadFiles = useCallback(async (uploadedFiles: File[]) => {
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newFiles: FileItem[] = uploadedFiles.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: "file",
      path: currentFolder === "/" ? `/${file.name}` : `${currentFolder}/${file.name}`,
      size: file.size,
      modifiedAt: new Date(),
      extension: file.name.split(".").pop(),
    }));

    setFiles(prev => [...newFiles, ...prev]);
    setIsUploading(false);
  }, [currentFolder]);

  const deleteFiles = useCallback((fileIds: string[]) => {
    setFiles(prev => prev.filter(file => !fileIds.includes(file.id)));
    setSelectedFiles([]);
  }, []);

  const toggleFileSelection = useCallback((fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  }, []);

  const selectAllFiles = useCallback(() => {
    setSelectedFiles(files.map(file => file.id));
  }, [files]);

  const clearSelection = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  return {
    files,
    currentFolder,
    selectedFiles,
    isUploading,
    navigateToFolder,
    navigateUp,
    createFolder,
    uploadFiles,
    deleteFiles,
    toggleFileSelection,
    selectAllFiles,
    clearSelection,
  };
};