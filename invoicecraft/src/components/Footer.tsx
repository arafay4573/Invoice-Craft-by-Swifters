import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="container mx-auto px-8 py-4 text-center text-gray-600 dark:text-gray-300">
        <p>
          Made with ❤️ by{' '}
          <a
            href="https://theswifters.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-colors"
          >
            Swifters
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
