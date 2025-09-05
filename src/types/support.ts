export interface SupportTicket {
  id: string;
  requestedBy: {
    name: string;
    email: string;
  };
  subject: string;
  createDate: string;
  status: "Solved" | "Pending";
}