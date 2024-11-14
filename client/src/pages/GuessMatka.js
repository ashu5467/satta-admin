import React from 'react';
import Navbar from '../components/Navbar';

const GuessMatka = () => {
  return (
    <>
    <Navbar/>
    <div style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
      <h1>Guess Matka</h1>
      <p>Guess the Matka numbers here.</p>
    </div>
    </>
  );
};

export default GuessMatka;
