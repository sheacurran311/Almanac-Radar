import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { CampaignCard } from '../components/CampaignCard';
import { RewardCard } from '../components/RewardCard';
import { UserStats } from '../components/UserStats';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const { tenantId } = useParams<{ tenantId: string }>();
  const { client } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!client) return;

      try {
        setLoading(true);
        
        // Fetch campaigns
        const { data: campaignsData, error: campaignsError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('tenant_id', tenantId)
          .limit(5);

        if (campaignsError) throw campaignsError;
        setCampaigns(campaignsData);

        // Fetch rewards
        const { data: rewardsData, error: rewardsError } = await supabase
          .from('rewards')
          .select('*')
          .eq('tenant_id', tenantId)
          .limit(5);

        if (rewardsError) throw rewardsError;
        setRewards(rewardsData);

        // Fetch user stats
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_user_stats', { p_tenant_id: tenantId });

        if (statsError) throw statsError;
        setUserStats(statsData[0]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [client, tenantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard, {client?.companyName}</h1>
      
      <UserStats stats={userStats} />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
        <Link to={`/dashboard/${tenantId}/campaigns`} className="mt-4 inline-block text-blue-600 hover:text-blue-800">View all campaigns</Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
        <Link to={`/dashboard/${tenantId}/rewards`} className="mt-4 inline-block text-blue-600 hover:text-blue-800">View all rewards</Link>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to={`/dashboard/${tenantId}/campaigns/new`} className="bg-blue-500 text-white p-4 rounded text-center hover:bg-blue-600 transition duration-300">Create New Campaign</Link>
          <Link to={`/dashboard/${tenantId}/rewards/new`} className="bg-green-500 text-white p-4 rounded text-center hover:bg-green-600 transition duration-300">Create New Reward</Link>
          <Link to={`/dashboard/${tenantId}/users/new`} className="bg-purple-500 text-white p-4 rounded text-center hover:bg-purple-600 transition duration-300">Add New User</Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;