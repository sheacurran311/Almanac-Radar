import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';

const NewCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams<{ tenantId: string }>();

  const handleSuccess = () => {
    navigate(`/dashboard/${tenantId}/campaigns`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Create New Campaign</h1>
      <CampaignForm onSuccess={handleSuccess} />
    </div>
  );
};

export default NewCampaign;