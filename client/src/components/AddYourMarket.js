import React from 'react';
import logo from '../assets/finger.png';

const AddYourMarket = () => {
  // Array of chart names
  const chartNames = [
    "ADD UR MARKET FREE Chart",
    "MILAN MORNING Chart",
    "MILAN DAY Chart",
    "MILAN NIGHT Chart",
    "TIME BAZAR Chart",
    "NIGHT TIME BAZAR Chart",
    "KALYAN Chart",
    "KALYAN NIGHT Chart",
    "GABBAR Chart",
    "GABBAR NIGHT Chart",
    "SRIDEVI Chart",
    "SRIDEVI BAZAR Chart",
    "SRIDEVI NIGHT Chart",
    "SRIDEVI BAZAR NIGHT Chart",
    "SATTA MATKA MORNING (SATTA MORNING) Chart",
    "SATTA MATKA DAY (SATTA DAY) Chart",
    "SATTA MATKA NIGHT (SATTA NIGHT) Chart",
    "SUPREME DAY Chart",
    "SUPREME NIGHT Chart",
    "RAJDHANI DAY Chart",
    "RAJDHANI NIGHT Chart",
    "MORNING KUBER Chart",
    "KUBER DAY Chart",
    "KUBER NIGHT Chart",
    "SUPER KALYAN Chart",
    "SUPER MUMBAI DAY Chart",
    "MAIN MILAN DAY Chart",
    "MILAN DAY (SPECIAL) Chart",
    "MILAN NIGHT (SPECIAL) Chart",
    "CG DAY Chart",
    "CG NIGHT Chart",
    "CENTRAL BOMBAY Chart",
    "CENTRAL BOMBAY NIGHT Chart",
    "TARA MUMBAI DAY Chart",
    "TARA MUMBAI NIGHT Chart",
    "MADHUR MORNING Chart",
    "MADHUR DAY Chart",
    "MADHUR NIGHT Chart",
    "MUMBAI MAIL Chart",
    "MUMBAI MAIL NIGHT Chart",
    "MUMBAI DHAMAKA Chart",
    "BOMBAY MARKET Chart",
    "NEW MUMBAI ROYAL Chart",
    "MINI MUMBAI Chart",
    "MAIN RATAN Chart",
    "RAJRATAN Chart",
    "RAJRATAN NIGHT Chart",
    "MAIN BAZAR Chart",
    "MAIN KALYAN Chart",
    "EVENING KALYAN Chart"
  ];

  return (
    <div className="flex flex-col items-center p-6">
      {/* Underlined Heading */}
      <h1 className="text-2xl font-semibold text-black mb-6" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600', textDecoration: 'underline' }}>
        ADD YOUR MARKET
      </h1>

      {/* White Card for Informational Text */}
      <div 
        className="bg-white shadow-lg rounded-2xl p-6 mb-6 w-full max-w-2xl text-center text-gray-700" 
        style={{ fontFamily: 'Segoe UI, sans-serif' }}
      >
        <p className='text-green-500'>
          SATTAMATKA/SATTA MATKA<br /><br />
          अगर आप खुद का मटका बाजार चलाते हैं, और अपने बाजार का रिजल्ट हमारी वेबसाइट पर डलवाना चाहते हैं, तो आज ही हमसे संपर्क करें.<br /><br />
          आपके बाजार का एडमिन पैनल आपको बना के दिया जायेगा, जिससे आप अपने बाजार का रिजल्ट अपडेट कर सकेंगे.<br />
          आपके बाजार का पुराना रिकॉर्ड भी वेबसाइट पर दाल दिया जाएगा<br /><br />
          Do you want to start a new market? or if do you have already pre-owned market, you can publish your market results on sattaresults.mobi without monthly charges.<span className='text-red-500'> (FREE)</span><br /><br />
          Contact Admin<br />
          (WHATSAPP: 9490156188)
        </p>
      </div>

      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 mt-4 mb-2 rounded-br-xl rounded-tl-xl max-w-full text-center sm:px-12 md:px-32 lg:px-60" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
        Chart List
      </h3>

      {/* Mapping over chartNames to render each chart as a card with logo */}
      {chartNames.map((chart, index) => (
        <div 
          key={index}
          className="flex items-center justify-center p-4 mt-2 w-full max-w-2xl mx-auto sm:w-full sm:px-6 lg:w-[90%] xl:w-[70%]" 
          style={{ 
            background: 'rgb(255, 255, 255)', 
            color: 'rgb(20, 25, 51)', 
            borderRadius: '24px', 
            boxShadow: 'rgba(36, 42, 209, 0.25) 0px 2px 15px',
          }}
        >
          {/* Logo Image with animation */}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8 w-8 mr-4 animate-pointing"
          />

          {/* Chart Name */}
          <p className="text-base font-semibold text-center" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 600, margin: 0, padding: 0 }}>
            {chart}
          </p>
        </div>
      ))}

      <style jsx>{`
        /* Animation for logo */
        .animate-pointing {
          animation: point 1s infinite alternate;
        }

        /* Keyframes for the left-to-right pointing effect */
        @keyframes point {
          0% { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

export default AddYourMarket;
