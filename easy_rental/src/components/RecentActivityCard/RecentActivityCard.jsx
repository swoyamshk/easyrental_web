import React from 'react';
import teslaImage from '../../assets/img/tesla.png';
import profileImg from '../../assets/img/profile.png';


const RecentActivityCard = () => {
  return (
    <div className="hidden md:flex flex-col border border-gray-300 p-4 m-4 rounded-lg shadow-lg bg-white w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center border-b border-gray-300 pb-4 mb-2">
        <img src={teslaImage} alt="Tesla" className="w-full sm:w-48 h-auto mb-4 object-cover" />
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Tesla</h2>
          <p className="text-gray-700">2 Day Rental Going</p>
          <p className="text-gray-700">Pulchowk, Lalitpur</p>
          <p className="text-xl font-bold mt-2">$350.00</p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-2">
          <img src={profileImg} alt="Matthew Jones" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-semibold">Matthew Jones</p>
            <p className="text-gray-600">matthewyj@gmail.com</p>
          </div>
        </div>
        <div className="w-full">
          <p className="text-gray-700"><span className="font-semibold">Start Point:</span> Georgia, GG</p>
          <p className="text-gray-700"><span className="font-semibold">Stop Point:</span> St. Lawrence</p>
          <p className="text-gray-700"><span className="font-semibold">Finish Point:</span> Chicago</p>
          <p className="text-gray-700"><span className="font-semibold">Total Distance:</span> 48km</p>
          <p className="text-gray-700"><span className="font-semibold">Speed:</span> 70km/h</p>
          <p className="text-gray-700"><span className="font-semibold">Fuel:</span> 12 litres</p>
          <p className="text-gray-700"><span className="font-semibold">People Used:</span> 4 person</p>
          <p className="text-gray-700"><span className="font-semibold">Condition:</span> Average</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
