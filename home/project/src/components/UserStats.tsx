import React from 'react';

interface UserStatsProps {
  stats: {
    total_users: number;
    active_users: number;
    new_users_last_30_days: number;
  } | null;
}

export const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{stats.total_users}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold">{stats.active_users}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">New Users (Last 30 Days)</p>
          <p className="text-2xl font-bold">{stats.new_users_last_30_days}</p>
        </div>
      </div>
    </div>
  );
};