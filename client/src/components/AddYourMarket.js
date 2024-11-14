import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/finger.png';

const AddYourMarket = () => {
  // Array of results
  const results = [
    { name: 'ADD UR MARKET FREE', numbers: '1234, 5678, 9123' },
    { name: 'MILAN MORNING', numbers: '1111, 2222, 3333' },
    { name: 'MILAN DAY', numbers: '4444, 5555, 6666' },
    { name: 'MILAN NIGHT', numbers: '7777, 8888, 9999' },
    { name: 'TIME BAZAR', numbers: '1000, 2000, 3000' },
    { name: 'NIGHT TIME BAZAR', numbers: '1010, 2020, 3030' },
    { name: 'KALYAN', numbers: '5000, 6000, 7000' },
    { name: 'KALYAN NIGHT', numbers: '1500, 2500, 3500' },
    { name: 'GABBAR', numbers: '5555, 6666, 7777' },
    { name: 'GABBAR NIGHT', numbers: '8888, 9999, 1111' },
    { name: 'SRIDEVI', numbers: '1234, 5678, 8765' },
    { name: 'SRIDEVI BAZAR', numbers: '4321, 8765, 5432' },
    { name: 'SRIDEVI NIGHT', numbers: '9999, 8888, 7777' },
    { name: 'SRIDEVI BAZAR NIGHT', numbers: '6666, 5555, 4444' },
    { name: 'SATTA MATKA MORNING (SATTA MORNING)', numbers: '1357, 2468, 3579' },
    { name: 'SATTA MATKA DAY (SATTA DAY)', numbers: '4321, 8765, 5432' },
    { name: 'SATTA MATKA NIGHT (SATTA NIGHT)', numbers: '1111, 2222, 3333' },
    { name: 'SUPREME DAY', numbers: '9876, 6543, 3210' },
    { name: 'SUPREME NIGHT', numbers: '1234, 4321, 5678' },
    { name: 'RAJDHANI DAY', numbers: '2222, 3333, 4444' },
    { name: 'RAJDHANI NIGHT', numbers: '5555, 6666, 7777' },
    { name: 'MORNING KUBER', numbers: '7777, 8888, 9999' },
    { name: 'KUBER DAY', numbers: '1001, 1002, 1003' },
    { name: 'KUBER NIGHT', numbers: '2001, 2002, 2003' },
    { name: 'SUPER KALYAN', numbers: '2345, 3456, 4567' },
    { name: 'SUPER MUMBAI DAY', numbers: '6543, 3210, 8765' },
    { name: 'MAIN MILAN DAY', numbers: '1111, 2222, 3333' },
    { name: 'MILAN DAY (SPECIAL)', numbers: '4444, 5555, 6666' },
    { name: 'MILAN NIGHT (SPECIAL)', numbers: '7777, 8888, 9999' },
    { name: 'CG DAY', numbers: '1111, 3333, 5555' },
    { name: 'CG NIGHT', numbers: '2222, 4444, 6666' },
    { name: 'CENTRAL BOMBAY', numbers: '1357, 2468, 3579' },
    { name: 'CENTRAL BOMBAY NIGHT', numbers: '4321, 8765, 5432' },
    { name: 'TARA MUMBAI DAY', numbers: '9876, 6543, 3210' },
    { name: 'TARA MUMBAI NIGHT', numbers: '1234, 4321, 5678' },
    { name: 'MADHUR MORNING', numbers: '2345, 3456, 4567' },
    { name: 'MADHUR DAY', numbers: '6543, 3210, 8765' },
    { name: 'MADHUR NIGHT', numbers: '1001, 1002, 1003' },
    { name: 'MUMBAI MAIL', numbers: '2001, 2002, 2003' },
    { name: 'MUMBAI MAIL NIGHT', numbers: '9876, 6543, 3210' },
    { name: 'MUMBAI DHAMAKA', numbers: '5555, 6666, 7777' },
    { name: 'BOMBAY MARKET', numbers: '7777, 8888, 9999' },
    { name: 'NEW MUMBAI ROYAL', numbers: '1111, 2222, 3333' },
    { name: 'MINI MUMBAI', numbers: '4444, 5555, 6666' },
    { name: 'MAIN RATAN', numbers: '7777, 8888, 9999' },
    { name: 'RAJRATAN', numbers: '1001, 2001, 3001' },
    { name: 'RAJRATAN NIGHT', numbers: '4001, 5001, 6001' },
    { name: 'MAIN BAZAR', numbers: '7001, 8001, 9001' },
    { name: 'MAIN KALYAN', numbers: '10001, 20001, 30001' },
    { name: 'EVENING KALYAN', numbers: '40001, 50001, 60001' }
  ]
  ;

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigate = (result) => {
    navigate(`/chart/${result.name}`, {
      state: {
        marketName: result.name,
        resultNumbers: result.numbers,
      },
    });
  };

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

      {/* Mapping over results to render each chart as a card with logo */}
      {results.map((result) => (
        <div
          key={result.name}
          onClick={() => handleNavigate(result)}  // Use handleNavigate to navigate with state
          className="flex items-center justify-center p-4 mt-2 w-full max-w-2xl mx-auto cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-8 w-8 mr-4 animate-pointing" />
          <p className="text-base font-semibold text-center" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
            {result.name}
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
};

export default AddYourMarket;
