import React from 'react';

export const OgBanner = () => (
  <div
    style={{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #6366F1, #06B6D4)',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '40px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: '72px', fontWeight: 'bold' }}>
      InvoiceCraft — Free Online Invoice Generator by Swifters
    </div>
    <div style={{ fontSize: '36px', marginTop: '20px' }}>
      Create invoices instantly. 100% free. No signup required.
    </div>
  </div>
);
