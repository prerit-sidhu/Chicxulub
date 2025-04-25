import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import MiningSimulator from '../components/MiningSimulator';
import PaymentGateway from '../components/PaymentGateway';

const DashboardPage = () => {
  const { userAddress, hasPaid, miningStats, isLoading } = useApp();
  const navigate = useNavigate();
  
  // Redirect to home if not connected
  useEffect(() => {
    if (!userAddress && !isLoading) {
      navigate('/');
    }
  }, [userAddress, isLoading, navigate]);
  
  if (!userAddress) {
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
        <h1 className="text-4xl font-jurassic text-white mb-8 text-center">Mining Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-prehistoric-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-jurassic text-white mb-4">Your Stats</h2>
              
              <div className="space-y-4">
                <div className="bg-prehistoric-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-prehistoric-100">CHIX Balance:</span>
                    <span className="text-lava-300 font-bold text-xl">{miningStats.chixTokens.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-prehistoric-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-prehistoric-100">Mining Power:</span>
                    <span className="text-cosmic-300 font-bold">{miningStats.miningPower}x</span>
                  </div>
                  <div className="w-full bg-prehistoric-600 rounded-full h-2">
                    <div 
                      className="bg-cosmic-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(miningStats.miningPower * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-prehistoric-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-prehistoric-100">Daily Streak:</span>
                    <span className="text-yellow-300 font-bold">{miningStats.dailyStreak} days</span>
                  </div>
                  <div className="flex space-x-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`h-4 w-full rounded ${i < miningStats.dailyStreak % 7 ? 'bg-yellow-500' : 'bg-prehistoric-600'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-prehistoric-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-prehistoric-100">Fossils Collected:</span>
                    <span className="text-green-300 font-bold">{miningStats.fossilsCollected}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-prehistoric-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-jurassic text-white mb-4">Quick Links</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white p-4 rounded-lg transition-colors">
                  <div className="text-2xl mb-2">🦖</div>
                  <div>Missions</div>
                </button>
                
                <button className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white p-4 rounded-lg transition-colors">
                  <div className="text-2xl mb-2">🌋</div>
                  <div>Volcano</div>
                </button>
                
                <button className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white p-4 rounded-lg transition-colors">
                  <div className="text-2xl mb-2">🏆</div>
                  <div>Leaderboard</div>
                </button>
                
                <button className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white p-4 rounded-lg transition-colors">
                  <div className="text-2xl mb-2">🧬</div>
                  <div>Collection</div>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Center Column - Mining Simulator or Payment Gateway */}
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {hasPaid ? <MiningSimulator /> : <PaymentGateway />}
            </motion.div>
            
            {hasPaid && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 bg-prehistoric-800 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-jurassic text-white mb-4">Active Missions</h2>
                
                <div className="space-y-4">
                  <div className="bg-prehistoric-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white">Daily Mining Challenge</span>
                      <span className="text-sm bg-lava-600 text-white px-2 py-1 rounded">+50 CHIX</span>
                    </div>
                    <p className="text-prehistoric-200 text-sm mb-2">Mine for at least 10 minutes today</p>
                    <div className="w-full bg-prehistoric-600 rounded-full h-2">
                      <div className="bg-lava-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="text-right text-xs text-prehistoric-300 mt-1">3:20 / 10:00</div>
                  </div>
                  
                  <div className="bg-prehistoric-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white">Fossil Hunter</span>
                      <span className="text-sm bg-cosmic-600 text-white px-2 py-1 rounded">+2 Fossils</span>
                    </div>
                    <p className="text-prehistoric-200 text-sm mb-2">Find 5 rare fossils in the excavation site</p>
                    <div className="w-full bg-prehistoric-600 rounded-full h-2">
                      <div className="bg-cosmic-500 h-2 rounded-full w-2/5"></div>
                    </div>
                    <div className="text-right text-xs text-prehistoric-300 mt-1">2 / 5 fossils</div>
                  </div>
                  
                  <div className="bg-prehistoric-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white">Extinction Survivor</span>
                      <span className="text-sm bg-yellow-600 text-white px-2 py-1 rounded">+2x Boost</span>
                    </div>
                    <p className="text-prehistoric-200 text-sm mb-2">Survive 3 extinction events</p>
                    <div className="w-full bg-prehistoric-600 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="text-right text-xs text-prehistoric-300 mt-1">1 / 3 events</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;