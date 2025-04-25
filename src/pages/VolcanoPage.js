import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const VolcanoPage = () => {
  const { userAddress, hasPaid, isLoading, miningStats } = useApp();
  const navigate = useNavigate();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [countdown, setCountdown] = useState(null);
  
  // Redirect to home if not connected or not paid
  useEffect(() => {
    if (!userAddress && !isLoading) {
      navigate('/');
    } else if (!hasPaid && !isLoading) {
      navigate('/dashboard');
    }
  }, [userAddress, hasPaid, isLoading, navigate]);
  
  // Check if user can spin
  useEffect(() => {
    const lastSpinTime = localStorage.getItem('lastSpinTime');
    if (lastSpinTime) {
      const now = new Date().getTime();
      const timeSinceLastSpin = now - parseInt(lastSpinTime);
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours
      
      if (timeSinceLastSpin < cooldownPeriod) {
        setCanSpin(false);
        const timeLeft = cooldownPeriod - timeSinceLastSpin;
        setCountdown(Math.floor(timeLeft / 1000));
      } else {
        setCanSpin(true);
        setCountdown(null);
      }
    }
  }, []);
  
  // Countdown timer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanSpin(true);
      setCountdown(null);
    }
  }, [countdown]);
  
  const formatCountdown = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const rewards = [
    { id: 1, name: '10 CHIX', color: 'bg-lava-500', icon: '🪨' },
    { id: 2, name: '25 CHIX', color: 'bg-lava-600', icon: '🪨' },
    { id: 3, name: '50 CHIX', color: 'bg-lava-700', icon: '🪨' },
    { id: 4, name: '1.5x Boost', color: 'bg-yellow-500', icon: '⚡' },
    { id: 5, name: '2x Boost', color: 'bg-yellow-600', icon: '⚡' },
    { id: 6, name: '1 Fossil', color: 'bg-cosmic-500', icon: '🦴' },
    { id: 7, name: '2 Fossils', color: 'bg-cosmic-600', icon: '🦴' },
    { id: 8, name: 'Try Again', color: 'bg-prehistoric-600', icon: '❌' },
  ];
  
  const spinWheel = () => {
    if (!canSpin) return;
    
    setIsSpinning(true);
    setSpinResult(null);
    
    // Random number of full rotations (3-5) plus the position for the reward
    const rewardIndex = Math.floor(Math.random() * rewards.length);
    const fullRotations = 3 + Math.floor(Math.random() * 3);
    const rewardAngle = (rewardIndex * (360 / rewards.length)) + (Math.random() * (360 / rewards.length));
    const totalAngle = fullRotations * 360 + rewardAngle;
    
    setSpinAngle(totalAngle);
    
    // Set last spin time
    localStorage.setItem('lastSpinTime', new Date().getTime().toString());
    setCanSpin(false);
    
    // Show result after animation
    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(rewards[rewardIndex]);
      
      // Set countdown for next spin
      setCountdown(24 * 60 * 60); // 24 hours in seconds
    }, 5000);
  };
  
  if (!userAddress || !hasPaid) {
    return (
      <div className="min-h-screen bg-prehistoric-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-prehistoric-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-jurassic text-white mb-8 text-center">Volcano of Fate</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-jurassic text-white mb-4 text-center">Spin to Win</h2>
              
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Volcano background */}
                <div className="absolute inset-0 bg-prehistoric-700 rounded-full overflow-hidden">
                  <div className="absolute bottom-0 w-full h-1/3 bg-lava-700"></div>
                  <div className="absolute bottom-0 w-full h-1/4 bg-lava-600"></div>
                  <div className="absolute bottom-0 w-full h-1/6 bg-lava-500"></div>
                </div>
                
                {/* Wheel */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: isSpinning ? spinAngle : 0 }}
                  transition={{ duration: 5, ease: "easeOut" }}
                >
                  <div className="relative w-56 h-56 rounded-full overflow-hidden">
                    {rewards.map((reward, index) => (
                      <div 
                        key={reward.id}
                        className={`absolute w-1/2 h-1/2 ${reward.color} flex items-center justify-center`}
                        style={{ 
                          transformOrigin: '100% 100%',
                          transform: `rotate(${index * (360 / rewards.length)}deg) skew(${90 - (360 / rewards.length)}deg)` 
                        }}
                      >
                        <div 
                          className="text-white text-xl font-bold"
                          style={{ 
                            transform: `skew(${-(90 - (360 / rewards.length))}deg) rotate(${-(index * (360 / rewards.length) + (360 / rewards.length) / 2)}deg)`,
                            marginLeft: '-25%',
                            marginBottom: '25%'
                          }}
                        >
                          {reward.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Center pin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg z-10"></div>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 z-20 pointer-events-none">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-lava-600"></div>
                </div>
              </div>
              
              <div className="text-center">
                {spinResult ? (
                  <div className="mb-4 p-3 bg-prehistoric-700 rounded-lg inline-block">
                    <span className="text-white">You won: </span>
                    <span className="text-lava-300 font-bold">{spinResult.icon} {spinResult.name}</span>
                  </div>
                ) : (
                  <div className="h-12"></div>
                )}
                
                <button
                  className={`px-6 py-3 rounded-lg font-bold text-white ${
                    canSpin 
                      ? 'bg-lava-600 hover:bg-lava-700 cursor-pointer' 
                      : 'bg-prehistoric-700 cursor-not-allowed'
                  }`}
                  onClick={spinWheel}
                  disabled={!canSpin || isSpinning}
                >
                                    {isSpinning 
                    ? 'Spinning...' 
                    : canSpin
                      ? 'Spin the Wheel'
                      : countdown !== null
                        ? `Next spin in: ${formatCountdown(countdown)}`
                        : 'Spin the Wheel'}
                </button>
              </div>
            </div>
            
            <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-jurassic text-white mb-4">Possible Rewards</h2>
              
              <div className="space-y-3">
                {rewards.map(reward => (
                  <div 
                    key={reward.id}
                    className="flex items-center p-3 bg-prehistoric-700 rounded-lg"
                  >
                    <div className={`w-10 h-10 ${reward.color} rounded-full flex items-center justify-center text-xl mr-3`}>
                      {reward.icon}
                    </div>
                    <div className="text-white">{reward.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-prehistoric-700 rounded-lg">
                <h3 className="text-white font-bold mb-2">Daily Spin</h3>
                <p className="text-prehistoric-200 text-sm">
                  Spin the Volcano of Fate once every 24 hours for a chance to win CHIX tokens, 
                  mining boosts, and rare fossils!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-prehistoric-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-jurassic text-white mb-4">Volcano Sacrifice</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-prehistoric-700 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">Small Eruption</h3>
                <p className="text-prehistoric-200 text-sm mb-3">
                  Sacrifice 50 CHIX for a guaranteed reward
                </p>
                <button className="w-full bg-lava-600 hover:bg-lava-700 text-white py-2 rounded transition-colors">
                  Sacrifice 50 CHIX
                </button>
              </div>
              
              <div className="bg-prehistoric-700 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">Medium Eruption</h3>
                <p className="text-prehistoric-200 text-sm mb-3">
                  Sacrifice 100 CHIX for better rewards
                </p>
                <button className="w-full bg-lava-600 hover:bg-lava-700 text-white py-2 rounded transition-colors">
                  Sacrifice 100 CHIX
                </button>
              </div>
              
              <div className="bg-prehistoric-700 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">Mega Eruption</h3>
                <p className="text-prehistoric-200 text-sm mb-3">
                  Sacrifice 250 CHIX for premium rewards
                </p>
                <button className="w-full bg-lava-600 hover:bg-lava-700 text-white py-2 rounded transition-colors">
                  Sacrifice 250 CHIX
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-prehistoric-700 rounded-lg">
              <h3 className="text-white font-bold mb-2">About Volcano Sacrifice</h3>
              <p className="text-prehistoric-200 text-sm">
                Sacrifice your CHIX tokens to the volcano for guaranteed rewards. 
                Higher sacrifices yield better rewards, including rare fossils, 
                extended mining boosts, and exclusive collectibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolcanoPage;