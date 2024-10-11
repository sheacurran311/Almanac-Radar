import React, { useState } from 'react';
import axios from 'axios';

interface RewardFormProps {
  onSuccess: () => void;
}

const RewardForm: React.FC<RewardFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [rewardType, setRewardType] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/rewards', {
        name,
        description,
        value: parseFloat(value),
        rewardType,
        active
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating reward:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Reward Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        value={rewardType}
        onChange={(e) => setRewardType(e.target.value)}
        placeholder="Reward Type"
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Create Reward
      </button>
    </form>
  );
};

export default RewardForm;