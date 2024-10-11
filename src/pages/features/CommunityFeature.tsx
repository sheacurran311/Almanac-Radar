import React from 'react';
import { Link } from 'react-router-dom';

const CommunityFeature: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Community Engagement</h1>
      <p className="text-xl mb-6">
        Deepen your relationships with fans by incentivizing interactions and creating memorable events and experiences.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Engagement Tools:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Social media integration</li>
        <li>Fan-driven content creation</li>
        <li>Virtual and in-person event management</li>
        <li>Gamification elements</li>
      </ul>
      <Link to="/register" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300">
        Boost Your Community Engagement
      </Link>
    </div>
  );
};

export default CommunityFeature;