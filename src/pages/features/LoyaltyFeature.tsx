import React from 'react';
import { Link } from 'react-router-dom';

const LoyaltyFeature: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Loyalty Programs Reimagined</h1>
      <p className="text-xl mb-6">
        Deliver value to your fans through innovative and engaging loyalty experiences, enhanced by blockchain technology.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Key Benefits:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Customizable reward structures</li>
        <li>Seamless integration with existing systems</li>
        <li>Real-time analytics and insights</li>
        <li>Blockchain-backed security and transparency</li>
      </ul>
      <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
        Get Started with Loyalty
      </Link>
    </div>
  );
};

export default LoyaltyFeature;