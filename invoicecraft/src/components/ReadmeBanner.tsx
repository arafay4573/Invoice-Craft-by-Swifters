import React from 'react';

export const ReadmeBanner = () => (
  <div
    style={{
      width: '1280px',
      height: '640px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #E0E7FF, #FFFFFF)',
      color: '#111827',
      fontFamily: 'sans-serif',
      padding: '40px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: '72px', fontWeight: 'bold' }}>
      InvoiceCraft — Free Online Invoice Generator
    </div>
    <div style={{ fontSize: '36px', marginTop: '20px', color: '#4B5563' }}>
      Beautifully simple, 100% free, built by The Swifters
    </div>
    <div style={{ position: 'absolute', bottom: '20px', right: '40px', color: '#9CA3AF', fontSize: '24px' }}>
      By Swifters
    </div>
  </div>
);
