## Personal Finance Transaction Tracker API
Developer Name: Caleb Karimi

# Project Overview
A RESTful API built with Node.js and Express.js for managing personal finance transactions. This API allows users to track deposits, withdrawals, and monitor their account balance.

# Features

- User Management: Create and manage user accounts, Track user balance automatically, Retrieve user information

- Transaction Management: Record deposits and withdrawals, Automatic balance updates, Transaction history with filtering, Delete transactions(with balance reversal) 

- Balance Tracking: Real-time balance calculation, Balance summary with totals, Insufficient balance validation

- Data Filtering: Filter transactions by user, Filter by transaction type (deposit/withdrawal), Filter by category

# Tech Stack
- Runtime: Node.js (v14 or higher)
- Framework: Express.js (v4.18+)
- Language: JavaScript (ES6+ with ES Modules)
- Storage: In-memory storage (JavaScript objects)
- Development Tools: nodemon

# Project Structure
personal-finance-tracker/
├── data/
│   └── storage.js          # In-memory data storage & business logic
├── routes/
│   ├── userRoutes.js       # User CRUD endpoints
│   └── transactionRoutes.js # Transaction CRUD endpoints
├── utils/
│   └── errors.js           # Custom error classes
├── server.js               # Main application entry point
├── package.json            # Project dependencies & scripts
├── .gitignore             # Git ignore file
└── README.md              # Project documentation

# Getting Started
1. Prerequisites
- Before you begin, ensure you have the following installed:
    Node.js (v14.0.0 or higher)
    npm (v6.0.0 or higher)
    Git (optional, for cloning)

- Check your versions:
    `node --version`
    `npm --version`

2. Installation

Clone the repository (or download the ZIP)

bashgit clone https://github.com/yourusername/personal-finance-tracker.git
cd personal-finance-tracker

Install dependencies

bashnpm install

Verify installation

bashnpm list
Expected dependencies:

express
nodemon (dev dependency)

Running the Application
Development mode (with auto-restart on file changes):
bashnpm run dev
Production mode:
bashnpm start
The server will start on http://localhost:3000
Verify the server is running:
bashcurl http://localhost:3000/health
Expected response:
json{
  "status": "OK",
  "timestamp": "2024-10-29T10:30:00.000Z"
}
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api
Response Format
All API responses follow this structure:
Success Response:
json{
  "status": 200,
  "message": "Success message",
  "data": { ... }
}
Error Response:
json{
  "status": 400,
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]
}