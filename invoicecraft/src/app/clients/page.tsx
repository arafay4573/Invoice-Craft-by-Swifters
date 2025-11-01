"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Client } from '../../types/client';

export default function Clients() {
  const { data: session, status } = useSession();
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/clients')
        .then((res) => res.json())
        .then((data) => setClients(data));
    }
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSaveClient = async () => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        // Handle successful save
        console.log('Client saved successfully');
        setClients([...clients, await response.json()]);
        setNewClient({ name: '', email: '', address: '' });
      } else {
        // Handle error
        console.error('Failed to save client');
      }
    } catch (error) {
      console.error('An error occurred while saving the client:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Clients</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newClient.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newClient.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newClient.address}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity mt-4"
          onClick={handleSaveClient}
        >
          Add Client
        </button>
        <table className="w-full mt-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id} className="border-b">
                <td className="py-2 px-4">{client.name}</td>
                <td className="py-2 px-4">{client.email}</td>
                <td className="py-2 px-4">{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
