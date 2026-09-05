import { useEffect, useState } from "react";
import type {
  Issue,
  IssuePriority,
  IssueStatus,
} from "../types/issue";
import {
  createIssue,
  updateIssue,
} from "../services/issueService";

interface IssueFormProps {
  issue?: Issue | null;
  onSaved: () => void;
  onCancel?: () => void;
}

function IssueForm({
  issue,
  onSaved,
  onCancel,
}: IssueFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<IssueStatus>("Todo");
  const [priority, setPriority] =
    useState<IssuePriority>("Medium");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(issue);

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
      setDescription(issue.description);
      setStatus(issue.status);
      setPriority(issue.priority);
      setAssignee(issue.assignee);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setPriority("Medium");
      setAssignee("");
    }

    setError("");
  }, [issue]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter an issue title.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter an issue description.");
      return;
    }

    try {
      setSaving(true);

      const data = {
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        assignee: assignee.trim(),
      };

      if (isEditing && issue?._id) {
        await updateIssue(issue._id, data);
      } else {
        await createIssue(data);
      }

      onSaved();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* TITLE */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Issue title
          <span className="ml-1 text-red-500">*</span>
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="e.g. Login page is not loading"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Describe the issue and provide any useful context..."
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as IssueStatus
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as IssuePriority
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            <option value="Low">Low</option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Assignee
          </label>

          <input
            value={assignee}
            onChange={(e) =>
              setAssignee(e.target.value)
            }
            placeholder="e.g. Rahul"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Create Issue"}
        </button>

      </div>

    </form>
  );
}

export default IssueForm;