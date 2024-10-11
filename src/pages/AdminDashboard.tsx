import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const [tenants, setTenants] = useState([]);
  const [usage, setUsage] = useState({});
  const [analytics, setAnalytics] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    fetchTenants();
    fetchUsage();
    fetchAnalytics();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('/api/admin/tenants', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const fetchUsage = async () => {
    try {
      const response = await axios.get('/api/admin/usage', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsage(response.data);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const generateApiKey = async (tenantId) => {
    try {
      const response = await axios.post(`/api/admin/tenants/${tenantId}/api-key`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the tenant in the state with the new API key
      setTenants(tenants.map(tenant => 
        tenant.id === tenantId ? { ...tenant, apiKey: response.data.apiKey } : tenant
      ));
    } catch (error) {
      console.error('Error generating API key:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Almanac Labs Admin Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Tenants</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">API Key</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="py-2 px-4 border-b">{tenant.name}</td>
                <td className="py-2 px-4 border-b">{tenant.email}</td>
                <td className="py-2 px-4 border-b">{tenant.apiKey || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => generateApiKey(tenant.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Generate API Key
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">System Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Total API Calls</h3>
            <p>{usage.totalApiCalls}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Active Users</h3>
            <p>{usage.activeUsers}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Storage Used</h3>
            <p>{usage.storageUsed} GB</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">System Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">New Tenants (Last 30 days)</h3>
            <p>{analytics.newTenants}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Total Revenue</h3>
            <p>${analytics.totalRevenue}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;