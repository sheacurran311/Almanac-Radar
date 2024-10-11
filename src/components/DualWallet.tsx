import React, { useState, useEffect } from 'react';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';
import axios from 'axios';

interface DualWalletProps {
  userId: string;
}

const DualWallet: React.FC<DualWalletProps> = ({ userId }) => {
  const [web2Balance, setWeb2Balance] = useState(0);

  useEffect(() => {
    fetchWeb2Balance();
  }, [userId]);

  const fetchWeb2Balance = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/points`);
      setWeb2Balance(response.data.points);
    } catch (error) {
      console.error('Error fetching Web2 balance:', error);
    }
  };

  return (
    <div className="dual-wallet">
      <div className="web2-wallet">
        <h3>Web2 Wallet (Rewards Points)</h3>
        <p>Balance: {web2Balance} points</p>
      </div>
      <div className="web3-wallet">
        <h3>Web3 Wallet</h3>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID!,
          }}
        >
          <DynamicWidget />
        </DynamicContextProvider>
      </div>
    </div>
  );
};

export default DualWallet;