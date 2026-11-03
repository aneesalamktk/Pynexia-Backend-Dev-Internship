# Week 2 - Employee Attendance Management System

Beginner-friendly REST API using Node.js, Express and MongoDB.

## Features
- Employee CRUD: create, list, view, update and delete.
- Validate required fields and email format; prevent duplicate emails.
- Record daily employee check-in and check-out times.
- Prevent duplicate daily check-in/check-out.
- View today's attendance and retrieve history.
- Filter history by employee ID and date range.
- Remove an employee's attendance history when that employee is deleted.

## Requirements
- Node.js and npm
- MongoDB Community Server running locally, or a MongoDB connection string.

## Setup
1. Open this folder in VS Code and open Terminal > New Terminal.
2. Run `npm install`.
3. Copy `.env.example` to a new file named `.env`.
4. Put these settings in `.env`:
   `PORT=5000`
   `MONGODB_URI=mongodb://127.0.0.1:27017/employee_attendance`
5. Make sure MongoDB is running.
6. Run `npm start`.
7. Visit `http://localhost:5000` to check the API.
For auto-restart while developing, run `npm run dev`.

## Employee endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees` | List employees |
| GET | `/api/employees/:id` | Get one employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee and attendance |

Example POST `/api/employees` JSON:
```json
{"name":"Ayesha Khan","email":"ayesha@example.com","department":"Human Resources","position":"HR Assistant"}
```

## Attendance endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/attendance/check-in` | Record today's check-in |
| POST | `/api/attendance/check-out` | Record today's check-out |
| GET | `/api/attendance/today` | Today's attendance |
| GET | `/api/attendance/history` | Attendance history |

Check-in/check-out JSON body:
```json
{"employeeId":"PASTE_EMPLOYEE_ID_HERE"}
```

History filters:
- `/api/attendance/history`
- `/api/attendance/history?employeeId=EMPLOYEE_ID`
- `/api/attendance/history?from=2026-01-01&to=2026-01-31`

## Test using Postman or Thunder Client
1. POST `/api/employees` with the employee example above.
2. Copy the returned `_id`.
3. POST `/api/attendance/check-in` with `{"employeeId":"COPIED_ID"}`.
4. POST `/api/attendance/check-out` with the same ID.
5. GET `/api/attendance/history` to view the record.
Use `Content-Type: application/json` for JSON request bodies.

## Notes
This is an internship learning project, not a production HR system. It does not include login/authentication. Attendance dates use the server's local timezone. Do not upload your actual `.env` file or database passwords to GitHub.
