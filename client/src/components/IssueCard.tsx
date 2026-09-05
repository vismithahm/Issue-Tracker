interface IssueCardProps {
  issue: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
  };
}

function IssueCard({ issue }: IssueCardProps) {
  const statusClass =
    issue.status === "Done"
      ? "done"
      : issue.status === "In Progress"
        ? "progress"
        : "todo";

  const priorityClass =
    issue.priority === "High"
      ? "high"
      : issue.priority === "Medium"
        ? "medium"
        : "low";

  return (
    <article className="issue-card">

      <div className="card-top">
        <span className={`priority ${priorityClass}`}>
          {issue.priority}
        </span>

        <button className="more-button">
          ⋮
        </button>
      </div>

      <h3>{issue.title}</h3>

      <p className="description">
        {issue.description}
      </p>

      <div className="card-status">
        <span className={`status ${statusClass}`}>
          {issue.status}
        </span>
      </div>

      <div className="card-footer">

        <div className="assignee">
          <div className="avatar">
            {issue.assignee.charAt(0)}
          </div>

          <span>{issue.assignee}</span>
        </div>

        <div className="card-actions">
          <button className="edit">
            Edit
          </button>

          <button className="delete">
            Delete
          </button>
        </div>

      </div>

    </article>
  );
}

export default IssueCard;