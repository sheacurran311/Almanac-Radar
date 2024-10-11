import React, { useState } from 'react';
import axios from 'axios';

interface UserFormProps {
  onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loyaltyCardNumber, setLoyaltyCardNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        phone,
        loyaltyCardNumber
      });
      onSuccess();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        value={loyaltyCardNumber}
        onChange={(e) => setLoyaltyCardNumber(e.target.value)}
        placeholder="Loyalty Card Number"
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Register User
      </button>
    </form>
  );
};

export default UserForm;