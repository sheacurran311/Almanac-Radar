import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ... (rest of the imports and interface definitions)

const CampaignModal: React.FC<CampaignModalProps> = ({ isOpen, onClose, onSave, campaign }) => {
  // ... (rest of the component code)

  const fetchIntegrations = async () => {
    try {
      const response = await axios.get('/api/integrations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIntegrations(response.data);
    } catch (err) {
      console.error('Error fetching integrations:', err);
    }
  };

  // ... (rest of the component code)
};

export default CampaignModal;