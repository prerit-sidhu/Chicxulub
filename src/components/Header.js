import React from 'react';
import { Link } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { userAddress, miningStats } = useApp();

  return (
    <header className="bg-prehistoric-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-lava-500 flex items-center justify-center">
            <span className="text-xl">🪨</span>
          </div>
          <span className="text-2xl font-jurassic tracking-wider">CHICXULUB</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {userAddress && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-lava-300 transition-colors">
                Dashboard
              </Link>
              <Link to="/missions" className="hover:text-lava-300 transition-colors">
                Missions
              </Link>
              <Link to="/volcano" className="hover:text-lava-300 transition-colors">
                Volcano
              </Link>
              <div className="bg-prehistoric-700 px-3 py-1 rounded-full flex items-center">
                <span className="mr-2">🪨</span>
                <span>{miningStats?.chixTokens?.toFixed(2) || '0.00'} CHIX</span>
              </div>
            </div>
          )}
          
          {/* Make sure this renders properly */}
          <div className="ton-connect">
            <TonConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;