# 📝Simple Task Manager

A simple full-stack task management application with a Node.js/Express backend and a React/Vite frontend.

## 📌Prerequisites

- **Node.js**: v18 or higher recommended
- **MongoDB**: A running MongoDB instance (or MongoDB Atlas)

## 🛠️Technologies Used

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Axios**: API requests
- **Lucide React**: Icons
- **React Router**: Client-side routing

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication
- **Bcryptjs**: Password hashing

---

## 🚀Setup Instructions

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Create a `.env` file in the `backend` folder (if it doesn't exist).
    -   Add the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
        ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

---

## 🎯Basic Usage

- **Register/Login**: Create an account to start managing your tasks.
- **Dashboard**: View, create, and manage your tasks in real-time.
