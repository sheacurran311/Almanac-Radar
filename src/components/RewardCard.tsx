import React from 'react';
import { Link } from 'react-router-dom';

interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  quantity: number;
}

interface RewardCardProps {
  reward: Reward;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
      <p className="text-sm">
        <span className="font-semibold">Points Cost:</span> {reward.points_cost}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Quantity:</span> {reward.quantity}
      </p>
      <Link to={`/dashboard/${reward.tenant_id}/rewards/${reward.id}`} className="mt-2 inline-block text-blue-600 hover:text-blue-800">
        View Details
      </Link>
    </div>
  );
};