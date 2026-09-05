# RUSHDR Mini Issue Tracker

A full-stack mini issue tracking application built as part of the RUSHDR Web Development Intern Assessment.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- TypeScript
- REST API

### Database
- MongoDB
- Mongoose

### Testing
- Vitest
- React Testing Library
- jsdom

## Features

- View all issues
- Create issues
- Edit issues
- Delete issues
- Change issue status
- Change issue priority
- Search issues by title
- Filter by status
- Filter by priority
- Filter by assignee
- Combined search and filtering
- Frontend and backend validation
- Loading states
- Error states
- Empty states
- Delete confirmation
- Responsive UI
- MongoDB timestamps
- Seed data for testing

## Project Structure

```text
Web_App/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── test/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.ts
│   │   └── seed.ts
│   ├── tests/
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md