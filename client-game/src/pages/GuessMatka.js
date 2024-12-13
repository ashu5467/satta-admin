import React from 'react';
import Navbar from '../components/Navbar';

const GuessMatka = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          fontFamily: 'Segoe UI, sans-serif',
          fontWeight: '600',
          fontStyle: 'italic',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          textAlign: 'center',
          color: 'rgb(20, 25, 51)',
          padding: '20px',
          paddingBottom: '40px',
        }}
      >
        {/* Added the new text section */}
        <div style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.5' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#3F74F5', marginBottom: '20px' }}>
            Guess Matka
          </h1>
          <p style={{ marginBottom: '20px' }}>
            HOW TO GUESS MATKA NUMBER?
          </p>
          <p style={{ marginBottom: '20px' }}>
            Matka game can be guessed using both Conventional and Alternate methodologies. A Conventional method is what most people follow and is considered a default way of doing things. Alternate methodology uses an analysis-based approach.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Before you begin, we assume that you know the basics of Matka very well. If you don't know, you can visit the <a href="/learn-matka" style={{ color: '#3F74F5' }}>Learn Matka</a> resource page. We have covered all basic concepts in detail.
          </p>
        </div>

        <h2 style={{ fontSize: '2.5rem', color: '#3F74F5', marginBottom: '20px' }}>
          Satta Matka by Satta Results
        </h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
          We specialize in providing information, analysis tools, game strategy, optimization algorithms, and actionable intelligence to power you to make the most of your daily adventure. We promise and deliver 100x more value than any other website out there.
        </p>
        <p style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.5' }}>
          Beginner, Enthusiast, Professional, Extraterrestrial - Whatever you might be, you will surely find something here that you will fall in love with.
        </p>

        {/* Additional content continues below */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>What is Satta Matka?</h2>
            <p>
              Satta Matka, also known as Matka, is a numbers game popular in India and some Arab countries like UAE, Saudi Arabia, Kuwait, and Qatar. Played by millions of players across the world, the history of Matka spans over 50+ years. Kalyan and Mumbai are the most popular Satta Matka markets.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                marginTop: '20px',
              }}
            >
              <button style={buttonStyle}>Satta Matka Basics</button>
              <button style={buttonStyle}>How to Play Matka</button>
              <button style={buttonStyle}>How to Guess Matka</button>
            </div>
          </div>

          {/* Rest of the content continues... */}
        </div>
      </div>
    </>
  );
};

// Button style for consistency
const buttonStyle = {
  backgroundColor: '#3F74F5',
  color: 'white',
  borderRadius: '8px',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: '600',
  width: '200px', // Optional: To keep button widths consistent
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#1a57c0',
};

// Card style for rectangular card with shadow and rounded corners
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  marginBottom: '40px',
  width: '90%', // Adjusted for better spacing
  maxWidth: '900px',
  textAlign: 'center',
};

export default GuessMatka;
