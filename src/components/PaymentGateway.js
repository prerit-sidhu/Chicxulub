import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const PaymentGateway = () => {
  const { handlePayment, isLoading, tonConnectUI } = useApp();
  
  return (
    <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="w-24 h-24 mx-auto bg-lava-600 rounded-full flex items-center justify-center text-4xl mb-4">
          🪨
        </div>
        <h2 className="text-2xl font-jurassic text-white mb-2">Unlock CHIX Mining</h2>
        <p className="text-prehistoric-200">Pay a one-time fee to start your prehistoric mining journey</p>
      </motion.div>
      
      <div className="bg-prehistoric-700 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-prehistoric-100">Activation Fee:</span>
          <span className="text-lava-300 font-bold">0.5 TON</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-prehistoric-100">Unlocks:</span>
          <span className="text-cosmic-300 font-bold">Lifetime Access</span>
        </div>
      </div>
      
      <div className="mb-6 text-prehistoric-200 text-sm">
        <p>By paying the fee, you'll unlock:</p>
        <ul className="mt-2 space-y-1 text-left list-disc pl-5">
          <li>Full access to the CHIX mining simulator</li>
          <li>Daily missions and rewards</li>
          <li>Volcano of Fate spins</li>
          <li>Fossil collection system</li>
          <li>Leaderboard participation</li>
        </ul>
      </div>
      
      <button
        className="bg-lava-600 hover:bg-lava-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors w-full"
        onClick={handlePayment}
        disabled={isLoading}
      >
        {!tonConnectUI.connected 
          ? 'Connect Wallet to Pay' 
          : isLoading 
            ? 'Processing...' 
            : 'Pay 0.5 TON to Unlock'}
      </button>
      
      <div className="mt-4 text-xs text-prehistoric-300">
        Payments are processed securely via TON blockchain
      </div>
    </div>
  );
};

export default PaymentGateway;