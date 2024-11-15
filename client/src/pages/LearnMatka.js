import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import img1 from '../assets/learnmatka1.webp';
import img2 from '../assets/chart-red-result.webp'
import img3 from '../assets/100-jodi-chart.webp'

const LearnMatka = () => {
  useEffect(() => {
    // Set the background color for the entire page
    document.body.style.backgroundColor = '#F1F1F1';
    return () => {
      document.body.style.backgroundColor = ''; // Clean up when component unmounts
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="font-[Segoe UI, sans-serif] font-semibold py-5 flex flex-col items-center justify-center min-h-auto italic bg-[#F1F1F1]">
        {/* Added new content section */}
        <div className="max-w-3xl mx-auto my-5 text-center bg-white px-5 py-10 rounded-md shadow-lg">
          <div className="flex items-center justify-center mb-5">
            <div className="bg-[#3F74F5] text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-3 ">
              1
            </div>
            <h2 className="text-3xl text-black">SATTA MATKA</h2> {/* Removed mb-5 here */}
          </div>
          <h4 className="text-[#516FFF]  text-lg mb-4">
            LEARN MATKA : THE BASICS OF SATTA MATKA
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
            Satta Matka, simply known as Matka, is a numbers game popular in India and some Arab countries like UAE, Saudi Arabia, Kuwait, and Qatar. The history of Matka spans over 50+ years. Ratan Khatri devised this wonderful game in the 1960s. Three cards used to be drawn from a big pitcher (matka) and numbers were announced. Hence the name "Matka". The cards are then arranged in Ascending Order (The numbers of such order are called PANA/PATTI).
          </p>

          <div className="flex items-center justify-center mt-10 mb-5">
            <div className="bg-[#3F74F5] text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-3 mb-4">
              2
            </div>
            <h2 className="text-3xl text-black mb-5 ">TERMINOLOGY</h2>
          </div>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          There are few terms that you need to get familiar with before we move forward. All terms will be explained in detail as we move forward.
          </p>
          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          MARKET
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          A Market, also called Bazar is the organizing body which announces the matka result.
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          BOOKMAKER
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          A Bookmaker, also called a Bookie, is the one who accepts the bets, pays the winnings.
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          PLAYER
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          A Player is the one who plays the game to earn money.
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          RATE
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          Rate is how much you get for every 1 rupee played.
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          RESULT
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          A Result is the outcome of the draw. The matka result is released in two parts.
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          OPEN
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          The First Half of the matka result is called "Open"
          </p>


          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          CLOSE
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          The Second Half of the matka result is called "Close"
          </p>



          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          OPEN
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          The First Half of the matka result is called "Open"
          </p>

          <h4 className="text-[#516FFF] text-lg mt-8 mb-2">
          RECORD CHART
          </h4>
          <p className="font-normal italic text-[#303030] text-sm leading-6">
          A Record Chart is previous results of matka that can be used as a reference to guess the next result.
          </p>




          <div className="flex items-center justify-center mt-10 mb-5">
            <div className="bg-[#3F74F5] text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-3 ">
              3
            </div>
            <h2 className="text-3xl text-black">
            READING RESULTS</h2> {/* Removed mb-5 here */}
          </div>

          <p className="font-normal italic text-[#303030] text-sm leading-6">
          Understanding Display Notations & Learning to Read Results

It is recommended that you know how to read/understand results even before knowing the core concepts.
          </p>

          <p className="font-normal italic text-[#303030] text-sm mt-10 leading-6"> A Matka result is announced/released in two parts : Open & Close
          </p>

          <p className="font-normal italic text-[#303030] text-sm mt-10 leading-6">
  <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Open</span> is the First part of the result. <br></br> 
  Example of Open Result:  
  <span className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-md"> 135 - 9</span>
</p>

<p className="font-normal italic text-[#303030] text-sm mt-10 leading-6">
  <span className="bg-blue-500 text-white px-2 py-1 rounded-md">Close</span>  is the Second part of the result. <br></br> 
  Example of Close Result : 
  <span className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-md"> 389 - 0</span>
</p>

<p className="font-normal italic text-[#303030] text-sm mt-10 leading-6">The two parts (Open & Close) are arranged like<br></br>
<span className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-md"> 135 - 90 - 389</span> </p>

<p className="font-normal italic text-[#303030] text-sm  leading-6">to form "Full Result"</p>

<p className="font-normal italic text-[#303030] text-sm mt-10 leading-6">Results are displayed like this on record charts :<br></br>
Close is the Second part of the result.<br></br>
Example of Close Result : 389 - 0 <br></br>
<img className="mx-auto block" src={img1} alt="" /><br></br>

(or)


<br></br>

<span className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-md"> 135 - 90 - 389</span>
</p>

<p className="font-normal italic text-[#303030] text-sm  leading-6">( This is the format mostly seen on all live result websites )<br></br></p>

Here
<div className="space-y-3">
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">135</span> is Open Pana,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">9</span> is Open Single,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">0</span> is Close Single,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">389</span> is Close Pana,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">90</span> is Jodi,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">135 - 0</span> is Half Sangam A,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">389 - 9</span> is Half Sangam B,
    <br />
  </p>
  <p>
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">135 - 389</span> is Sangam,
    <br />
  </p>
</div>


<p className="font-normal italic text-[#303030] text-sm m-2 leading-6">You will also find some results specially displayed in Red.<br></br></p>
<img className="mx-auto block" src={img2} alt="" /><br></br>

<p className="font-normal italic text-[#303030] text-sm m-2 leading-6">Display in Red means the Jodi is Full Red or Half Red.<br></br>
Meaning that, its one of these :00,05,11,16,22,27,33,38,44,49,50,55,61,66,72,77,83,88,94,99<br></br>
Reds are explained as you read further into this page.<br></br></p>



<div className="flex items-center justify-center mt-10 mb-5">
            <div className="bg-[#3F74F5] text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-3 ">
              3
            </div>
            <h2 className="text-3xl text-black">
            VARIATIONS</h2> {/* Removed mb-5 here */}
          </div>


          <p className="font-normal italic text-[#303030] text-sm m-2 leading-6">There are 5 variations that you can play in matka. They are just different parts of same result and offer <br></br>different rates.</p>

          <div className="space-y-3">
  <p>SINGLE 
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">1 Digit</span> 
    <br />
  </p>
  <p>JODI 
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">2 Digits</span>
    <br />
  </p>
  <p>PANA 
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">3 Digits</span> 
    <br />
  </p>
  <p>HALF SANGAM 
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">5 Digits</span>
    <br />
  </p>
  <p>SANGAM 
    <span className="bg-blue-500 text-white px-2 py-1 ml-2 rounded-md">6 Digits</span>
    <br />
  </p>

  <p className="font-normal italic text-[#303030] text-sm m-2 leading-6">*There is no 5 digit variation in matka<br></br><br></br>
  *Jodi, Half Sangam and Sangam are combination games, they are formed by combining different parts of result (explained as you move further on this page)</p>

  <h4 className="text-[#516FFF]  text-lg mb-4">
  SINGLE (ANK)
          </h4>

          <p className="font-normal italic text-[#303030] text-sm m-2 leading-6">Singles, also called Ank in matka, are single digit numbers from 0 to 9. There are 10 Singles :<br></br> 1,2,3,4,5,6,7,8,9,0.<br></br>
          Note: In matka, 0 is considered greater than 9.</p>


          <span className="bg-blue-500 text-white px-2 py-1 ml-2 mt-2 rounded-md">Singles Rate : 1:9</span>

        <div className='bg-[#CCEBF3] rounded-lg'>
          <h4 className="text-black text-lg mb-4 ">
          CUT NUMBERS
          </h4>

          <p className="font-normal italic text-black text-sm m-2 leading-6">For flexibility, and to make the game interesting, singles are linked to one another as interchangeable <br></br> numbers, called Cut Numbers in matka terminology. Cut Numbers are numbers which are +5 or -5<br></br> away from each other :<br></br></p>
          <p className="font-normal italic text-black text-bold m-2 leading-6">1 & 6<br></br>
2 & 7<br></br>
3 & 8<br></br>
4 & 9<br></br>
5 & 0</p>

</div>


<h4 className="text-[#516FFF] mt-10 text-lg mb-4">
  JODI
          </h4>


          <p className="font-normal italic text-black text-sm m-2 mb-8 leading-6">Jodi's, also called Pair or Bracket in some areas, are two digit numbers from 00 to 99 (There are 100 Jodi's).</p>

          <span className="bg-blue-500 text-white px-20 py-1 ml-2 mt-8 rounded-md">LIST OF 100 JODI</span>

          <img className="mx-auto block" src={img3} alt="" /><br></br>

          </div>
        </div>
      </div>
    </>
  );
};

export default LearnMatka;
