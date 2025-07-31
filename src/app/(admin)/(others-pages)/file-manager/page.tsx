import FileManager from "@/components/file-manager/FileManager";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js File Manager | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js File Manager page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FileManagerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="File Manager" />
      <FileManager />
    </div>
  );
}