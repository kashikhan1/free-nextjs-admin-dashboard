"use client";
import React, { useState } from "react";
import SupportMetrics from "./SupportMetrics";
import SupportTable from "./SupportTable";
import { SupportTicket } from "@/types/support";

const mockTickets: SupportTicket[] = [
  {
    id: "#323534",
    requestedBy: {
      name: "Lindsey Curtis",
      email: "demoemail@gmail.com",
    },
    subject: "Issue with Dashboard Login Access",
    createDate: "12 Feb, 2027",
    status: "Solved",
  },
  {
    id: "#323535",
    requestedBy: {
      name: "Kaiya George",
      email: "demoemail@gmail.com",
    },
    subject: "Billing Information Not Updating Properly",
    createDate: "13 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323536",
    requestedBy: {
      name: "Zain Geidt",
      email: "demoemail@gmail.com",
    },
    subject: "Bug Found in Dark Mode Layout",
    createDate: "19 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323537",
    requestedBy: {
      name: "Abram Schleifer",
      email: "demoemail@gmail.com",
    },
    subject: "Request to Add New Integration Feature",
    createDate: "25 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323538",
    requestedBy: {
      name: "Mia Chen",
      email: "mia.chen@email.com",
    },
    subject: "Unable to Reset Password",
    createDate: "28 Apr, 2027",
    status: "Pending",
  },
  {
    id: "#323539",
    requestedBy: {
      name: "John Doe",
      email: "john.doe@email.com",
    },
    subject: "Feature Request: Dark Mode",
    createDate: "30 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323540",
    requestedBy: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
    },
    subject: "Error 500 on Dashboard",
    createDate: "01 May, 2027",
    status: "Pending",
  },
  {
    id: "#323541",
    requestedBy: {
      name: "Carlos Ruiz",
      email: "carlos.ruiz@email.com",
    },
    subject: "Cannot Download Invoice",
    createDate: "02 May, 2027",
    status: "Solved",
  },
  {
    id: "#323542",
    requestedBy: {
      name: "Emily Clark",
      email: "emily.clark@email.com",
    },
    subject: "UI Bug in Mobile View",
    createDate: "03 May, 2027",
    status: "Pending",
  },
  {
    id: "#323543",
    requestedBy: {
      name: "Liam Wong",
      email: "liam.wong@email.com",
    },
    subject: "Account Locked",
    createDate: "04 May, 2027",
    status: "Solved",
  },
];

export default function SupportList() {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>(mockTickets);
  const [activeFilter, setActiveFilter] = useState<"All" | "Solved" | "Pending">("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filter: "All" | "Solved" | "Pending") => {
    setActiveFilter(filter);
    filterTickets(filter, searchTerm);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    filterTickets(activeFilter, search);
  };

  const filterTickets = (filter: "All" | "Solved" | "Pending", search: string) => {
    let filtered = tickets;

    if (filter !== "All") {
      filtered = filtered.filter(ticket => ticket.status === filter);
    }

    if (search) {
      filtered = filtered.filter(ticket =>
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.requestedBy.name.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };

  const totalTickets = tickets.length;
  const pendingTickets = tickets.filter(ticket => ticket.status === "Pending").length;
  const solvedTickets = tickets.filter(ticket => ticket.status === "Solved").length;

  return (
    <div className="space-y-6">
      <SupportMetrics
        totalTickets={totalTickets}
        pendingTickets={pendingTickets}
        solvedTickets={solvedTickets}
      />
      <SupportTable
        tickets={filteredTickets}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
}