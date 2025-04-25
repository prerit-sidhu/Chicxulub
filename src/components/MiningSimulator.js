import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const MiningSimulator = () => {
  const { miningStats = {}, mine, isLoading, userAddress, hasPaid, tonConnectUI } = useApp() || {};
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningDuration, setMiningDuration] = useState(60); // Default 60 seconds
  
  useEffect(() => {
    let timer;
    if (isMining && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isMining && timeLeft === 0) {
      setIsMining(false);
      try {
        if (mine) mine(miningDuration);
      } catch (error) {
        console.error("Error during mining:", error);
      }
    }
    
    return () => clearTimeout(timer);
  }, [isMining, timeLeft, mine, miningDuration]);
  
  const startMining = () => {
    // Check if wallet is connected
    if (!userAddress) {
      alert('Please connect your wallet first');
      if (tonConnectUI && tonConnectUI.openModal) {
        tonConnectUI.openModal();
      }
      return;
    }
    
    // Check if user has paid the fee
    if (!hasPaid) {
      alert('You need to pay the activation fee before mining');
      return;
    }
    
    setTimeLeft(miningDuration);
    setIsMining(true);
  };
  
  const stopMining = () => {
    if (timeLeft > 0) {
      // Only mine for the time that has passed
      const timeMined = miningDuration - timeLeft;
      if (timeMined > 0) {
        mine(timeMined);
      }
    }
    setIsMining(false);
    setTimeLeft(0);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-jurassic text-white mb-4">Mining Simulator</h2>
      
      <div className="bg-prehistoric-700 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-prehistoric-100">Mining Power:</span>
          <span className="text-lava-300 font-bold">{miningStats.miningPower}x</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-prehistoric-100">Boost Multiplier:</span>
          <span className="text-cosmic-300 font-bold">{miningStats.miningBoost}x</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-prehistoric-100">Daily Streak:</span>
          <span className="text-yellow-300 font-bold">{miningStats.dailyStreak} days</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-prehistoric-100 mb-2">Mining Duration:</label>
        <select 
          className="w-full bg-prehistoric-600 text-white rounded p-2 border border-prehistoric-500"
          value={miningDuration}
          onChange={(e) => setMiningDuration(Number(e.target.value))}
          disabled={isMining}
        >
          <option value={60}>1 Minute (6 CHIX)</option>
          <option value={300}>5 Minutes (30 CHIX)</option>
          <option value={600}>10 Minutes (60 CHIX)</option>
        </select>
      </div>
      
      {isMining ? (
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-lava-300 mb-4">{formatTime(timeLeft)}</div>
          <div className="w-full bg-prehistoric-600 rounded-full h-4 mb-4">
            <motion.div 
              className="bg-lava-500 h-4 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / miningDuration) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <div className="relative h-40 overflow-hidden rounded-lg mb-4">
            <div className="absolute inset-0 bg-prehistoric-900 flex items-center justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 bg-lava-500 rounded-full"
                  animate={{
                    y: ['-100%', '100%'],
                    x: Math.random() * 200 - 100,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
              <motion.div 
                className="w-16 h-16 text-4xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                🪨
              </motion.div>
            </div>
          </div>
          
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors w-full"
            onClick={stopMining}
            disabled={isLoading}
          >
            Stop Mining
          </button>
        </div>
      ) : (
        <button
          className="bg-lava-600 hover:bg-lava-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors w-full"
          onClick={startMining}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Start Mining'}
        </button>
      )}
      
      <div className="mt-4 text-sm text-prehistoric-200 text-center">
        Last mined: {miningStats.lastMined ? new Date(miningStats.lastMined).toLocaleString() : 'Never'}
      </div>
    </div>
  );
};

export default MiningSimulator;