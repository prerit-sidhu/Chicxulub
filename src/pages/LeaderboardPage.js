import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const LeaderboardPage = () => {
  const { userAddress, hasPaid, isLoading } = useApp();
  const navigate = useNavigate();
  
  const [leaderboardData, setLeaderboardData] = useState([
    { rank: 1, name: 'CryptoRex', address: '0x1234...5678', chix: 15420, fossils: 32, level: 28 },
    { rank: 2, name: 'DinoHunter', address: '0x2345...6789', chix: 12350, fossils: 28, level: 25 },
    { rank: 3, name: 'MeteorMaster', address: '0x3456...7890', chix: 10870, fossils: 25, level: 23 },
    { rank: 4, name: 'FossilFinder', address: '0x4567...8901', chix: 9540, fossils: 22, level: 21 },
    { rank: 5, name: 'JurassicMiner', address: '0x5678...9012', chix: 8320, fossils: 20, level: 19 },
    { rank: 6, name: 'TriceratopsTop', address: '0x6789...0123', chix: 7150, fossils: 18, level: 17 },
    { rank: 7, name: 'RaptorRich', address: '0x7890...1234', chix: 6280, fossils: 16, level: 16 },
    { rank: 8, name: 'TRexTycoon', address: '0x8901...2345', chix: 5430, fossils: 14, level: 15 },
    { rank: 9, name: 'PterodactylPro', address: '0x9012...3456', chix: 4750, fossils: 12, level: 14 },
    { rank: 10, name: 'BrontoBlockchain', address: '0x0123...4567', chix: 4120, fossils: 10, level: 13 },
  ]);
  
  const [filter, setFilter] = useState('chix');
  
  // Redirect to home if not connected or not paid
  useEffect(() => {
    if (!userAddress && !isLoading) {
      navigate('/');
    } else if (!hasPaid && !isLoading) {
      navigate('/dashboard');
    }
  }, [userAddress, hasPaid, isLoading, navigate]);
  
  // Sort leaderboard based on filter
  useEffect(() => {
    const sortedData = [...leaderboardData].sort((a, b) => b[filter] - a[filter]);
    
    // Update ranks
    const updatedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
    
    setLeaderboardData(updatedData);
  }, [filter]);
  
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
        <h1 className="text-4xl font-jurassic text-white mb-8 text-center">Leaderboard</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center space-x-4">
            <button 
              className={`px-4 py-2 rounded-full ${filter === 'chix' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
              onClick={() => setFilter('chix')}
            >
              CHIX Tokens
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${filter === 'fossils' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
              onClick={() => setFilter('fossils')}
            >
              Fossils
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${filter === 'level' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
              onClick={() => setFilter('level')}
            >
              Level
            </button>
          </div>
          
          <div className="bg-prehistoric-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 bg-prehistoric-700 flex items-center">
              <div className="w-16 text-center text-prehistoric-100 font-bold">Rank</div>
              <div className="flex-1 text-prehistoric-100 font-bold">Miner</div>
              <div className="w-24 text-right text-prehistoric-100 font-bold">CHIX</div>
              <div className="w-24 text-right text-prehistoric-100 font-bold">Fossils</div>
              <div className="w-24 text-right text-prehistoric-100 font-bold">Level</div>
            </div>
            
            {leaderboardData.map((item, index) => (
              <motion.div
                key={item.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 flex items-center ${index % 2 === 0 ? 'bg-prehistoric-800' : 'bg-prehistoric-750'} hover:bg-prehistoric-700 transition-colors`}
              >
                <div className="w-16 text-center">
                  {item.rank <= 3 ? (
                    <span className={`inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      item.rank === 1 ? 'bg-yellow-500' :
                      item.rank === 2 ? 'bg-gray-300' :
                      'bg-amber-700'
                    } text-prehistoric-900`}>
                      {item.rank}
                    </span>
                  ) : (
                    <span className="text-prehistoric-200">{item.rank}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-xs text-prehistoric-300">{item.address}</div>
                </div>
                <div className="w-24 text-right font-medium text-lava-300">{item.chix.toLocaleString()}</div>
                <div className="w-24 text-right font-medium text-cosmic-300">{item.fossils}</div>
                <div className="w-24 text-right font-medium text-yellow-300">Lvl {item.level}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-prehistoric-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-jurassic text-white mb-4">Weekly Competition</h2>
            
            <div className="mb-4 p-4 bg-prehistoric-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">Time Remaining:</span>
                <span className="text-lava-300 font-bold">2 days, 14 hours</span>
              </div>
              <div className="w-full bg-prehistoric-600 rounded-full h-2">
                <div className="bg-lava-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-prehistoric-700 p-4 rounded-lg text-center">
                <div className="text-yellow-500 text-xl mb-2">🥇</div>
                <div className="text-white font-bold mb-1">1st Place</div>
                <div className="text-lava-300">500 CHIX</div>
              </div>
              
              <div className="bg-prehistoric-700 p-4 rounded-lg text-center">
                <div className="text-gray-300 text-xl mb-2">🥈</div>
                <div className="text-white font-bold mb-1">2nd Place</div>
                <div className="text-lava-300">250 CHIX</div>
              </div>
              
              <div className="bg-prehistoric-700 p-4 rounded-lg text-center">
                <div className="text-amber-700 text-xl mb-2">🥉</div>
                <div className="text-white font-bold mb-1">3rd Place</div>
                <div className="text-lava-300">100 CHIX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;