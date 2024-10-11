import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const CampaignDetails: React.FC = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tenantId, campaignId } = useParams<{ tenantId: string; campaignId: string }>();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', campaignId)
          .eq('tenant_id', tenantId)
          .single();

        if (error) throw error;
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [tenantId, campaignId]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
      <p className="text-gray-600 mb-4">{campaign.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Start Date:</strong> {new Date(campaign.start_date).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(campaign.end_date).toLocaleDateString()}</p>
        </div>
        <div>
          <p><strong>Points Reward:</strong> {campaign.points_reward}</p>
          <p><strong>Status:</strong> {campaign.active ? 'Active' : 'Inactive'}</p>
        </div>
      </div>
      {/* Add more campaign details and functionality here */}
    </div>
  );
};

export default CampaignDetails;