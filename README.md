# Personal Finance Transaction Tracker API
Developer Name: Caleb Karimi

## Project Overview
A RESTful API built with Node.js and Express.js for managing personal finance transactions. This API allows users to track deposits, withdrawals, and monitor their account balance.

## Features

- User Management: Create and manage user accounts, Track user balance automatically, Retrieve user information

- Transaction Management: Record deposits and withdrawals, Automatic balance updates, Transaction history with filtering, Delete transactions(with balance reversal) 

- Balance Tracking: Real-time balance calculation, Balance summary with totals, Insufficient balance validation

- Data Filtering: Filter transactions by user, Filter by transaction type (deposit/withdrawal), Filter by category

## Tech Stack
- Runtime: Node.js (v14 or higher)
- Framework: Express.js (v4.18+)
- Language: JavaScript (ES6+ with ES Modules)
- Storage: In-memory storage (JavaScript objects)
- Development Tools: nodemon

## Project Structure
finance-tracker-api/

├── data/

│   └── storage.js          # In-memory data storage & business logic

├── middleware/

│   └── errorHandler.js     # Custom error middleware

├── node_modules/           # Contains project dependencies

├── routes/

│   ├── userRoutes.js       # User CRUD endpoints

│   └── transactionRoutes.js # Transaction CRUD endpoints

├── utils/

│   └── idGenerator.js           # Custom id generator utility

├── validators/

│   └── transactionValidators.js      # transactions logic validators

│   └── userValidators.js      # users logic validators

├── server.js               # Main application entry point

├── package.json            # Project dependencies & scripts

├── .gitignore             # Git ignore file

└── README.md              # Project documentation

## Getting Started
1. Prerequisites
- Before you begin, ensure you have the following installed:
    Node.js (v14.0.0 or higher)
    npm (v6.0.0 or higher)
    Git (optional, for cloning)

- Check your versions:
    `node --version`
    `npm --version`

2. Installation

- Clone the repository (or download the ZIP)
    `git clone https://github.com/yourusername/personal-finance-tracker.git`
    `cd personal-finance-tracker`

- Install dependencies
    `npm install`

- Verify installation
    `npm list`

- Expected dependencies:
    `express`
    `nodemon (dev dependency)`

3. Running the Application
- Development mode (with auto-restart on file changes):
    `npm run dev`
- Production mode:
    `npm start`


- The server will start on http://localhost:3000. 
- Expected response to verify the server is running:
    json{
        message: 'Finance Tracker API is running',
        version: '1.0.0'
    }

## API Documentation

### Base URL
- http://localhost:3000/api

## Response Format
All API responses follow this structure:
- Success Response:
    json{
        "status": 200,
        "message": "Success message",
        "data": { ... }
    }

- Error Response:
    json{
        "status": 400,
        "message": "Error message",
        "errors": ["Error detail 1", "Error detail 2"]
    }
## Error Handling
The API uses standard HTTP status codes:
- 200 Success
- 201 Created
- 400 Bad Request (validation error, insufficient balance)
- 404 Not Found (user or transaction doesn't exist)
- 500 Internal Server Error