# RUSHDR Mini Issue Tracker


The application allows users to create, view, update, delete, search, and filter issues through a responsive dashboard backed by a REST API and MongoDB.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- Vitest
- React Testing Library

## Features

- View all issues
- Create new issues
- Edit existing issues
- Delete issues with confirmation
- Change issue status
  - Todo
  - In Progress
  - Done
- Change issue priority
  - Low
  - Medium
  - High
- Assign issues to users
- Search issues by title
- Filter by status
- Filter by priority
- Filter by assignee
- Combine search and filters
- Display created and updated dates
- Frontend and backend validation
- Loading, error, and empty states
- Responsive desktop and mobile UI
- Seed data for testing

## Project Structure

```text
Web_App/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── IssueCard.tsx
│   │   │   └── IssueForm.tsx
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── services/
│   │   │   └── issueService.ts
│   │   ├── types/
│   │   │   └── issue.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   └── Issue.ts
│   │   ├── routes/
│   │   │   └── issueRoutes.ts
│   │   └── server.ts
│   ├── tests/
│   │   └── issue.test.ts
│   ├── seed.ts
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
