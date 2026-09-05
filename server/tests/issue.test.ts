import { describe, it, expect } from "vitest";

const API_URL = "http://localhost:5000/api/issues";

describe("Issue API", () => {
  it("should create a valid issue", async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Automated test issue",
        description: "Created during backend testing",
        status: "Todo",
        priority: "Medium",
        assignee: "Test User",
      }),
    });

    expect(response.ok).toBe(true);

    const issue = await response.json();

    expect(issue.title).toBe("Automated test issue");
    expect(issue.description).toBe("Created during backend testing");
    expect(issue.status).toBe("Todo");
    expect(issue.priority).toBe("Medium");
    expect(issue._id).toBeTruthy();

    await fetch(`${API_URL}/${issue._id}`, {
      method: "DELETE",
    });
  });

  it("should reject an invalid issue", async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        assignee: "",
      }),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
  });

  it("should fetch issues", async () => {
    const response = await fetch(API_URL);

    expect(response.ok).toBe(true);

    const issues = await response.json();

    expect(Array.isArray(issues)).toBe(true);
  });
});