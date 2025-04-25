import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-prehistoric-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Animated meteor background */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lava-500 rounded-full shadow-lg shadow-lava-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ['-100vh', '100vh'],
                x: ['0vw', `${(Math.random() - 0.5) * 50}vw`],
                opacity: [0, 1, 0],
                scale: [0.5, Math.random() * 3 + 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-prehistoric-900 opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-jurassic text-white mb-4">
              CHICXULUB
            </h1>
            <p className="text-xl md:text-2xl text-prehistoric-100 mb-8">
              From extinction... to evolution.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/dashboard" 
                className="bg-lava-600 hover:bg-lava-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
              >
                Start Mining
              </Link>
              <a 
                href="#about" 
                className="bg-prehistoric-700 hover:bg-prehistoric-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-prehistoric-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-jurassic text-white mb-6">The Chicxulub Story</h2>
            <p className="text-lg text-prehistoric-100">
              65 million years ago, an asteroid struck Earth at Chicxulub, Mexico, causing mass extinction.
              From this catastrophe, new life evolved. Our CHIX token represents this cycle of destruction and rebirth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-prehistoric-700 p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-lava-600 rounded-full flex items-center justify-center text-2xl mb-4">
                🪨
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mine CHIX</h3>
              <p className="text-prehistoric-100">
                Engage in simulated mining activities to earn CHIX tokens. Complete time-based challenges and boost your earnings.
              </p>
            </div>
            
            <div className="bg-prehistoric-700 p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-cosmic-600 rounded-full flex items-center justify-center text-2xl mb-4">
                🦖
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Survive Extinction</h3>
              <p className="text-prehistoric-100">
                Participate in survival-themed missions and events. Collect fossils and artifacts to increase your mining power.
              </p>
            </div>
            
            <div className="bg-prehistoric-700 p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-prehistoric-500 rounded-full flex items-center justify-center text-2xl mb-4">
                🌋
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Volcano of Fate</h3>
              <p className="text-prehistoric-100">
                Spin the wheel daily for random rewards and boosts. Risk your tokens in the volcano for a chance at greater returns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-prehistoric-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-jurassic text-white mb-12 text-center">How It Works</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-16">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-white mb-4">1. Connect & Pay</h3>
                <p className="text-prehistoric-100 mb-4">
                  Connect your TON wallet and pay a one-time fee of 0.5 TON to unlock the mining simulator.
                </p>
                <p className="text-prehistoric-200">
                  Your payment is securely processed via smart contract on the TON blockchain.
                </p>
              </div>
              <div className="md:w-1/2 bg-prehistoric-800 p-4 rounded-xl">
                <div className="bg-prehistoric-700 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-6xl">💰</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse items-center mb-16">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
                <h3 className="text-2xl font-bold text-white mb-4">2. Mine CHIX</h3>
                <p className="text-prehistoric-100 mb-4">
                  Start the mining simulator to earn CHIX tokens. Mining is time-based - the longer you mine, the more you earn.
                </p>
                <p className="text-prehistoric-200">
                  Boost your mining power through daily streaks, missions, and power-ups.
                </p>
              </div>
              <div className="md:w-1/2 bg-prehistoric-800 p-4 rounded-xl">
                <div className="bg-prehistoric-700 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-6xl">⛏️</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-white mb-4">3. Collect & Evolve</h3>
                <p className="text-prehistoric-100 mb-4">
                  Complete missions to earn fossils and artifacts. Use these to evolve your mining capabilities.
                </p>
                <p className="text-prehistoric-200">
                  Participate in special events for rare collectibles and massive CHIX rewards.
                </p>
              </div>
              <div className="md:w-1/2 bg-prehistoric-800 p-4 rounded-xl">
                <div className="bg-prehistoric-700 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-6xl">🧬</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-lava-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-lava-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-4xl font-jurassic text-white mb-6">Ready to Start Mining?</h2>
          <p className="text-xl text-prehistoric-100 mb-8 max-w-2xl mx-auto">
            Join thousands of miners already excavating CHIX tokens from the prehistoric digital landscape.
          </p>
          <Link 
            to="/dashboard" 
            className="bg-white hover:bg-gray-100 text-lava-900 font-bold py-4 px-10 rounded-lg shadow-lg transition-colors text-xl"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;