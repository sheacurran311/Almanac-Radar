import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

interface CampaignFormProps {
  onSuccess: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [active, setActive] = useState(true);
  const [pointsReward, setPointsReward] = useState('');
  const [limitPerUser, setLimitPerUser] = useState('');
  const [limitTotal, setLimitTotal] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [error, setError] = useState('');
  const { tenantId } = useParams<{ tenantId: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          name,
          campaign_type: campaignType,
          active,
          points_reward: parseInt(pointsReward),
          limit_per_user: limitPerUser ? parseInt(limitPerUser) : null,
          limit_total: limitTotal ? parseInt(limitTotal) : null,
          start_at: startAt,
          end_at: endAt,
          tenant_id: userData.user?.id // Use the user's ID as the tenant_id
        })
        .single();

      if (error) throw error;

      console.log('Campaign created:', data);
      onSuccess();
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      setError(error.message || 'An error occurred while creating the campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Campaign Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        value={campaignType}
        onChange={(e) => setCampaignType(e.target.value)}
        placeholder="Campaign Type"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="mr-2"
          />
          Active
        </label>
      </div>
      <input
        type="number"
        value={pointsReward}
        onChange={(e) => setPointsReward(e.target.value)}
        placeholder="Points Reward"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        value={limitPerUser}
        onChange={(e) => setLimitPerUser(e.target.value)}
        placeholder="Limit Per User (optional)"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        value={limitTotal}
        onChange={(e) => setLimitTotal(e.target.value)}
        placeholder="Total Limit (optional)"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="datetime-local"
        value={startAt}
        onChange={(e) => setStartAt(e.target.value)}
        placeholder="Start Date"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="datetime-local"
        value={endAt}
        onChange={(e) => setEndAt(e.target.value)}
        placeholder="End Date"
        required
        className="w-full px-3 py-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;