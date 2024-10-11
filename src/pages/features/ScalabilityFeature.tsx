import React from 'react';
import { Link } from 'react-router-dom';

const ScalabilityFeature: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Fast and Scalable</h1>
      <p className="text-xl mb-6">
        Built on scalable infrastructure to grow alongside your fan base, handling peak moments without sacrificing performance.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Scalability Features:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Cloud-native architecture</li>
        <li>Automatic load balancing</li>
        <li>Efficient data management</li>
        <li>Real-time processing capabilities</li>
      </ul>
      <Link to="/register" className="bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition duration-300">
        Scale Your Loyalty Program
      </Link>
    </div>
  );
};

export default ScalabilityFeature;