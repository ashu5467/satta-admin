import React from 'react';
import Navbar from '../components/Navbar.js';
import LiveUpdates from '../components/LiveUpdates.js';
import LiveResults from '../components/LiveResults.js';
import AddYourMarket from '../components/AddYourMarket.js';
import PanelList from '../components/PanelList.js';
import Timetable from '../components/TimeTable.js';
import Footer from '../components/Footer.js';

const HomePage = () => {
  return (
    <div className="bg-[#F2F6FA]">

        
      <Navbar />

      <span 
  className="text-lg font-bold text-green-500 bg-white text-center py-2 px-4 md-5 m-5 rounded-lg shadow-lg mx-auto"
  style={{
    fontFamily: 'Ubuntu',
    fontWeight: '600',
    borderRadius: '12px',
    padding: '12px',
    margin: '16px',
    boxShadow: '0 2px 15px #ccc',
    overflow: 'hidden',
    display: 'block', // Ensures mx-auto works as intended
  }}
>
  WORLD'S BIGGEST SATTA MATKA NETWORK
</span>


      <LiveUpdates/>
      <LiveResults/>
      <AddYourMarket/>
      <PanelList/>
      <Timetable/>
      <Footer/>
    </div>
  );
}

export default HomePage;
