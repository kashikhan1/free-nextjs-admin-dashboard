"use client";
import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  isUploading: boolean;
  className?: string;
}

export default function FileUpload({
  onUpload,
  isUploading,
  className = "",
}: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onUpload,
    disabled: isUploading,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`transition-all border-2 border-dashed rounded-xl cursor-pointer ${
          isDragActive
            ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10 dark:border-brand-400"
            : "border-gray-300 bg-gray-50 hover:border-brand-400 hover:bg-brand-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500 dark:hover:bg-brand-500/5"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full shadow-sm dark:bg-gray-800">
            {isUploading ? (
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full animate-spin border-t-brand-500"></div>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 dark:text-gray-400"
              >
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15L12 12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
            {isUploading
              ? "Uploading files..."
              : isDragActive
              ? "Drop files here"
              : "Upload files"}
          </h4>

          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {isUploading
              ? "Please wait while your files are being uploaded"
              : "Drag and drop files here, or click to browse"}
          </p>

          {!isUploading && (
            <button className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600">
              Browse Files
            </button>
          )}
        </div>
      </div>
    </div>
  );
}