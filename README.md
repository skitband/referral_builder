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

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Running the Application](#running-the-application)

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

