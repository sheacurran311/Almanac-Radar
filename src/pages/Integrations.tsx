import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCardIcon, MapIcon, CubeIcon } from '@heroicons/react/24/outline';

interface Integration {
  id: string;
  name: string;
  apiKey: string;
  isActive: boolean;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/integrations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIntegrations(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching integrations:', err);
      setError('Failed to fetch integrations. Please try again later.');
      setLoading(false);
    }
  };

  const handleUpdateIntegration = async (id: string, apiKey: string, isActive: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/integrations/${id}`, 
        { apiKey, isActive },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchIntegrations();
    } catch (err) {
      console.error('Error updating integration:', err);
      setError('Failed to update integration. Please try again.');
    }
  };

  const getIntegrationIcon = (name: string) => {
    switch (name) {
      case 'Stripe':
        return <CreditCardIcon className="h-6 w-6 text-gray-500" />;
      case 'Google':
        return <MapIcon className="h-6 w-6 text-gray-500" />;
      case 'Amazon S3':
        return <CubeIcon className="h-6 w-6 text-gray-500" />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading integrations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Integrations</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {integrations.map((integration) => (
            <li key={integration.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getIntegrationIcon(integration.name)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                    <p className="text-sm text-gray-500">API Key: {integration.apiKey ? '••••••••' : 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={integration.apiKey}
                    onChange={(e) => handleUpdateIntegration(integration.id, e.target.value, integration.isActive)}
                    placeholder="Enter API Key"
                    className="mr-4 max-w-xs shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => handleUpdateIntegration(integration.id, integration.apiKey, !integration.isActive)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      integration.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {integration.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Integrations;