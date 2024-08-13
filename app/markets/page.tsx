'use client';

import React from 'react';
import Navbar from '../navbar/Navbar'; // Import the Navbar component

const marketsPage = () => {
  const cryptocurrencies = [
    { name: 'Bitcoin (BTC)', price: '$45,000', change: '+2.5%' },
    { name: 'Ethereum (ETH)', price: '$3,200', change: '+1.8%' },
    { name: 'Binance Coin (BNB)', price: '$400', change: '+0.7%' },
    { name: 'Cardano (ADA)', price: '$2.10', change: '-1.2%' },
    { name: 'Solana (SOL)', price: '$150', change: '+3.0%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add the Navbar at the top */}
      <Navbar />

      <div className="flex flex-col items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mt-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cryptocurrency Markets</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cryptocurrencies.map((crypto, index) => (
              <div key={index} className="bg-blue-50 rounded-lg shadow p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{crypto.name}</h2>
                <p className="text-xl text-gray-700">{crypto.price}</p>
                <p className={`text-lg font-medium ${crypto.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default marketsPage;
