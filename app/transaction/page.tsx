'use client';

import { useState } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState<{ type: string; user: string }[]>([]);

  const handleTransaction = (type: string) => {
    const user = prompt('Enter user info:');
    if (user) {
      const newTransaction = { type, user };
      setTransactions([...transactions, newTransaction]);
      console.log('New transaction added:', newTransaction);
      console.log('Current transactions:', transactions);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction System</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => handleTransaction('lend')}
        >
          Lend
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleTransaction('borrow')}
        >
          Borrow
        </button>
      </div>
      {/* Hidden transaction data */}
      <div className="hidden">
        {transactions.map((transaction, index) => (
          <div key={index}>
            {transaction.type} - {transaction.user}
          </div>
        ))}
      </div>
    </div>
  );
}
