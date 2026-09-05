import { useEffect, useMemo, useState } from "react";
import type { Issue } from "../types/issue";
import {
  deleteIssue,
  getIssues,
} from "../services/issueService";
import IssueForm from "../components/IssueForm";

function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingIssue, setEditingIssue] =
    useState<Issue | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");
  const [assigneeFilter, setAssigneeFilter] =
    useState("All");

  function loadIssues() {
    setLoading(true);

    getIssues()
      .then((data) => {
        setIssues(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load issues.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadIssues();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) return;

    try {
      await deleteIssue(id);
      loadIssues();
    } catch (err) {
      console.error(err);
      setError("Failed to delete issue.");
    }
  }

  function openCreateForm() {
    setEditingIssue(null);
    setShowForm(true);
  }

  function openEditForm(issue: Issue) {
    setEditingIssue(issue);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingIssue(null);
  }

  function handleSaved() {
    closeForm();
    loadIssues();
  }

  const assignees = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          issues
            .map((issue) => issue.assignee)
            .filter(Boolean)
        )
      ),
    ];
  }, [issues]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        issue.priority === priorityFilter;

      const matchesAssignee =
        assigneeFilter === "All" ||
        issue.assignee === assigneeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee
      );
    });
  }, [
    issues,
    search,
    statusFilter,
    priorityFilter,
    assigneeFilter,
  ]);

  const todoCount = issues.filter(
    (issue) => issue.status === "Todo"
  ).length;

  const progressCount = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const doneCount = issues.filter(
    (issue) => issue.status === "Done"
  ).length;

  return (
    <div className="min-h-screen bg-[#f6f8fc]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              R
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                RUSHDR
              </h1>

              <p className="text-xs text-slate-500">
                Issue Management
              </p>
            </div>
          </div>

          {/* USER PROFILE */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowProfile((current) => !current)
              }
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Vismitha
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                V
              </div>

              <span className="hidden text-xs text-slate-400 sm:block">
                ▾
              </span>
            </button>

            {/* PROFILE DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

                {/* USER INFO */}
                <div className="border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                      V
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Vismitha H M
                      </p>

                      <p className="text-xs text-slate-500">
                        Administrator
                      </p>
                    </div>

                  </div>
                </div>

                {/* MENU */}
                <div className="p-2">

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span>👤</span>
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <span>⚙</span>
                    <span>Settings</span>
                  </button>

                </div>

                {/* SIGN OUT */}
                <div className="border-t border-slate-100 p-2">

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfile(false);

                      window.alert(
                        "Sign out is not connected because authentication is not part of this assessment."
                      );
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <span>↪</span>
                    <span>Sign out</span>
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">

        {/* PAGE INTRO */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              OVERVIEW
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Issue Dashboard
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Track, prioritize and manage your team's issues.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            <span className="text-lg leading-none">
              +
            </span>
            New Issue
          </button>

        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Issues
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {issues.length}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              All tracked issues
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Todo
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {todoCount}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Waiting to start
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              In Progress
            </p>

            <p className="mt-3 text-3xl font-bold text-blue-600">
              {progressCount}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Currently being worked on
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Completed
            </p>

            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {doneCount}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Successfully completed
            </p>
          </div>

        </div>

        {/* ISSUES SECTION */}
        <section>

          <div className="mb-5">
            <h3 className="text-xl font-bold text-slate-900">
              Issues
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter your issues.
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">

              {/* SEARCH */}
              <div className="relative lg:col-span-1">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by title..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

              </div>

              {/* STATUS */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">
                  All Status
                </option>

                <option value="Todo">
                  Todo
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Done">
                  Done
                </option>
              </select>

              {/* PRIORITY */}
              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">
                  All Priority
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

              {/* ASSIGNEE */}
              <select
                value={assigneeFilter}
                onChange={(e) =>
                  setAssigneeFilter(e.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                {assignees.map((assignee) => (
                  <option
                    key={assignee}
                    value={assignee}
                  >
                    {assignee === "All"
                      ? "All Assignees"
                      : assignee}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">

              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="text-sm text-slate-500">
                Loading issues...
              </p>

            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredIssues.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  📋
                </div>

                <h4 className="mt-4 text-lg font-semibold text-slate-800">
                  No issues found
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your filters or create a new issue.
                </p>

              </div>
            )}

          {/* ISSUE GRID */}
          {!loading &&
            !error &&
            filteredIssues.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {filteredIssues.map((issue) => (
                  <article
                    key={issue._id}
                    className="group flex min-h-[285px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3">

                      <div className="flex flex-wrap gap-2">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            issue.status === "Done"
                              ? "bg-emerald-50 text-emerald-700"
                              : issue.status === "In Progress"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {issue.status}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            issue.priority === "High"
                              ? "bg-red-50 text-red-700"
                              : issue.priority === "Medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {issue.priority}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(issue)
                        }
                        className="rounded-lg px-2 py-1 text-xs font-medium text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
                      >
                        Edit
                      </button>

                    </div>

                    {/* CONTENT */}
                    <div className="mt-5">

                      <h4 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900">
                        {issue.title}
                      </h4>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                        {issue.description}
                      </p>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-auto pt-6">

                      <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                            {issue.assignee
                              ? issue.assignee
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Assignee
                            </p>

                            <p className="text-sm font-semibold text-slate-700">
                              {issue.assignee ||
                                "Unassigned"}
                            </p>
                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            issue._id &&
                            handleDelete(issue._id)
                          }
                          className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          Delete
                        </button>

                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">

                        <span>
                          Created{" "}
                          {issue.createdAt
                            ? new Date(
                                issue.createdAt
                              ).toLocaleDateString()
                            : "—"}
                        </span>

                        <span>
                          Updated{" "}
                          {issue.updatedAt
                            ? new Date(
                                issue.updatedAt
                              ).toLocaleDateString()
                            : "—"}
                        </span>

                      </div>

                    </div>

                  </article>
                ))}

              </div>
            )}

        </section>
      </main>

      {/* CREATE / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingIssue
                    ? "Edit Issue"
                    : "Create New Issue"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {editingIssue
                    ? "Update the issue details."
                    : "Add a new issue to your tracker."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>

            </div>

            <div className="p-6">

              <IssueForm
                issue={editingIssue}
                onSaved={handleSaved}
                onCancel={closeForm}
              />

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;