"use client";

import React from 'react';
import { FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavbarProps {
  onDownloadPDF: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDownloadPDF }) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="text-primary" size={28} />
          <h1 className="text-2xl font-bold ml-2 text-text dark:text-white">InvoiceCraft</h1>
        </div>
        <div className="flex items-center">
          <button
            className="mr-4"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="text-text dark:text-white" />
            ) : (
              <Moon className="text-text dark:text-white" />
            )}
          </button>
          <button
            className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            onClick={onDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
