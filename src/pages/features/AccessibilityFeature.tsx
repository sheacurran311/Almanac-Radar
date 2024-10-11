import React from 'react';
import { Link } from 'react-router-dom';

const AccessibilityFeature: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Global Accessibility</h1>
      <p className="text-xl mb-6">
        Enable fans around the world to participate and engage, regardless of their location, by leveraging the power of the internet and blockchain.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Accessibility Highlights:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Multi-language support</li>
        <li>Mobile-first design</li>
        <li>Offline capabilities</li>
        <li>Inclusive user experience</li>
      </ul>
      <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
        Make Your Program Globally Accessible
      </Link>
    </div>
  );
};

export default AccessibilityFeature;