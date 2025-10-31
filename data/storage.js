export let users = {
  '1': {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    balance: 1000.00,  // ← NEW: Track user balance
    createdAt: new Date('2024-01-15')
  },
  '2': {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    balance: 500.00,   // ← NEW: Track user balance
    createdAt: new Date('2024-02-20')
  },
  '3': {
    id: '3',
    name: 'Calvin Klein',
    email: 'calvin@example.com',
    balance: 200.00,   // ← NEW: Track user balance
    createdAt: new Date('2024-02-20')
  }
};

export let transactions = {
  '1': {
    id: '1',
    userId: '1',                    // Foreign key to users
    type: 'deposit',                // 'deposit' or 'withdrawal'
    amount: 500.00,
    description: 'Monthly salary',
    category: 'income',             // For deposits: 'income', 'refund', etc.
    createdAt: new Date('2024-10-01T09:00:00Z')
  },
  '2': {
    id: '2',
    userId: '1',
    type: 'withdrawal',
    amount: 50.00,
    description: 'Groceries',
    category: 'food',               // For withdrawals: 'food', 'transport', etc.
    createdAt: new Date('2024-10-15T14:30:00Z')
  },
  '3': {
    id: '3',
    userId: '2',
    type: 'deposit',
    amount: 1000.00,
    description: 'Freelance payment',
    category: 'income',
    createdAt: new Date('2024-10-20T11:00:00Z')
  }
};