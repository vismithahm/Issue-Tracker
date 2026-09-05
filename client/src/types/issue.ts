export type IssueStatus = "Todo" | "In Progress" | "Done";

export type IssuePriority = "Low" | "Medium" | "High";

export interface Issue {
  _id?: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  createdAt?: string;
  updatedAt?: string;
}