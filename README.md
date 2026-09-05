# Issue Tracker


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
```
## Setup and Installation
### Prerequisites
- Node.js
- npm
- MongoDB
1. Install frontend dependencies
cd client
npm install
2. Install backend dependencies

- Open another terminal:

cd server
npm install
3. Configure environment variables

Create a file named .env inside the server folder.
- Running the Application
- Start the backend

From the server directory:

npm run dev

- The backend runs on:

http://localhost:5000
Start the frontend

- From the client directory:

1.npm run dev

2.Open the localhost URL provided by Vite in your browser.

3.Seed Data

4.The project includes seed data for testing the application.

- From the server directory:

npx tsx src/seed.ts

This populates the MongoDB rushdr database with sample issues.

API Documentation

Supports search and filtering by title, status, priority, and assignee.

Example:

GET /api/issues?search=login&status=Todo&priority=High
Get one issue
GET /api/issues/:id
Create an issue
POST /api/issues

## Example request:

{
  "title": "Fix login issue",
  "description": "Users cannot log in with valid credentials.",
  "status": "Todo",
  "priority": "High",
  "assignee": "John"
}
Update an issue
PUT /api/issues/:id
Delete an issue
DELETE /api/issues/:id

The API validates incoming data and handles invalid or nonexistent issue IDs with appropriate error responses.

## Data Model

Each issue contains:

title
description
status
priority
assignee
createdAt
updatedAt

The createdAt and updatedAt fields are automatically managed using Mongoose timestamps.

## Validation
Frontend Validation

The frontend validates required fields before submitting the form.

Title is required
Description is required
Backend Validation

The backend also validates incoming requests to ensure invalid data cannot bypass frontend validation.

## Testing
Backend Tests

Backend tests cover:

Creating a valid issue
Rejecting an invalid issue
Fetching issues

- Run:

cd server
npm test
Frontend Tests

Frontend testing covers an important IssueForm validation interaction.

- Run:

cd client
npm test
Key Design Decisions
React and TypeScript

TypeScript provides type safety for issue data, component props, API responses, statuses, and priorities.

## REST API

The frontend communicates with the backend using REST endpoints, keeping the frontend and backend responsibilities separated.

## MongoDB and Mongoose

MongoDB is used for persistent issue storage, while Mongoose provides schema validation and automatic timestamp management.

## Component-Based UI

The frontend is organized into reusable components such as IssueCard and IssueForm, with Dashboard managing the main issue workflow.

## Combined Filtering

Search and filters can be used together so users can efficiently narrow down the issue list.

## Tailwind CSS

Tailwind CSS is used to create a responsive and maintainable user interface for both desktop and mobile screens.


