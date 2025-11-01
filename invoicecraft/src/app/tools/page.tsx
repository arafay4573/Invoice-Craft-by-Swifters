import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AdPlaceholder from '../../components/AdPlaceholder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Business Tools | InvoiceCraft",
  description: "A collection of free business tools from InvoiceCraft, including a currency converter, PDF tools, and a payslip generator.",
};

export default function Tools() {
  const tools = [
    { name: 'Currency Converter', description: 'Coming Soon' },
    { name: 'PDF Merge/Compress', description: 'Coming Soon' },
    { name: 'Payslip Generator', description: 'Coming Soon' },
  ];

  return (
    <>
      <Navbar onDownloadPDF={() => {}} />
      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-8">Free Business Tools</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center"
                >
                  <h2 className="text-2xl font-bold mb-4 text-text dark:text-white">
                    {tool.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <AdPlaceholder />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
