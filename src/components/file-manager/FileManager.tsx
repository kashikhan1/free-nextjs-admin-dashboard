"use client";
import React, { useState } from "react";
import FileGrid from "./FileGrid";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import FolderBreadcrumb from "./FolderBreadcrumb";
import FileManagerHeader from "./FileManagerHeader";
import { useFileManager } from "@/hooks/useFileManager";

export default function FileManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const {
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
  } = useFileManager();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <FileManagerHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCount={selectedFiles.length}
        onCreateFolder={createFolder}
        onDeleteSelected={() => deleteFiles(selectedFiles)}
        onSelectAll={selectAllFiles}
        onClearSelection={clearSelection}
      />
      
      <div className="p-6">
        <div className="mb-6">
          <FolderBreadcrumb
            currentPath={currentFolder}
            onNavigate={navigateToFolder}
          />
        </div>

        <FileUpload
          onUpload={uploadFiles}
          isUploading={isUploading}
          className="mb-6"
        />

        {viewMode === "grid" ? (
          <FileGrid
            files={files}
            selectedFiles={selectedFiles}
            onFileSelect={toggleFileSelection}
            onFolderOpen={navigateToFolder}
            onNavigateUp={navigateUp}
            currentFolder={currentFolder}
          />
        ) : (
          <FileList
            files={files}
            selectedFiles={selectedFiles}
            onFileSelect={toggleFileSelection}
            onFolderOpen={navigateToFolder}
            onNavigateUp={navigateUp}
            currentFolder={currentFolder}
          />
        )}
      </div>
    </div>
  );
}