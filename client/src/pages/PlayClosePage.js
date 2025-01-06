import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/maroonbg.jpg'; // Ensure this image is available

const PlayClosePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sattaName } = location.state || {};
  const [market, setMarket] = useState('');
  const [biddingItems, setBiddingItems] = useState([]);
  const [biddingNumber, setBiddingNumber] = useState('');
  const [points, setPoints] = useState('');

  const handleAddBidding = () => {
    if (biddingNumber && points) {
        const newBiddings = [];

        if (market.toLowerCase() === 'default') {
          newBiddings.push({ openClose: 'Close', digit: biddingNumber, points });
          console.log("Default Market - New Biddings:", newBiddings);
      }

        if (market.toLowerCase() === 'sp') {
            const spMapping = {
                0: ["127", "136", "145", "190", "235", "280", "370", "389", "460", "479", "569", "578"],
                1: ["128", "137", "146", "236", "245", "290", "380", "470", "489", "560", "579", "678"],
                2: ["129", "138", "147", "156", "237", "246", "345", "390", "480", "570", "589", "679"],
                3: ["120", "139", "148", "157", "238", "247", "256", "346", "490", "580", "670", "689"],
                4: ["130", "149", "158", "167", "239", "248", "257", "347", "356", "590", "680", "789"],
                5: ["140", "159", "168", "230", "249", "258", "267", "348", "357", "456", "690", "780"],
                6: ["123", "150", "169", "178", "240", "259", "268", "349", "358", "367", "457", "790"],
                7: ["124", "160", "179", "250", "269", "278", "340", "359", "368", "458", "467", "890"],
                8: ["125", "134", "170", "189", "260", "279", "350", "369", "378", "459", "468", "567"],
                9: ["126", "135", "180", "234", "270", "289", "360", "379", "450", "469", "478", "568"]
            };

            if (!isNaN(biddingNumber) && biddingNumber.length === 1) {
                const digit = parseInt(biddingNumber, 10);
                const spNumbers = spMapping[digit] || [];
                spNumbers.forEach((num) => {
                    newBiddings.push({ openClose: 'close', digit: num, points });
                });
            } else {
                alert('Please enter a valid single-digit number for SP market.');
                return;
            }
        }

        if (market.toLowerCase() === 'dpt') {
            const dptMapping = {
                0: ["118", "226", "244", "299", "334", "488", "550", "668", "677", "000"],
                1: ["100", "119", "155", "227", "335", "344", "399", "588", "669", "777"],
                2: ["110", "200", "228", "255", "336", "499", "660", "688", "778", "444"],
                3: ["166", "229", "300", "337", "355", "445", "599", "779", "788", "111"],
                4: ["112", "220", "266", "338", "400", "446", "455", "699", "770", "888"],
                5: ["113", "122", "177", "339", "366", "447", "500", "799", "889", "555"],
                6: ["114", "277", "330", "448", "466", "556", "600", "880", "899", "222"],
                7: ["115", "133", "188", "223", "377", "449", "557", "566", "700", "999"],
                8: ["116", "224", "233", "288", "440", "477", "558", "800", "990", "666"],
                9: ["117", "144", "199", "225", "388", "559", "577", "667", "900", "333"]
            };

            if (!isNaN(biddingNumber) && biddingNumber.length === 1) {
                const digit = parseInt(biddingNumber, 10);
                const dptNumbers = dptMapping[digit] || [];
                dptNumbers.forEach((num) => {
                    newBiddings.push({ openClose: 'close', digit: num, points });
                });
            } else {
                alert('Please enter a valid single-digit number for DPT market.');
                return;
            }

            if (market.toLowerCase() === 'cp') {
              const cpMapping = {
                10: ["100", "110", "120", "130", "140", "150", "160", "170", "180", "190"],
                11: ["110", "111", "112", "113", "114", "115", "116", "117", "118", "119"],
                12: ["112", "120", "122", "123", "124", "125", "126", "127", "128", "129"],
                13: ["113", "123", "130", "133", "134", "135", "136", "137", "138", "139"],
                14: ["114", "124", "134", "140", "144", "145", "146", "147", "148", "149"],
                15: ["115", "125", "135", "145", "150", "155", "156", "157", "158", "159"],
                16: ["116", "126", "136", "146", "156", "160", "166", "167", "168", "169"],
                17: ["117", "127", "137", "147", "157", "167", "170", "177", "178", "179"],
                18: ["118", "128", "138", "148", "158", "168", "178", "180", "188", "189"],
                19: ["119", "129", "139", "149", "159", "169", "179", "189", "190", "199"],
                20: ["120", "200", "220", "230", "240", "250", "260", "270", "280", "290"],
                22: ["122", "220", "223", "224", "225", "226", "227", "228", "229", "222"],
                23: ["123", "230", "233", "234", "235", "236", "237", "238", "239", "223"],
                24: ["124", "240", "244", "245", "246", "247", "248", "249", "224", "234"],
                25: ["125", "250", "255", "256", "257", "258", "259", "225", "235", "245"],
                26: ["126", "260", "266", "267", "268", "269", "226", "236", "246", "256"],
                27: ["127", "270", "277", "278", "279", "227", "237", "247", "257", "267"],
                28: ["128", "280", "288", "289", "228", "238", "248", "258", "268", "278"],
                29: ["129", "290", "299", "229", "239", "249", "259", "269", "279", "289"],
                30: ["130", "230", "300", "330", "340", "350", "360", "370", "380", "390"],
                34: ["134", "234", "334", "340", "344", "345", "346", "347", "348", "349"],
                35: ["135", "350", "355", "335", "345", "235", "356", "357", "358", "359"],
                36: ["136", "360", "366", "336", "346", "356", "367", "368", "369", "236"],
                37: ["137", "370", "377", "337", "347", "357", "367", "378", "379", "237"],
                38: ["138", "380", "388", "238", "338", "348", "358", "368", "378", "389"],
                39: ["139", "390", "399", "349", "359", "369", "379", "389", "239", "339"],
                40: ["140", "240", "340", "400", "440", "450", "460", "470", "480", "490"],
                44: ["144", "244", "344", "440", "449", "445", "446", "447", "448", "444"],
                45: ["145", "245", "345", "450", "456", "457", "458", "459", "445", "455"],
                46: ["146", "460", "446", "467", "468", "469", "246", "346", "456", "466"],
                47: ["147", "470", "447", "478", "479", "247", "347", "457", "467", "477"],
                48: ["148", "480", "489", "248", "348", "448", "488", "458", "468", "478"],
                49: ["149", "490", "499", "449", "459", "469", "479", "489", "249", "349"],
                50: ["500", "550", "150", "250", "350", "450", "560", "570", "580", "590"],
                55: ["155", "556", "557", "558", "559", "255", "355", "455", "555", "550"],
                56: ["156", "556", "567", "568", "569", "356", "256", "456", "560", "566"],
                57: ["157", "257", "357", "457", "557", "578", "579", "570", "567", "577"],
                58: ["158", "558", "568", "578", "588", "589", "580", "258", "358", "458"],
                59: ["159", "259", "359", "459", "559", "569", "579", "589", "590", "599"],
                60: ["600", "160", "260", "360", "460", "560", "660", "670", "680", "690"],
                66: ["660", "667", "668", "669", "666", "166", "266", "366", "466", "566"],
                67: ["670", "167", "267", "367", "467", "567", "667", "678", "679", "677"],
                68: ["680", "688", "668", "678", "168", "268", "368", "468", "568", "689"],
                69: ["690", "169", "269", "369", "469", "569", "669", "679", "689", "699"],
                70: ["700", "170", "270", "370", "470", "570", "670", "770", "780", "790"],
                77: ["770", "177", "277", "377", "477", "577", "677", "778", "779", "777"],
                78: ["178", "278", "378", "478", "578", "678", "778", "788", "789", "780"],
                79: ["179", "279", "379", "479", "579", "679", "779", "789", "799", "790"],
                80: ["180", "280", "380", "480", "580", "680", "780", "880", "800", "890"],
                88: ["188", "288", "388", "488", "588", "688", "788", "889", "888", "880"],
                89: ["189", "289", "389", "489", "589", "689", "789", "889", "890", "899"],
                90: ["900", "190", "290", "390", "490", "590", "690", "790", "890", "900"],
                99: ["199", "299", "399", "499", "599", "699", "799", "899", "990", "999"],
                0: ["000"]
            };
            
            
              const digit = parseInt(biddingNumber, 10);
            
              if (!isNaN(digit)) {
                const cpNumbers = cpMapping[digit] || [];
                if (cpNumbers.length > 0) {
                  cpNumbers.forEach((num) => {
                    newBiddings.push({ openClose: 'close', digit: num, points });
                  });
                } else {
                  alert('No CP PANA numbers found for the given input.');
                  return;
                }
              } else {
                alert('Please enter a valid CP PANA number.');
                return;
              }
            }
      
      
            if (market.toLowerCase() === 'berries') {
              const dptMapping = {
                0: ["290", "380", "470", "560", "390", "480", "570", "120", "490", "580", "670", "130", "590", "680", "140", "230", "690", "780", "150", "240","790", "160", "250", "340", "890", "170", "260", "350", "180", "270","360", "450", "190", "280", "370", "460"],
                1: ["128", "137", "146", "129", "138", "147", "156", "120", "139", "148","157", "130", "149", "158", "167", "140", "159", "168", "123", "150","169", "178", "124", "160", "179", "125", "134", "170", "189", "126","135", "180", "127", "136", "145", "190"],
                2: ["128", "236", "245", "290", "129", "237", "246", "120", "238", "247","256", "239", "248", "257", "230", "249", "258", "267", "123", "240","259", "268", "124", "250", "269", "278", "125", "260", "279", "126","234", "270", "289", "127", "280", "235"],
                3: ["137", "236", "380", "138", "237", "345", "390", "139", "238", "346","130", "239", "347", "356", "230", "348", "357", "123", "349", "358","367", "340", "359", "368", "134", "350", "369", "378", "135", "234","360", "379", "136", "235", "370", "389"],
                4: ["146", "246", "470", "489", "147", "246", "345", "480", "148", "247","346", "490", "149", "248", "347", "140", "249", "348", "456", "240","349", "457", "124", "340", "458", "467", "134", "459", "468", "234","450", "469", "478", "145", "460", "479"],
                5: [ "245", "560", "579", "156", "346", "570", "589", "157", "256", "580", 
                  "158", "257", "356", "590", "159", "258", "357", "456", "150", "259", 
                  "358", "457", "250", "359", "458", "125", "350", "459", "567", "135", 
                  "450", "568", "145", "235", "569", "578"],
                6: [ "146", "236", "560", "678", "156", "246", "679", "256", "346", "670", 
                  "689", "167", "356", "680", "168", "267", "456", "690", "169", "168", 
                  "367", "160", "269", "368", "467", "260", "369", "468", "567", "126", 
                  "360", "469", "568", "136", "460", "569"],
                7: ["137", "470", "579", "678", "147", "237", "570", "679", "157", "247", 
          "670", "167", "257", "347", "789", "267", "357", "780", "178", "367", 
          "457", "790", "179", "278", "467", "170", "279", "378", "567", "270", 
          "379", "478", "127", "370", "479", "578"],
                8: ["128", "380", "489", "678", "138", "480", "589", "148", "238", "580", 
          "689", "158", "248", "680", "789", "168", "258", "348", "780", "178", 
          "268", "358", "278", "368", "458", "890", "189", "378", "468", "180", 
          "289", "478", "568", "280", "389", "578"],
                9: [ "290", "489", "579", "129", "390", "589", "679", "139", "490", "689", 
                  "149", "239", "590", "789", "159", "249", "690", "169", "259", "349", 
                  "790", "179", "269", "359", "890", "189", "279", "369", "459", "289", 
                  "379", "469", "190", "389", "479", "569"]
              };
        
              if (!isNaN(biddingNumber) && biddingNumber.length === 1) {
                const digit = parseInt(biddingNumber, 10);
                const dptNumbers = dptMapping[digit] || [];
                dptNumbers.forEach((num) => {
                  newBiddings.push({ openClose: 'close', digit: num, points });
                });
              } else {
                alert('Please enter a valid single-digit number for berries market.');
                return;
              }
            }
           
        }

        // Continue with other market types (cp, berries, etc.)

        setBiddingItems((prev) => [...prev, ...newBiddings]);
        setBiddingNumber('');
        // setPoints('');
    }
};


  const handleDeleteBidding = (index) => {
    const updatedItems = biddingItems.filter((_, i) => i !== index);
    setBiddingItems(updatedItems);
  };

  const handleSubmitMarket = () => {
    if (!market) { 
      alert('Please select a market first.');
    } else {
      // Calculate total points
      const totalPoints = biddingItems.reduce(
        (total, item) => total + parseFloat(item.points || 0),
        0
      );

      // Pass all selected data to the checkout page
      navigate('/checkout', {
        state: {
          market,
          biddingItems,
          totalPoints,
          sattaName,
        },
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-2xl font-bold text-white mb-4">
        {sattaName ? `${sattaName}` : 'No Satta Selected'} <span>- Close</span>
      </h1>

      {/* Dropdown and Submit Button in Same Line */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="w-64">
          <select
            id="market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="default">DEFAULT</option>
            <option value="sp">SP</option>
            <option value="dpt">DPT</option>
            <option value="cp">CP</option>
            <option value="sp motors">SP MOTORS</option>
            <option value="dp motors">DP MOTORS</option>
            <option value="sp dp motors">SP DP MOTORS</option>
            <option value="sp common">SP COMMON</option>
            <option value="dpt common">DPT COMMON</option>
            <option value="pana family">PANA FAMILY</option>
            <option value="cht 30">CHT 30</option>
            <option value="cht 40">CHT 40</option>
            <option value="cht 50">CHT 50</option>
            <option value="cht 70">CHT 70</option>
          </select>
        </div>
        <button
          onClick={handleSubmitMarket}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Display Space for Added Items */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Bidding Items</h2>
        {biddingItems.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold">Open/Close</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Digit</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Points</th>
                <th className="py-2 px-4 text-left text-sm font-semibold"></th> {/* Empty Column for Delete */}
              </tr>
            </thead>
            <tbody>
              {biddingItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4">{item.openClose}</td> {/* Always 'close' */}
                  <td className="py-2 px-4">{item.digit}</td>
                  <td className="py-2 px-4">{item.points}</td>
                  <td className="py-2 px-4 text-red-500 cursor-pointer" onClick={() => handleDeleteBidding(index)}>
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No items added yet.</p>
        )}
      </div>


       {/* Total count of added items */}
       <div className="text-white mb-4">
        Total : {biddingItems.length}
      </div>

      {/* Input Section for Bidding */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <div className="flex space-x-4">
          <input
            type="text"
            value={biddingNumber}
            onChange={(e) => setBiddingNumber(e.target.value)}
            placeholder="Bidding Number"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Points"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddBidding}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>

      {/* Total Points */}
      <div className="mt-4 text-white text-lg font-semibold">
        Total Rs: {biddingItems.reduce((total, item) => total + parseFloat(item.points || 0), 0)}

       
      </div>
    </div>
  );
};

export default PlayClosePage;
