import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface PointsTransaction {
  id: string;
  customer_id: string;
  points: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

const PointsTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tenantId } = useParams<{ tenantId: string }>();
  const { client } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, [tenantId, client]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('points_transactions')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTransactions(data || []);
    } catch (err: any) {
      console.error('Error fetching points transactions:', err);
      setError('Failed to fetch points transactions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading points transactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Points Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer ID</th>
              <th className="py-2 px-4 border-b">Points</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4 border-b">{transaction.customer_id}</td>
                <td className="py-2 px-4 border-b">{transaction.points}</td>
                <td className="py-2 px-4 border-b">{transaction.transaction_type}</td>
                <td className="py-2 px-4 border-b">{transaction.description}</td>
                <td className="py-2 px-4 border-b">{new Date(transaction.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsTransactions;