"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useModal } from "@/hooks/useModal";

interface FileManagerHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  selectedCount: number;
  onCreateFolder: (name: string) => void;
  onDeleteSelected: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export default function FileManagerHeader({
  viewMode,
  onViewModeChange,
  selectedCount,
  onCreateFolder,
  onDeleteSelected,
  onSelectAll,
  onClearSelection,
}: FileManagerHeaderProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName.trim());
      setFolderName("");
      closeModal();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-6 border-b border-gray-200 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            File Manager
          </h3>
          {selectedCount > 0 && (
            <span className="px-2.5 py-0.5 text-xs font-medium bg-brand-50 text-brand-600 rounded-full dark:bg-brand-500/15 dark:text-brand-400">
              {selectedCount} selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {selectedCount > 0 ? (
            <>
              <Button size="sm" variant="outline" onClick={onClearSelection}>
                Clear Selection
              </Button>
              <Button
                size="sm"
                onClick={onDeleteSelected}
                className="bg-error-500 hover:bg-error-600 text-white"
              >
                Delete Selected
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={onSelectAll}>
                Select All
              </Button>
              <Button size="sm" variant="outline" onClick={openModal}>
                New Folder
              </Button>
            </>
          )}

          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg dark:bg-gray-800">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H6V6H2V2ZM10 2H14V6H10V2ZM2 10H6V14H2V10ZM10 10H14V14H10V10Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4H14M2 8H14M2 12H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-md p-6"
      >
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create New Folder
          </h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter a name for your new folder
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Folder Name</Label>
            <Input
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}