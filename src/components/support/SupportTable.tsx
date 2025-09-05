"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { SupportTicket } from "@/types/support";
import Pagination from "../tables/Pagination";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface SupportTableProps {
  tickets: SupportTicket[];
  activeFilter: "All" | "Solved" | "Pending";
  onFilterChange: (filter: "All" | "Solved" | "Pending") => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

export default function SupportTable({
  tickets,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
}: SupportTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = tickets.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (ticketId: string) => {
    setOpenDropdown(openDropdown === ticketId ? null : ticketId);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Support Tickets
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your most recent support tickets list
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 sm:w-64"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>

            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 dark:text-gray-400"
              >
                <path
                  d="M2.29004 5.90393H17.7067"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.7075 14.0961H2.29085"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-6">
          {(["All", "Solved", "Pending"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-t border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="w-8 px-6 py-4 text-left"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Ticket ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Requested By
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Subject
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Create Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-4 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {currentTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-600 bg-white border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {ticket.id}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {ticket.requestedBy.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {ticket.requestedBy.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {ticket.subject}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {ticket.createDate}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      size="sm"
                      color={ticket.status === "Solved" ? "success" : "warning"}
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(ticket.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <MoreDotIcon />
                      </button>
                      <Dropdown
                        isOpen={openDropdown === ticket.id}
                        onClose={closeDropdown}
                        className="w-40 p-2"
                      >
                        <DropdownItem
                          onItemClick={closeDropdown}
                          className="flex w-full px-3 py-2 text-sm font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          View Details
                        </DropdownItem>
                        <DropdownItem
                          onItemClick={closeDropdown}
                          className="flex w-full px-3 py-2 text-sm font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          Mark as {ticket.status === "Solved" ? "Pending" : "Solved"}
                        </DropdownItem>
                        <DropdownItem
                          onItemClick={closeDropdown}
                          className="flex w-full px-3 py-2 text-sm font-normal text-left text-error-500 rounded-lg hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10"
                        >
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {tickets.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1} to {Math.min(endIndex, tickets.length)} of {tickets.length}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}