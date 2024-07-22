# FitConnect

FitConnect is a comprehensive web application designed to connect users with fitness courses and instructors. Users can browse and purchase fitness courses, and contact instructors for personalized training sessions. The application includes user authentication, secure payment integration with Stripe, and a dynamic frontend built with modern web technologies.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Registration and Login:** Users can create accounts and log in securely.
- **Course Browsing and Purchase:** Users can browse a variety of fitness courses and purchase them.
- **Instructor Contact:** Users can contact instructors for personalized training sessions.
- **Secure Payments:** Integration with Stripe ensures secure payment processing.
- **Responsive Design:** The application is designed to be responsive and user-friendly on all devices.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Frontend:** React
- **Authentication:** JSON Web Tokens (JWT)
- **Payments:** Stripe

## Installation

1. **Clone the repository:**

\`\`\`bash
git clone https://github.com/your-username/fitconnect.git
cd fitconnect
\`\`\`

2. **Install backend dependencies:**

\`\`\`bash
cd backend
npm install
\`\`\`

3. **Install frontend dependencies:**

\`\`\`bash
cd ../frontend
npm install
\`\`\`

4. **Set up environment variables:**

Create a `.env` file in the `backend` directory and add your MongoDB URI, JWT secret, and Stripe secret key.

\`\`\`env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
\`\`\`

5. **Start the backend server:**

\`\`\`bash
cd backend
npm start
\`\`\`

6. **Start the frontend development server:**

\`\`\`bash
cd ../frontend
npm start
\`\`\`

## Usage

- Visit \`http://localhost:3000\` in your browser to use the application.
- Register a new user account or log in with an existing one.
- Browse available fitness courses, purchase courses, and contact instructors.

