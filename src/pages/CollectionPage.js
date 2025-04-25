import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const CollectionPage = () => {
  const { userAddress, hasPaid, isLoading } = useApp();
  const navigate = useNavigate();
  
  const [fossils, setFossils] = useState([
    { id: 1, name: 'Trilobite', rarity: 'common', owned: 3, image: '🦐', description: 'Ancient marine arthropod from the Paleozoic Era.' },
    { id: 2, name: 'Ammonite', rarity: 'common', owned: 2, image: '🐚', description: 'Extinct marine mollusc with a spiral shell.' },
    { id: 3, name: 'Fern Imprint', rarity: 'common', owned: 4, image: '🌿', description: 'Prehistoric plant fossil from the Carboniferous period.' },
    { id: 4, name: 'Raptor Claw', rarity: 'rare', owned: 1, image: '🦖', description: 'Sharp claw from a velociraptor, a small dromaeosaurid dinosaur.' },
    { id: 5, name: 'T-Rex Tooth', rarity: 'epic', owned: 0, image: '🦷', description: 'Massive tooth from the king of dinosaurs, Tyrannosaurus Rex.' },
    { id: 6, name: 'Mammoth Tusk', rarity: 'rare', owned: 0, image: '🦣', description: 'Curved tusk from a woolly mammoth of the Ice Age.' },
    { id: 7, name: 'Amber with Insect', rarity: 'epic', owned: 0, image: '🪲', description: 'Fossilized tree resin containing preserved prehistoric insects.' },
    { id: 8, name: 'Pterosaur Wing', rarity: 'legendary', owned: 0, image: '🦅', description: 'Wing fragment from a flying reptile of the Mesozoic Era.' },
    { id: 9, name: 'Megalodon Tooth', rarity: 'legendary', owned: 0, image: '🦈', description: 'Massive tooth from the largest shark that ever lived.' },
  ]);
  
  const [artifacts, setArtifacts] = useState([
    { 
      id: 1, 
      name: 'Trilobite Collection', 
      rarity: 'rare', 
      completed: false, 
      progress: 3, 
      total: 5,
      components: [1, 1, 1, 1, 1],
      reward: '+0.5 Mining Power',
      image: '🦐'
    },
    { 
      id: 2, 
      name: 'Raptor Skeleton', 
      rarity: 'epic', 
      completed: false, 
      progress: 1, 
      total: 6,
      components: [4, 4, 4, 3, 3, 3],
      reward: '+1.0 Mining Power',
      image: '🦖'
    },
    { 
      id: 3, 
      name: 'Prehistoric Marine Set', 
      rarity: 'legendary', 
      completed: false, 
      progress: 2, 
      total: 8,
      components: [2, 2, 2, 9, 9, 5, 5, 5],
      reward: '+2.0 Mining Power',
      image: '🌊'
    },
  ]);
  
  const [filter, setFilter] = useState('all');
  const [selectedFossil, setSelectedFossil] = useState(null);
  
  // Redirect to home if not connected or not paid
  useEffect(() => {
    if (!userAddress && !isLoading) {
      navigate('/');
    } else if (!hasPaid && !isLoading) {
      navigate('/dashboard');
    }
  }, [userAddress, hasPaid, isLoading, navigate]);
  
  const filteredFossils = filter === 'all' 
    ? fossils 
    : fossils.filter(fossil => fossil.rarity === filter);
  
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getRarityTextColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'text-gray-300';
      case 'rare': return 'text-blue-300';
      case 'epic': return 'text-purple-300';
      case 'legendary': return 'text-yellow-300';
      default: return 'text-gray-300';
    }
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
        <h1 className="text-4xl font-jurassic text-white mb-8 text-center">Fossil Collection</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Fossil Collection */}
            <div className="md:col-span-2">
              <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-jurassic text-white">Your Fossils</h2>
                  
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
                      onClick={() => setFilter('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${filter === 'common' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
                      onClick={() => setFilter('common')}
                    >
                      Common
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${filter === 'rare' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
                      onClick={() => setFilter('rare')}
                    >
                      Rare
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${filter === 'epic' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
                      onClick={() => setFilter('epic')}
                    >
                      Epic
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full text-sm ${filter === 'legendary' ? 'bg-lava-600 text-white' : 'bg-prehistoric-700 text-prehistoric-100'}`}
                      onClick={() => setFilter('legendary')}
                    >
                      Legendary
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredFossils.map(fossil => (
                    <motion.div
                      key={fossil.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-prehistoric-700 rounded-lg p-4 cursor-pointer transition-transform hover:scale-105 ${
                        fossil.owned > 0 ? '' : 'opacity-50'
                      }`}
                      onClick={() => fossil.owned > 0 && setSelectedFossil(fossil)}
                    >
                      <div className="text-center mb-2">
                        <div className="text-4xl mb-2">{fossil.image}</div>
                        <div className="font-bold text-white truncate">{fossil.name}</div>
                        <div className={`text-xs font-medium ${getRarityTextColor(fossil.rarity)}`}>
                          {fossil.rarity.charAt(0).toUpperCase() + fossil.rarity.slice(1)}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-prehistoric-200 text-xs">Owned:</span>
                        <span className={`text-sm font-bold ${fossil.owned > 0 ? 'text-white' : 'text-prehistoric-400'}`}>
                          {fossil.owned}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Artifacts Section */}
              <div className="mt-8 bg-prehistoric-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-jurassic text-white mb-6">Artifacts</h2>
                
                <div className="space-y-4">
                  {artifacts.map(artifact => (
                    <div 
                      key={artifact.id}
                      className="bg-prehistoric-700 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-3">
                        <div className={`w-12 h-12 ${getRarityColor(artifact.rarity)} rounded-lg flex items-center justify-center text-2xl mr-4`}>
                          {artifact.image}
                        </div>
                        <div>
                          <div className="font-bold text-white">{artifact.name}</div>
                          <div className={`text-xs ${getRarityTextColor(artifact.rarity)}`}>
                            {artifact.rarity.charAt(0).toUpperCase() + artifact.rarity.slice(1)} Artifact
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="text-white font-bold">{artifact.reward}</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-prehistoric-300 mb-1">
                          <span>Completion</span>
                          <span>{artifact.progress} / {artifact.total}</span>
                        </div>
                        <div className="w-full bg-prehistoric-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getRarityColor(artifact.rarity)}`}
                            style={{ width: `${(artifact.progress / artifact.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {artifact.components.map((fossilId, index) => {
                          const fossilData = fossils.find(f => f.id === fossilId);
                          return (
                            <div 
                              key={`${artifact.id}-${index}`}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                index < artifact.progress 
                                  ? getRarityColor(artifact.rarity) 
                                  : 'bg-prehistoric-600'
                              }`}
                              title={fossilData ? fossilData.name : 'Unknown Fossil'}
                            >
                              {fossilData ? fossilData.image : '?'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Fossil Details or Info */}
            <div>
              {selectedFossil ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-prehistoric-800 rounded-xl p-6 shadow-lg sticky top-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-jurassic text-white">{selectedFossil.name}</h2>
                    <button 
                      className="text-prehistoric-400 hover:text-white"
                      onClick={() => setSelectedFossil(null)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className={`text-8xl mb-4 ${
                      selectedFossil.rarity === 'legendary' ? 'animate-glow' : ''
                    }`}>
                      {selectedFossil.image}
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRarityTextColor(selectedFossil.rarity)} ${getRarityColor(selectedFossil.rarity)}`}>
                      {selectedFossil.rarity.charAt(0).toUpperCase() + selectedFossil.rarity.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-prehistoric-100 mb-2">Description:</div>
                    <p className="text-white">{selectedFossil.description}</p>
                  </div>
                  
                  <div className="bg-prehistoric-700 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-prehistoric-100">Owned:</span>
                      <span className="text-white font-bold">{selectedFossil.owned}</span>
                    </div>
                  </div>
                  
                  <div className="bg-prehistoric-700 rounded-lg p-4">
                    <div className="text-prehistoric-100 mb-2">Used in Artifacts:</div>
                    <div className="space-y-2">
                      {artifacts
                        .filter(artifact => artifact.components.includes(selectedFossil.id))
                        .map(artifact => (
                          <div 
                            key={artifact.id}
                            className="flex justify-between items-center"
                          >
                            <span className="text-white">{artifact.name}</span>
                            <span className={getRarityTextColor(artifact.rarity)}>
                              {artifact.rarity.charAt(0).toUpperCase() + artifact.rarity.slice(1)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-prehistoric-800 rounded-xl p-6 shadow-lg sticky top-4">
                  <h2 className="text-2xl font-jurassic text-white mb-4">Fossil Guide</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-prehistoric-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">How to Find Fossils</h3>
                      <p className="text-prehistoric-200 text-sm">
                        Complete mining sessions, missions, and spin the Volcano of Fate to discover fossils.
                        Longer mining sessions have a higher chance of yielding rare fossils!
                      </p>
                    </div>
                    
                    <div className="bg-prehistoric-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">Rarity Levels</h3>
                      <div className="space-y-2">
                      <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                          <span className="text-gray-300">Common - Basic fossils, easy to find</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-blue-300">Rare - Uncommon fossils, harder to find</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-purple-300">Epic - Very rare fossils, difficult to find</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-yellow-300">Legendary - Extremely rare fossils, very difficult to find</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-prehistoric-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">Artifacts</h3>
                      <p className="text-prehistoric-200 text-sm">
                        Combine multiple fossils to create artifacts. Each completed artifact
                        provides permanent boosts to your mining power, helping you earn
                        more CHIX tokens!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;