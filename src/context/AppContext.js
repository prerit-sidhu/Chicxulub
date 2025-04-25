import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [userAddress, setUserAddress] = useState(null);
  // Set hasPaid to true for testing purposes
  const [hasPaid, setHasPaid] = useState(true); // Changed to true for testing
  const [miningStats, setMiningStats] = useState({
    chixTokens: 0,
    miningPower: 1,
    miningBoost: 1,
    dailyStreak: 0,
    fossilsCollected: 0,
    lastMined: null,
  });
  const [missions, setMissions] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is connected
  useEffect(() => {
    const handleConnection = async () => {
      try {
        if (tonConnectUI.connected && tonConnectUI.account) {
          setUserAddress(tonConnectUI.account.address);
          // For testing, always set hasPaid to true
          setHasPaid(true);
        } else {
          setUserAddress(null);
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
        // Handle connection error gracefully
        setUserAddress(null);
      }
    };
    
    handleConnection();
  }, [tonConnectUI.connected, tonConnectUI.account]);

  // Mock function to check payment status
  const checkPaymentStatus = async (address) => {
    // In a real app, this would call your smart contract
    // For now, we'll just simulate it
    setIsLoading(true);
    setTimeout(() => {
      // Simulate a 30% chance the user has already paid
      const hasAlreadyPaid = Math.random() < 0.3;
      setHasPaid(hasAlreadyPaid);
      setIsLoading(false);
    }, 1000);
  };

  // Function to handle payment
  // Update the handlePayment function to use your wallet address
  const handlePayment = async () => {
    if (!tonConnectUI.connected) {
      try {
        await tonConnectUI.openModal();
      } catch (error) {
        console.error("Error opening wallet modal:", error);
        alert("Could not open wallet connection. Please try again.");
      }
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Your wallet address
      const ownerAddress = 'UQAv52jBPWRnQqHBQkhBIOPMu36QpGBgdOiejR2dNVbzjMci';
      
      // Create transaction
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes from now
        messages: [
          {
            address: ownerAddress,
            amount: '500000000', // 0.5 TON in nanoTON
          }
        ]
      };
      
      const result = await tonConnectUI.sendTransaction(transaction);
      console.log('Transaction sent:', result);
      
      // Update state after successful payment
      setHasPaid(true);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to simulate mining
  const mine = async (duration = 60) => { // duration in seconds
    // Remove the hasPaid check for testing
    // if (!hasPaid) return;
    
    setIsLoading(true);
    try {
      // Simulate mining process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate rewards
      const baseReward = duration * 0.1; // 0.1 CHIX per second
      const boostedReward = baseReward * (miningStats.miningPower || 1) * (miningStats.miningBoost || 1);
      
      // Update mining stats
      setMiningStats(prev => ({
        ...prev,
        chixTokens: (prev.chixTokens || 0) + boostedReward,
        lastMined: new Date().toISOString(),
      }));
      
      console.log('Mining completed successfully:', {
        duration,
        baseReward,
        boostedReward,
        newTotal: (miningStats.chixTokens || 0) + boostedReward
      });
    } catch (error) {
      console.error("Mining failed:", error);
      // Prevent the page from refreshing by handling the error
      alert("Mining operation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to complete a mission
  const completeMission = async (missionId) => {
    setIsLoading(true);
    try {
      // Find the mission
      const mission = missions.find(m => m.id === missionId);
      if (!mission || mission.completed) return;
      
      // Update mission status
      setMissions(prev => 
        prev.map(m => m.id === missionId ? {...m, completed: true} : m)
      );
      
      // Add rewards
      setMiningStats(prev => ({
        ...prev,
        chixTokens: prev.chixTokens + mission.reward,
      }));
    } catch (error) {
      console.error("Mission completion failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userAddress,
        hasPaid, // This will now be true for testing
        miningStats,
        missions,
        collectibles,
        isLoading,
        handlePayment,
        mine, // Pass the actual mine function, not just a placeholder
        tonConnectUI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);