import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const Leaderboard = () => {
  const { userAddress } = useApp();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch leaderboard data periodically
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://chicxulub.app/api/leaderboard');
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchLeaderboard();
    
    // Set up polling every 30 seconds
    const intervalId = setInterval(fetchLeaderboard, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Rest of your component code
  // ...
};

export default Leaderboard;