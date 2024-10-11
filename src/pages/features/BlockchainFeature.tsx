import React from 'react';
import { Link } from 'react-router-dom';

const BlockchainFeature: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blockchain Integration</h1>
      <p className="text-xl mb-6">
        Harness the power of decentralized technology to bring transparency, security, and ownership to your loyalty programs.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Blockchain Advantages:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Immutable transaction records</li>
        <li>Smart contract-powered rewards</li>
        <li>NFT integration for unique digital assets</li>
        <li>Cross-platform interoperability</li>
      </ul>
      <Link to="/register" className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-300">
        Explore Blockchain Solutions
      </Link>
    </div>
  );
};

export default BlockchainFeature;