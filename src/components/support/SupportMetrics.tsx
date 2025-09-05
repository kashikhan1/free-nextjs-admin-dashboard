import React from "react";
import { CheckCircleIcon, TimeIcon } from "@/icons";

interface SupportMetricsProps {
  totalTickets: number;
  pendingTickets: number;
  solvedTickets: number;
}

export default function SupportMetrics({
  totalTickets,
  pendingTickets,
  solvedTickets,
}: SupportMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* Total Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/15">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand-500"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-5">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {totalTickets.toLocaleString()}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total tickets
          </span>
        </div>
      </div>

      {/* Pending Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-warning-50 rounded-xl dark:bg-warning-500/15">
          <TimeIcon className="text-warning-500 size-6" />
        </div>

        <div className="mt-5">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {pendingTickets.toLocaleString()}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Pending tickets
          </span>
        </div>
      </div>

      {/* Solved Tickets */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-success-50 rounded-xl dark:bg-success-500/15">
          <CheckCircleIcon className="text-success-500 size-6" />
        </div>

        <div className="mt-5">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {solvedTickets.toLocaleString()}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Solved tickets
          </span>
        </div>
      </div>
    </div>
  );
}