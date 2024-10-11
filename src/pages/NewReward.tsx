import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const NewReward: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pointsCost, setPointsCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  const { tenantId } = useParams<{ tenantId: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('rewards')
        .insert({
          name,
          description,
          points_cost: parseInt(pointsCost),
          quantity: parseInt(quantity),
          tenant_id: tenantId
        })
        .single();

      if (error) throw error;
      navigate(`/dashboard/${tenantId}/rewards/${data.id}`);
    } catch (error) {
      console.error('Error creating reward:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Create New Reward</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="pointsCost" className="block text-gray-700 font-bold mb-2">Points Cost</label>
          <input
            type="number"
            id="pointsCost"
            value={pointsCost}
            onChange={(e) => setPointsCost(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Create Reward
        </button>
      </form>
    </div>
  );
};

export default NewReward;