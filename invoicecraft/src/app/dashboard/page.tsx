"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Invoice } from '../../types/invoice';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/invoices')
        .then((res) => res.json())
        .then((data) => setInvoices(data));
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Invoices</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Client</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-right py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="border-b">
                <td className="py-2 px-4">{invoice.clientName}</td>
                <td className="py-2 px-4">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td className="text-right py-2 px-4">${invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
