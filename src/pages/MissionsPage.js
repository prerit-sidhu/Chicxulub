import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const MissionsPage = () => {
  const { userAddress, hasPaid, isLoading, completeMission } = useApp();
  const navigate = useNavigate();
  
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: 'Daily Mining Challenge',
      description: 'Mine for at least 10 minutes today',
      reward: 50,
      rewardType: 'CHIX',
      progress: 33,
      total: 100,
      completed: false,
      category: 'daily'
    },
    {
      id: 2,
      title: 'Fossil Hunter',
      description: 'Find 5 rare fossils in the excavation site',
      reward: 2,
      rewardType: 'Fossils',
      progress: 2,
      total: 5,
      completed: false,
      category: 'collection'
    },
    {
      id: 3,
      title: 'Extinction Survivor',
      description: 'Survive 3 extinction events',
      reward: 2,
      rewardType: 'Boost',
      progress: 1,
      total: 3,
      completed: false,
      category: 'event'
    },
    {
      id: 4,
      title: 'Referral Program',
      description: 'Invite 5 friends to join Chixulub',
      reward: 100,
      rewardType: 'CHIX',
      progress: 0,
      total: 5,
      completed: false,
      category: 'social'
    },
    {
      id: 5,
      title: 'Dino Expert',
      description: 'Answer 10 prehistoric trivia questions correctly',
      reward: 75,
      rewardType: 'CHIX',
      progress: 3,
      total: 10,
      completed: false,
      category: 'knowledge'
    },
    {
      id: 6,
      title: 'Volcanic Activity',
      description: 'Spin the Volcano of Fate 3 days in a row',
      reward: 1,
      rewardType: 'Rare Fossil',
      progress: 2,
      total: 3,
      completed: false,
      category: 'daily'
    },
  ]);
  
  const [filter, setFilter] = useState('all');
  
  // Redirect to home if not connected or not paid
  useEffect(() => {
    if (!userAddress && !isLoading) {
      navigate('/');
    } else if (!hasPaid && !isLoading) {
      navigate('/dashboard');
    }
  }, [userAddress, hasPaid, isLoading, navigate]);
  
  const handleCompleteMission = (id) => {
    // In a real app, this would call the completeMission function from context
    // For now, we'll just update the local state
    setMissions(prev => 
      prev.map(mission => 
        mission.id === id 
          ? { ...mission, progress: mission.total, completed: true } 
          : mission
      )
    );
  };
  
  const filteredMissions = filter === 'all' 
    ? missions 
    : missions.filter(mission => mission.category === filter);
  
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
        <h1 className="text-4xl font-jurassic text-white mb-8 text-center">Mission Board</h1>
        
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('all')}
          >
            All Missions
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'daily' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('daily')}
          >
            Daily
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'collection' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('collection')}
          >
            Collection
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'event' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('event')}
          >
            Events
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'social' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('social')}
          >
            Social
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${filter === 'knowledge' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
            onClick={() => setFilter('knowledge')}
          >
            Knowledge
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-prehistoric-800 rounded-xl overflow-hidden shadow-lg ${mission.completed ? 'opacity-70' : ''}`}
            >
              <div className="h-3 bg-lava-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${
                    mission.rewardType === 'CHIX' ? 'bg-lava-600 text-white' :
                    mission.rewardType === 'Fossils' ? 'bg-cosmic-600 text-white' :
                    mission.rewardType === 'Boost' ? 'bg-yellow-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    +{mission.reward} {mission.rewardType}
                  </span>
                </div>
                
                <p className="text-prehistoric-200 text-sm mb-4">{mission.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-prehistoric-300 mb-1">
                    <span>Progress</span>
                    <span>{mission.progress} / {mission.total}</span>
                  </div>
                  <div className="w-full bg-prehistoric-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        mission.rewardType === 'CHIX' ? 'bg-lava-500' :
                        mission.rewardType === 'Fossils' ? 'bg-cosmic-500' :
                        mission.rewardType === 'Boost' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-prehistoric-300">
                    {mission.category.charAt(0).toUpperCase() + mission.category.slice(1)} Mission
                  </span>
                  
                  {mission.completed ? (
                    <span className="text-green-400 text-sm font-medium">Completed ✓</span>
                  ) : (
                    <button
                      className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white text-sm px-3 py-1 rounded transition-colors"
                      onClick={() => handleCompleteMission(mission.id)}
                    >
                      {mission.progress === 0 ? 'Start' : 'Continue'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionsPage;