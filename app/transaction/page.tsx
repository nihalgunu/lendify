'use client';

import { useState } from 'react';
import Navbar from "../navbar/Navbar"; // Import the Navbar component

export default function Transactions() {
  const [transactions, setTransactions] = useState<{ type: string; user: string }[]>([]);
  const [moneyLocations, setMoneyLocations] = useState<{ user: string; amount: number }[]>([
    { user: 'user-123', amount: 1000 }, // Initial amount for the user
  ]);

  const handleTransaction = (type: string) => {
    const user = prompt('Enter user info:');
    if (user) {
      const amount = parseFloat(prompt('Enter amount:') || '0');
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
      }

      const newTransaction = { type, user };
      setTransactions([...transactions, newTransaction]);

      // Update money locations based on the transaction type
      if (type === 'lend') {
        // Subtract from the user's money
        setMoneyLocations(moneyLocations.map(loc => {
          if (loc.user === 'user-123') {
            return { ...loc, amount: loc.amount - amount };
          }
          return loc;
        }));

        // Add to the other user's money
        const userExists = moneyLocations.some(loc => loc.user === user);
        if (userExists) {
          setMoneyLocations(moneyLocations.map(loc => {
            if (loc.user === user) {
              return { ...loc, amount: loc.amount + amount };
            }
            return loc;
          }));
        } else {
          setMoneyLocations([...moneyLocations, { user, amount }]);
        }
      } else if (type === 'borrow') {
        // Add to the user's money
        setMoneyLocations(moneyLocations.map(loc => {
          if (loc.user === 'user-123') {
            return { ...loc, amount: loc.amount + amount };
          }
          return loc;
        }));

        // Subtract from the other user's money
        setMoneyLocations(moneyLocations.map(loc => {
          if (loc.user === user) {
            return { ...loc, amount: loc.amount - amount };
          }
          return loc;
        }));
      }

      console.log('New transaction added:', newTransaction);
      console.log('Current transactions:', transactions);
      console.log('Current money locations:', moneyLocations);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add the Navbar at the top */}
      <Navbar />

      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Transaction System</h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
              onClick={() => handleTransaction('lend')}
            >
              Lend
            </button>
            <button
              className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
              onClick={() => handleTransaction('borrow')}
            >
              Borrow
            </button>
          </div>
          {/* Display transaction data */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center">No transactions yet.</p>
            ) : (
              <ul className="space-y-2">
                {transactions.map((transaction, index) => (
                  <li key={index} className="text-gray-700 font-medium">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} - {transaction.user}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display money locations */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Money Locations</h2>
            {moneyLocations.length === 0 ? (
              <p className="text-gray-500 text-center">No money tracked yet.</p>
            ) : (
              <ul className="space-y-2">
                {moneyLocations.map((location, index) => (
                  <li key={index} className="text-gray-700 font-medium">
                    {location.user}: ${location.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
