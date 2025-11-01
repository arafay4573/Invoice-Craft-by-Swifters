"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-text dark:text-white">{q}</span>
        <ChevronDown
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <p className="mt-2 text-gray-700 dark:text-gray-300">{a}</p>}
    </div>
  );
};

export const Faq = () => {
  const faqs = [
    {
      q: 'What is InvoiceCraft?',
      a: 'InvoiceCraft is a free online invoice generator that helps freelancers and small businesses create professional invoices instantly with PDF download support and live preview.',
    },
    {
      q: 'Is InvoiceCraft free to use?',
      a: 'Yes, InvoiceCraft is 100% free to use. There are no subscriptions, fees, or hidden charges.',
    },
    {
      q: 'Do I need to register to download invoices?',
      a: 'No, registration is not required to create, preview, or download invoices. Registration is an optional feature that allows you to save your invoices and client information.',
    },
    {
      q: 'How secure is my data on InvoiceCraft?',
      a: 'We take your privacy seriously. InvoiceCraft does not store your invoice data unless you voluntarily create an account and save it. All data is transmitted over a secure SSL connection.',
    },
    {
      q: 'Can I use InvoiceCraft without an account?',
      a: 'Absolutely. The core features of InvoiceCraft are available to everyone, with or without an account.',
    },
    {
      q: 'Who built InvoiceCraft?',
      a: 'InvoiceCraft was built by Swifters, a passionate team dedicated to creating simple, beautiful, and useful tools for everyone.',
    },
  ];

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-8 text-text dark:text-white">
        Frequently Asked Questions
      </h3>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
};
