import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IssueForm from "./IssueForm";

describe("IssueForm", () => {
  it("shows an error when title is empty", () => {
    render(<IssueForm onSaved={vi.fn()} />);

    const button = screen.getByRole("button", {
      name: /create issue/i,
    });

    fireEvent.click(button);

    expect(
      screen.getByText("Please enter an issue title.")
    ).toBeTruthy();
  });
});