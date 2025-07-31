"use client";
import React from "react";
import { FileItem } from "@/types/file";
import FileIcon from "./FileIcon";

interface FileGridProps {
  files: FileItem[];
  selectedFiles: string[];
  onFileSelect: (id: string) => void;
  onFolderOpen: (path: string) => void;
  onNavigateUp: () => void;
  currentFolder: string;
}

export default function FileGrid({
  files,
  selectedFiles,
  onFileSelect,
  onFolderOpen,
  onNavigateUp,
  currentFolder,
}: FileGridProps) {
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
    }).format(date);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {currentFolder !== "/" && (
        <div
          onClick={onNavigateUp}
          className="flex flex-col items-center p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-lg dark:bg-gray-800">
            <svg
              width="24"
              height="24"
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
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Back
          </span>
        </div>
      )}

      {files.map((file) => (
        <div
          key={file.id}
          className={`relative flex flex-col items-center p-4 transition-all border rounded-lg cursor-pointer group ${
            selectedFiles.includes(file.id)
              ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10 dark:border-brand-400"
              : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          }`}
          onClick={() => {
            if (file.type === "folder") {
              onFolderOpen(file.path);
            } else {
              onFileSelect(file.id);
            }
          }}
        >
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={(e) => {
              e.stopPropagation();
              onFileSelect(file.id);
            }}
            className="absolute top-2 right-2 w-4 h-4 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          <div className="flex items-center justify-center w-12 h-12 mb-3">
            <FileIcon type={file.type} extension={file.extension} />
          </div>

          <span className="mb-1 text-sm font-medium text-center text-gray-700 truncate dark:text-gray-300 max-w-full">
            {file.name}
          </span>

          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            {file.type === "folder" ? (
              <span>{file.itemCount} items</span>
            ) : (
              <>
                <div>{formatFileSize(file.size)}</div>
                <div>{formatDate(file.modifiedAt)}</div>
              </>
            )}
          </div>
        </div>
      ))}

      {files.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
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