import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/finger.png';

const PanelList = () => {
  const results = [
    { name: 'ADD UR MARKET FREE', numbers: '193, 90, 102' },
    { name: 'MILAN MORNING', numbers: '111, 22, 333' },
    { name: 'MILAN DAY', numbers: '444, 55, 666' },
    { name: 'MILAN NIGHT', numbers: '777, 88, 999' },
    { name: 'TIME BAZAR', numbers: '100, 20, 300' },
    { name: 'NIGHT TIME BAZAR', numbers: '101, 20, 303' },
    { name: 'KALYAN', numbers: '500, 60, 700' },
    { name: 'KALYAN NIGHT', numbers: '150, 25, 350' },
    { name: 'GABBAR', numbers: '555, 66, 777' },
    { name: 'GABBAR NIGHT', numbers: '888, 99, 111' },
    { name: 'SRIDEVI', numbers: '123, 56, 876' },
    { name: 'SRIDEVI BAZAR', numbers: '432, 87, 543' },
    { name: 'SRIDEVI NIGHT', numbers: '999, 88, 777' },
    { name: 'SRIDEVI BAZAR NIGHT', numbers: '666, 55, 444' },
    { name: 'SATTA MATKA MORNING (SATTA MORNING)', numbers: '135, 24, 357' },
    { name: 'SATTA MATKA DAY (SATTA DAY)', numbers: '432, 87, 543' },
    { name: 'SATTA MATKA NIGHT (SATTA NIGHT)', numbers: '111, 22, 333' },
    { name: 'SUPREME DAY', numbers: '987, 65, 321' },
    { name: 'SUPREME NIGHT', numbers: '123, 43, 567' },
    { name: 'RAJDHANI DAY', numbers: '222, 33, 444' },
    { name: 'RAJDHANI NIGHT', numbers: '555, 66, 777' },
    { name: 'MORNING KUBER', numbers: '777, 88, 999' },
    { name: 'KUBER DAY', numbers: '100, 10, 103' },
    { name: 'KUBER NIGHT', numbers: '200, 20, 203' },
    { name: 'SUPER KALYAN', numbers: '234, 34, 456' },
    { name: 'SUPER MUMBAI DAY', numbers: '654, 32, 876' },
    { name: 'MAIN MILAN DAY', numbers: '111, 22, 333' },
    { name: 'MILAN DAY (SPECIAL)', numbers: '444, 55, 666' },
    { name: 'MILAN NIGHT (SPECIAL)', numbers: '777, 88, 999' },
    { name: 'CG DAY', numbers: '111, 33, 555' },
    { name: 'CG NIGHT', numbers: '222, 44, 666' },
    { name: 'CENTRAL BOMBAY', numbers: '135, 24, 357' },
    { name: 'CENTRAL BOMBAY NIGHT', numbers: '432, 87, 543' },
    { name: 'TARA MUMBAI DAY', numbers: '987, 65, 321' },
    { name: 'TARA MUMBAI NIGHT', numbers: '123, 43, 567' },
    { name: 'MADHUR MORNING', numbers: '234, 34, 456' },
    { name: 'MADHUR DAY', numbers: '654, 32, 876' },
    { name: 'MADHUR NIGHT', numbers: '100, 10, 103' },
    { name: 'MUMBAI MAIL', numbers: '200, 20, 203' },
    { name: 'MUMBAI MAIL NIGHT', numbers: '987, 65, 321' },
    { name: 'MUMBAI DHAMAKA', numbers: '555, 66, 777' },
    { name: 'BOMBAY MARKET', numbers: '777, 88, 999' },
    { name: 'NEW MUMBAI ROYAL', numbers: '111, 22, 333' },
    { name: 'MINI MUMBAI', numbers: '444, 55, 666' },
    { name: 'MAIN RATAN', numbers: '777, 88, 999' },
    { name: 'RAJRATAN', numbers: '100, 20, 301' },
    { name: 'RAJRATAN NIGHT', numbers: '400, 50, 601' },
    { name: 'MAIN BAZAR', numbers: '700, 80, 901' },
    { name: 'MAIN KALYAN', numbers: '100, 20, 300' },
    { name: 'EVENING KALYAN', numbers: '400, 50, 600' }
  ];
  



  const navigate = useNavigate();

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
      

      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 mt-4 mb-2 rounded-br-xl rounded-tl-xl max-w-full text-center sm:px-12 md:px-32 lg:px-60" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
        Panel Chart List
      </h3>

      {results.map((result) => (
        <div
          key={result.name}
          onClick={() => handleNavigate(result)}
          className="flex items-center justify-center p-4 mt-2 w-full max-w-2xl mx-auto cursor-pointer sm:w-full sm:px-6 lg:w-[90%] xl:w-[70%]"
          style={{ 
            background: 'rgb(255, 255, 255)', 
            color: 'rgb(20, 25, 51)', 
            borderRadius: '24px', 
            boxShadow: 'rgba(36, 42, 209, 0.25) 0px 2px 15px',
          }}
        >
          <img src={logo} alt="Logo" className="h-8 w-8 mr-4 animate-pointing" />
          <p className="text-base font-semibold text-center" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
            {result.name}
          </p>
        </div>
      ))}

      <style jsx>{`
        .animate-pointing {
          animation: point 1s infinite alternate;
        }

        @keyframes point {
          0% { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default PanelList;
