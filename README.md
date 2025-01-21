# Referral Builder Application By: FE-Sergio-Lio

This project is a **Referral Builder Application** built using modern web technologies. The application allows users to manage and search for referrals, providing CRUD functionalities and a responsive user interface.

---

Task: Referral Builder
Our design/UX team has put together a layout for an app, Referral Builder, to allow entering user personal details on our site.
Based on the design provided at the end of this document:
• build the Referral Builder frontend app
• create a simple REST API that would allow creating and reading Referrals.
Requirements
• As the form is filled out, the preview should be automatically updated
• The Create button should function to call the Create Referral API endpoint
• The app should be responsive for different screen widths
• The form should work in the latest Chrome browser
Guidelines
• Use React as a base library. Feel free to use any react library to complete this task
• We are interested in your coding style and how you solve problems. To this end, please include your source code and any
build steps / explanations / set up instructions we may need to test the submission
• Please structure the code for reusability

---

### Time of Completion
- 2.5 hrs.


## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Running the Application](#running-the-application)
5. [Other Questions](#other-questions)
---

## Tech Stack

This application is built with the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Provides static typing for JavaScript to enhance developer experience and code maintainability.
- **Vite**: A fast build tool and development server for modern web projects.
- **Supabase**: Used as a backend service for database and authentication.
- **React Query**: For managing server state and caching.
- **Tailwind CSS**: For styling the application with utility-first CSS classes.
- **React Toastify**: For showing notifications.

---

## Features

- Add, view, edit, and delete referrals.
- Search filter and pagination.
- Responsive design on different devices.
- API - Backend integration with Supabase for real-time updates.

---

### 1. Clone the Repository

```bash
git clone https://github.com/skitband/referral_builder.git
cd referral_builder
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

## Running the Application

### Development Mode

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist` folder. You can serve them using any static file server.

---

## Other Questions

### 1. What is redux middleware and what is the middleware you have used in your past projects? Explain how you have used them.

Redux middleware extends the capabilities of the Redux store by providing a mechanism to intercept and modify actions before they reach the reducers. Essentially, it acts as an intermediary between your action creators and the reducers, allowing you to perform side effects:

- Asynchronous operations: Making API calls, fetching data, interacting with external services.
- Logging: Tracking actions dispatched and received by the store for debugging and monitoring.
- Authentication: Implementing authentication checks before allowing certain actions to proceed and routing.
- Error handling: Centralized error handling and reporting.

Redux Thunk: This is a widely used middleware that allows you to dispatch functions instead of plain objects as actions. These functions can then perform asynchronous operations and dispatch other actions as needed.

### 2. What are higher-order components in React?

- In React, HOC are functions that take a component as input and return a new component. HOC are component-based architecture that are instrumental in promoting code reusability. This enhances modularity and maintainability of components.

### 3. How do you maintain code quality in CI/CD? Explain your best practices.

Following CI/CD best practices is critical for software engineering and operations teams because it impacts every part of the process. Improving quality, making engineers more productive, allowing businesses to shorten the time to deliver critical features and much more. Best practices includes:

- Commit Early, Commit Often
- Build Only Once
- Use Shared Pipelines
- Automate Tests
- Keep Builds Fast
- Monitor and Measure Your Pipeline
- Involve the Whole Team in CI/CD Implementation