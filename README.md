# Aegis - A Multi-AI Agent Platform

This repository contains the source code for Aegis, a web platform providing access to specialized AI agents for tasks like trading, diet planning, and travel arrangements.

## Project Structure

- `/backend`: The FastAPI application that serves the API and handles agent logic.
- `/frontend`: The React/Vite client application that provides the user interface.

## Getting Started

Follow these instructions to get the project running on your local machine.

### 1. Database Setup (Supabase)

This project uses a PostgreSQL database, hosted on Supabase.

1.  Create a new project on [Supabase](https://supabase.com/).
2.  Navigate to the **SQL Editor** in your Supabase project.
3.  Run the following SQL query to create the necessary `users` table:

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    ```

### 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd aegis-platform/backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    # Create the environment
    python -m venv .venv

    # Activate on Windows
    .\.venv\Scripts\activate

    # Activate on macOS/Linux
    # source .venv/bin/activate
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Create the environment file:**
    - Create a new file named `.env` inside the `aegis-platform/backend` directory.
    - Add the following variables, replacing the placeholder values with your actual credentials from Supabase and Google Cloud.

    ```env
    SUPABASE_URL="YOUR_SUPABASE_URL"
    SUPABASE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    JWT_SECRET_KEY="YOUR_STRONG_SECRET_KEY_FOR_JWT"
    GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
    ```
    *To generate a `JWT_SECRET_KEY`, you can use a command like `openssl rand -hex 32` in your terminal.*

5.  **Run the backend server:**
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### 3. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd aegis-platform/frontend
    ```

2.  **Install the required dependencies:**
    ```bash
    npm install
    ```

3.  **Create the environment file:**
    - Create a new file named `.env.local` inside the `aegis-platform/frontend` directory.
    - Add the following variable to tell the frontend where the backend API is running:

    ```env
    VITE_API_BASE_URL=http://127.0.0.1:8000
    ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`. You can open this URL in your browser to use the application.
