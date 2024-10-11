import React from 'react';
import { Link } from 'react-router-dom';

interface Campaign {
  id: string;
  name: string;
  campaign_type: string;
  description: string;
  start_at: string;
  end_at: string;
  cost_in_points: number;
  active: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
      <p className="text-sm">
        <span className="font-semibold">Type:</span> {campaign.campaign_type}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Cost:</span> {campaign.cost_in_points} points
      </p>
      <p className="text-sm">
        <span className="font-semibold">Status:</span> {campaign.active ? 'Active' : 'Inactive'}
      </p>
      <Link to={`/dashboard/${campaign.tenant_id}/campaigns/${campaign.id}`} className="mt-2 inline-block text-blue-600 hover:text-blue-800">
        View Details
      </Link>
    </div>
  );
};