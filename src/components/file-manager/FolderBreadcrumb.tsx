"use client";
import React from "react";

interface FolderBreadcrumbProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function FolderBreadcrumb({
  currentPath,
  onNavigate,
}: FolderBreadcrumbProps) {
  const pathSegments = currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => onNavigate("/")}
        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
          currentPath === "/"
            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Home
      </button>

      {pathSegments.map((segment, index) => {
        const segmentPath = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={segmentPath}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={() => onNavigate(segmentPath)}
              className={`px-2 py-1 rounded-md transition-colors ${
                isLast
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {segment}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}