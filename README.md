# NASA API Data Explorer 🚀

This is a full-stack web application built with NASA's open APIs to showcase space-related data in a creative and engaging way.

**Live Demo**: 

## ✨ Features

*   **Astronomy Picture of the Day (APOD)**: Enjoy daily space pictures or videos curated by NASA.
*   **Mars Rover Photos**: Browse precious photos sent back by the Curiosity, Spirit, and Opportunity rovers on Mars.
*   **Earth Polychromatic Imaging Camera (EPIC)**: View daily natural-color images of the entire sunlit side of Earth from the Deep Space Climate Observatory (DSCOVR) satellite.
*   **Near Earth Objects (NeoWs)**: Track asteroids and comets that will have a close approach to Earth.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, CSS
*   **Backend**: Node.js, Express.js

## 📁 Project Structure

```
.
├── backend/      # Backend Express server
├── frontend/     # Frontend React application
└── README.md     # Project documentation
```

## 🚀 Local Development Setup

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 1. Clone the Project

```bash
git clone <your-repository-link>
cd <repository-name>
```

### 2. Backend Setup

First, you'll need a NASA API key.

1.  Visit [https://api.nasa.gov/](https://api.nasa.gov/) and sign up for a free API key.

2.  Navigate to the `backend` directory and create a `.env` file.

    ```bash
    cd backend
    ```

    Create a `.env` file inside the `backend` directory and add the following content:

    ```env
    # .env
    PORT=3001
    NASA_API_KEY=your_nasa_api_key_here
    ```
    > **Important**: Replace `your_nasa_api_key_here` with your actual API key.

3.  Install dependencies and start the backend server.

    ```bash
    npm install
    npm start
    ```

    The server will run on `http://localhost:3001` by default.

### 3. Frontend Setup

Open a new terminal window.

1.  Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```

2.  Install dependencies and start the frontend development server.

    ```bash
    npm install
    npm run dev
    ```

    The frontend application should now be running on `http://localhost:5173` (Vite's default port) or another port as indicated in your terminal. You can open it in your browser to see the app.

## Deployment

You can deploy this application to any platform that supports Node.js and static site hosting, such as Vercel (recommended), Render, or Heroku.

### Frontend Deployment (Example with Vercel)

1.  Push your project to a GitHub/GitLab repository.
2.  On Vercel, select "Import Project from Git".
3.  Set the project's root directory to `frontend`.
4.  Configure the build command to `npm run build` and the output directory to `dist`.
5.  Add the environment variable `VITE_API_BASE_URL` with the URL of your deployed backend server.

### Backend Deployment (Example with Render)

1.  On Render, create a new "Web Service".
2.  Connect your GitHub repository.
3.  Set the project's root directory to `backend`.
4.  Configure the build command to `npm install` and the start command to `npm start`.
5.  In the "Environment" tab, add the environment variables defined in your `.env` file (`PORT`, `NASA_API_KEY`).
6.  Deploy the service and use the generated URL as the `VITE_API_BASE_URL` in your frontend configuration. 