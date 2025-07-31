"use client";
import React from "react";
import { FileItem } from "@/types/file";
import FileIcon from "./FileIcon";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface FileListProps {
  files: FileItem[];
  selectedFiles: string[];
  onFileSelect: (id: string) => void;
  onFolderOpen: (path: string) => void;
  onNavigateUp: () => void;
  currentFolder: string;
}

export default function FileList({
  files,
  selectedFiles,
  onFileSelect,
  onFolderOpen,
  onNavigateUp,
  currentFolder,
}: FileListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableCell isHeader className="w-8 px-4 py-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </TableCell>
            <TableCell isHeader className="px-4 py-3 text-left">
              <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Name
              </span>
            </TableCell>
            <TableCell isHeader className="px-4 py-3 text-left">
              <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Size
              </span>
            </TableCell>
            <TableCell isHeader className="px-4 py-3 text-left">
              <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Modified
              </span>
            </TableCell>
            <TableCell isHeader className="px-4 py-3 text-left">
              <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Type
              </span>
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentFolder !== "/" && (
            <TableRow
              onClick={onNavigateUp}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="px-4 py-3"></TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded dark:bg-gray-700">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <path
                        d="M19 11H7.14L10.77 6.64C11.13 6.22 11.08 5.57 10.66 5.21C10.24 4.85 9.59 4.9 9.23 5.32L4.23 11.32C4.08 11.5 4 11.74 4 12C4 12.26 4.08 12.5 4.23 12.68L9.23 18.68C9.39 18.87 9.62 18.97 9.85 18.97C10.05 18.97 10.24 18.9 10.39 18.78C10.81 18.42 10.86 17.77 10.5 17.35L7.14 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ..
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                -
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                -
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                Folder
              </TableCell>
            </TableRow>
          )}

          {files.map((file) => (
            <TableRow
              key={file.id}
              className={`cursor-pointer transition-colors ${
                selectedFiles.includes(file.id)
                  ? "bg-brand-50 dark:bg-brand-500/10"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                if (file.type === "folder") {
                  onFolderOpen(file.path);
                }
              }}
            >
              <TableCell className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onFileSelect(file.id);
                  }}
                  className="w-4 h-4 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <FileIcon type={file.type} extension={file.extension} size="sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {file.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {file.type === "folder" ? "-" : formatFileSize(file.size)}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {formatDate(file.modifiedAt)}
              </TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {file.type === "folder" ? "Folder" : file.extension?.toUpperCase() || "File"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full dark:bg-gray-800">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-white/90">
            No files found
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload some files to get started
          </p>
        </div>
      )}
    </div>
  );
}