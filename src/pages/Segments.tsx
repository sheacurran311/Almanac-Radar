import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: string;
}

const Segments: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tenantId } = useParams<{ tenantId: string }>();
  const { client } = useAuth();

  useEffect(() => {
    fetchSegments();
  }, [tenantId, client]);

  const fetchSegments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .eq('tenant_id', tenantId);

      if (error) throw error;

      setSegments(data || []);
    } catch (err: any) {
      console.error('Error fetching segments:', err);
      setError('Failed to fetch segments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading segments...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customer Segments</h1>
        <Link
          to={`/dashboard/${tenantId}/segments/new`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Segment
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <div key={segment.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{segment.name}</h2>
            <p className="text-gray-600 mb-4">{segment.description}</p>
            <p className="text-sm"><strong>Criteria:</strong> {segment.criteria}</p>
            <Link
              to={`/dashboard/${tenantId}/segments/${segment.id}`}
              className="mt-4 inline-block text-blue-500 hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Segments;