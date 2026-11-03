# Pynexi Backend Task Manager

A beginner-friendly Task Management REST API built with Node.js, Express, MongoDB, and Mongoose.

## Features
- Create, retrieve, update, complete, and delete tasks.
- Store tasks in MongoDB with `pending` or `completed` status.
- Validate titles, descriptions, statuses, and MongoDB IDs.
- JSON responses, useful HTTP status codes, and error handling.
- Automatic `createdAt` and `updatedAt` timestamps.

## Requirements
- Node.js and npm
- MongoDB running locally or a MongoDB connection string
- Postman or another API client for testing

## Setup
1. Open this folder in VS Code.
2. Install dependencies in the terminal:
   ```powershell
   npm.cmd install
   ```
   On macOS/Linux, use `npm install`.
3. Create `.env` from `.env.example`. In PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Make sure MongoDB is running. The default URI is:
   `mongodb://127.0.0.1:27017/pynexi_task_manager`
5. Start the API:
   ```powershell
   npm.cmd run dev
   ```
   Or use `npm.cmd start`.
6. Visit `http://localhost:5000/`. A JSON message should confirm the API is running.

## API endpoints
Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update task fields |
| PATCH | `/api/tasks/:id/complete` | Mark task completed |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create task example
Send `POST http://localhost:5000/api/tasks` with header `Content-Type: application/json` and body:
```json
{
  "title": "Learn Express",
  "description": "Build my first REST API"
}
```
Status defaults to `pending`. You may explicitly set it to `pending` or `completed`.

### Update task example
Send `PUT http://localhost:5000/api/tasks/YOUR_TASK_ID` with:
```json
{
  "title": "Learn Express and MongoDB",
  "description": "Practice CRUD endpoints",
  "status": "pending"
}
```
Replace `YOUR_TASK_ID` with the `_id` returned by MongoDB.

### Complete and delete
- Complete: `PATCH http://localhost:5000/api/tasks/YOUR_TASK_ID/complete` (no body required).
- Delete: `DELETE http://localhost:5000/api/tasks/YOUR_TASK_ID`.

## Validation
- Title is required and cannot be blank; maximum 120 characters.
- Description must be a string and maximum 1000 characters.
- Status must be `pending` or `completed`.
- Invalid IDs return HTTP 400; missing tasks return HTTP 404.
- Unexpected errors return HTTP 500.

## Project structure
```text
pynexi-backend-task-manager/
├── controllers/taskController.js
├── models/Task.js
├── routes/taskRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Important
- Never upload a real `.env` file or secrets to GitHub. `.gitignore` excludes it.
- This is a backend API and does not include a user interface.
- Add authentication and authorization before using it with real users.
