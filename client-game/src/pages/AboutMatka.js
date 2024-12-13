import React from 'react';
import Navbar from '../components/Navbar';

const AboutMatka = () => {
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
          justifyContent: 'flex-start', // Align items to start for better flow
          minHeight: '100vh',
          textAlign: 'center',
          color: 'rgb(20, 25, 51)',
          padding: '20px',
          paddingBottom: '40px', // Added padding at the bottom for more space
        }}
      >
        <h2 style={{ fontSize: '2.5rem', color: '#3F74F5', marginBottom: '20px' }}>
          Satta Matka by Satta Results
        </h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
          We specialize in providing information, analysis tools, game strategy, optimization algorithms, and actionable intelligence to power you to make the most of your daily adventure. We promise and deliver 100x more value than any other website out there.
        </p>
        <p style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.5' }}>
          Beginner, Enthusiast, Professional, Extraterrestrial - Whatever you might be, you will surely find something here that you will fall in love with.
        </p>

        {/* Additional Text and Buttons Section */}
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

          {/* Charts & Lists Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>Charts & Lists</h2>
            <p>
              Matka lists and charts power you to organize yourself around and understand the Satta Matka game better than you do now. You can refer to the charts as per your use case.
            </p>
            <p>
              Satta Matka game has 5 variations that you can play: Singles (Ank), Jodi (Pair/Bracket), Pana (Patti/Panel), Half Sangam, and Sangam. There are 10 Singles, 100 Jodis, 220 Panas, 4,400 Half Sangams, and 48,400 Sangams. Each game variation has its own rate.
            </p>
          </div>

          {/* Single (ANK) Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>Single (ANK)</h2>
            <p>Single, referred mostly as ank/figure, is a single digit variation you can play in Matka.</p>
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
            </div>
          </div>

          {/* Jodi Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>JODI</h2>
            <p>Jodi (Pair/Bracket) is the two-digit variation that you can play in Matka. Jodi is the most played variation in Matka.</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                marginTop: '20px',
              }}
            >
              <button style={buttonStyle}>Jodi Family Chart</button>
              <button style={buttonStyle}>Jodi Total Chart</button>
              <button style={buttonStyle}>Jodi Count Chart</button>
              <button style={buttonStyle}>Jodi Difference Chart</button>
              <button style={buttonStyle}>Jodi Even Odd Chart</button>
              <button style={buttonStyle}>List of Prime Jodi's</button>
            </div>
          </div>

          {/* Pana (Patti) Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>Pana (Patti)</h2>
            <p>
              Pana is the core of the Satta Matka game. Everything in Matka more or less revolves around Pana. A Pana is a 3-digit variation that you can play in Matka. Pana is also called Panel/Patti.
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
              <button style={buttonStyle}>List of 220 Pana (Patti/Panel)</button>
              <button style={buttonStyle}>List of SP Pana (Single Pana)</button>
              <button style={buttonStyle}>List of DP Pana (Double Pana)</button>
              <button style={buttonStyle}>List of TP Pana (Triple Pana)</button>
              <button style={buttonStyle}>Pana Family Chart</button>
              <button style={buttonStyle}>Pana Total Chart</button>
              <button style={buttonStyle}>Pana Count Chart</button>
              <button style={buttonStyle}>Pana Difference Chart</button>
              <button style={buttonStyle}>Pana Even Odd Chart</button>
              <button style={buttonStyle}>List of Prime Pana's</button>
              <button style={buttonStyle}>CP Pana (Cycle Pana) Chart</button>
            </div>
          </div>

          {/* Half Sangam Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>Half Sangam</h2>
            <p>
              Half Sangam is a 4-digit variation in Satta Matka. It combines an ank and a pana. Two types of Half Sangams are available, called Half Sangam A (HSA) and Half Sangam B (HSB).
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
              <button style={buttonStyle}>List of 2200 Half Sangam A</button>
              <button style={buttonStyle}>List of 2200 Half Sangam B</button>
            </div>
          </div>

          {/* Sangam Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>Sangam</h2>
            <p>
              Sangam is a 6-digit variation in Matka. With 48,400 possible Sangams, it is the most challenging and rewarding variation, offering a massive 1:15,000 rate.
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
              <button style={buttonStyle}>List of 48400 Sangams</button>
            </div>
          </div>

          {/* About Ratan Khatri Section */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: '2rem', color: '#3F74F5' }}>About Ratan Khatri</h2>
            <p>
              Ratan Khatri is known as the founder and king of Satta Matka. His Matka game is known as Worli Matka, now called Main Mumbai or Bombay. During Indira Gandhi’s Emergency, Khatri was arrested for organizing Matka activities. Khatri passed away on May 10, 2020.
            </p>
          </div>
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
  transition: 'background-color 0.3s ease', // Added hover effect
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
  maxWidth: '900px', // Ensures it doesn't get too wide on larger screens
  textAlign: 'center', // Centered text inside cards
};

export default AboutMatka;
