
# Economy Auth App

## Project Overview

Freelance project for CS and IT students: Developed the complete front-end dashboard with a login system for a mobile app focused on income management and savings. Provided a user-friendly interface for tracking expenses and achieving financial goals. 
## demo go link
'https://drive.google.com/file/d/1gVGSKOwnwrCnTK8DZEAPHo9Q9BP_xJyA/view?usp=sharing'
## Features Description

The mobile dashboard offers a range of functionalities to help users manage their finances effectively:

*   **User Authentication:** Secure user registration and login system to protect user data.
*   **Dashboard:** A comprehensive overview of the user's financial status, including total income, total expenses, and current balance.
*   **Expense Tracking:** Users can add, edit, and delete their expenses, categorizing them for better financial insights.
*   **Income Management:** Users can record their income sources and amounts.
*   **Data Visualization:** Interactive charts and graphs to visualize spending habits and financial progress.
*   **Admin Panel:** A dedicated dashboard for administrators to view platform statistics, manage users, and upload price data.
*   **File Upload:** Admins can upload CSV files containing price information.

## Technologies Used

This project is built using a modern front-end stack:

*   **React:** A popular JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **React Router:** For handling routing and navigation within the application.
*   **React Hook Form:** For managing forms and validation.
*   **Zod:** A TypeScript-first schema declaration and validation library.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **Recharts:** A composable charting library built on React components.
*   **SweetAlert2:** A beautiful, responsive, customizable, and accessible replacement for JavaScript's popup boxes.
*   **TanStack Query:** For fetching, caching, and updating data in React applications.

## Student Achievement

This project showcases the student's ability to build a full-fledged front-end application from scratch. The student was responsible for:

*   Designing and implementing the entire user interface.
*   Setting up the project structure and build process using Vite.
*   Implementing a secure authentication system.
*   Creating a responsive and interactive dashboard with data visualization.
*   Managing application state and API interactions.

## Usage Instructions

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/Elsheshtawey1/economy-auth-app.git>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open the application in your browser:**
    The application will be available at `http://localhost:5173`.

## Project Structure

The project is structured as follows:

```
economy-auth-app/
├── public/              # Static assets
├── src/                 # Source code
│   ├── api/             # API-related files (e.g., axios instance)
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable React components
│   │   ├── Auth/        # Authentication-related components
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   ├── Style/           # CSS stylesheets
│   └── validation/      # Zod validation schemas
├── .gitignore           # Git ignore file
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
└── vite.config.js       # Vite configuration
```
