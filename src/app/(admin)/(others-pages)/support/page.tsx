import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SupportList from "@/components/support/SupportList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Support | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Support page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function SupportPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Support List" />
      <SupportList />
    </div>
  );
}