import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const RewardDetails: React.FC = () => {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tenantId, rewardId } = useParams<{ tenantId: string; rewardId: string }>();

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const { data, error } = await supabase
          .from('rewards')
          .select('*')
          .eq('id', rewardId)
          .eq('tenant_id', tenantId)
          .single();

        if (error) throw error;
        setReward(data);
      } catch (error) {
        console.error('Error fetching reward:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReward();
  }, [tenantId, rewardId]);

  if (loading) return <div>Loading...</div>;
  if (!reward) return <div>Reward not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{reward.name}</h1>
      <p className="text-gray-600 mb-4">{reward.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Points Cost:</strong> {reward.points_cost}</p>
        </div>
        <div>
          <p><strong>Quantity:</strong> {reward.quantity}</p>
        </div>
      </div>
      {/* Add more reward details and functionality here */}
    </div>
  );
};

export default RewardDetails;