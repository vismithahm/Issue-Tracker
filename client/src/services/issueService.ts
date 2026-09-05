import type { Issue } from "../types/issue.js";

const API_URL = "http://localhost:5000/api/issues";

export async function getIssues(): Promise<Issue[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch issues");
  }

  return response.json();
}

export async function createIssue(
  issue: Omit<Issue, "_id" | "createdAt" | "updatedAt">
): Promise<Issue> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create issue");
  }

  return response.json();
}

export async function updateIssue(
  id: string,
  issue: Partial<Issue>
): Promise<Issue> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update issue");
  }

  return response.json();
}

export async function deleteIssue(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete issue");
  }
}