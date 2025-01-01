# TODO Feature for Medical Practices

A task management system designed to facilitate collaboration among doctors, nurses, and secretaries in medical practices. Includes features for user management, patient management, and task assignment.

---

## Tech Stack

- **Backend**: Node.js + TypeScript
- **Frontend**: React.js + TypeScript
- **Database**: PostgreSQL

---

## Prerequisites

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org) (v16 or higher)
- [npm](https://www.npmjs.com/) 
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zigpot/senior-engingeer-todo-feature.git
   cd senior-engineer-todo-feature
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

---

## Environment Variables

Create `.env` files in the `backend` and `frontend` directories.

### Backend `.env`:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=todo_db
```

### Frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Running the Project

### 1. Start the Backend
Navigate to the `backend` directory:
```bash
cd backend
npm run dev
```

### 2. Start the Frontend
Navigate to the `frontend` directory:
```bash
cd ../frontend
npm start
```

The application should now be accessible at `http://localhost:3000`.

---

## Database Setup

### 1. Run Migrations
Navigate to the `backend` directory and execute your migration scripts:
```bash
npm run migrate
```

### 2. Seed the Database
Seed the database with initial data:
```bash
node database/seeders/seed.js
```

---

## Testing

Run tests for the backend:
```bash
npm run test
```

Run tests for the frontend:
```bash
npm run test
```

---

## Additional Notes

- Make sure the backend is running before starting the frontend.
- Ensure PostgreSQL is running and accessible.

---

## License

This project is licensed under the MIT License.
