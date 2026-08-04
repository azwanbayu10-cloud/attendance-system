# Employee Attendance Management System

Production-ready full-stack attendance platform with Express, MySQL, Prisma, JWT authentication, QR attendance, GPS validation, Socket.io updates, and a React/Vite/Tailwind frontend.

## Stack

- **Backend:** Node.js, Express.js, Prisma ORM, MySQL, JWT, bcrypt, Multer, QRCode, Socket.io, ExcelJS, PDFKit
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Infrastructure:** Docker Compose with MySQL, backend, and frontend services

## Features

### Admin
- Login and role-based dashboard
- Employee management
- Department, position, and work schedule CRUD APIs
- QR code generator for short-lived attendance tokens
- Real-time attendance monitoring via Socket.io
- Excel and PDF reports
- Settings-ready database model

### Employee
- Self registration and login
- Dashboard
- GPS validated QR check in and check out
- Attendance history
- Profile avatar upload endpoint

### Attendance Rules
- QR token must be active and unexpired
- GPS coordinates must be within the configured office radius
- Late status is detected against assigned schedule start time
- Check-in/check-out logs are retained for auditability

## Getting Started

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Start MySQL:
   ```bash
   docker compose up -d mysql
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate --workspace backend
   npm run prisma:migrate --workspace backend
   ```
5. Run the app:
   ```bash
   npm run dev
   ```

## Docker

Run the complete stack:

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
Backend health: http://localhost:4000/health

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/attendance/check-in`
- `POST /api/attendance/check-out`
- `GET /api/attendance/history`
- `GET /api/admin/dashboard`
- `GET|POST|PATCH|DELETE /api/admin/departments`
- `GET|POST|PATCH|DELETE /api/admin/positions`
- `GET|POST|PATCH|DELETE /api/admin/schedules`
- `POST /api/admin/qr`
- `GET /api/admin/monitor`
- `GET /api/admin/reports?format=xlsx|pdf`

## Security

- Passwords are hashed with bcrypt using 12 salt rounds.
- JWTs carry user id and role claims.
- Protected routes require a valid bearer token.
- Admin APIs require the `ADMIN` role.
- Request bodies are validated with Joi.
- Helmet, CORS, and rate limiting are enabled.
