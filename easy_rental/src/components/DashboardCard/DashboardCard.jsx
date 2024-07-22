// DashboardCard.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DashboardCard = () => {
  const [location, setLocation] = useState('Kupondole, Lalitpur');
  const [pickUpDate, setPickUpDate] = useState(new Date('2024-07-08'));
  const [dropOffDate, setDropOffDate] = useState(new Date('2024-07-12'));
  const [pickUpTime, setPickUpTime] = useState('10:00 AM');
  const [dropOffTime, setDropOffTime] = useState('3:00 PM');

  const times = [
    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM',
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
    '9:00 PM', '10:00 PM', '11:00 PM'
  ];

  return (
    <div className="p-8 ml-4 md:ml-52">
      <h1 className="text-2xl font-medium mb-4">Welcome Back</h1>
      <div className="block md:flex md:space-x-4 space-y-4 md:space-y-0">
        <div className="bg-gray-100 rounded-full pl-6 pt-2 shadow-md w-full md:w-56">
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-md font-normal">{location}</p>
        </div>
        <div className="bg-gray-100 rounded-full pl-6 pt-2 shadow-md w-full md:w-56">
          <p className="text-sm text-gray-500">Pick Up Date</p>
          <DatePicker
            selected={pickUpDate}
            onChange={(date) => setPickUpDate(date)}
            className="bg-gray-100 text-md font-normal border-none w-full"
          />
        </div>
        <div className="bg-gray-100 rounded-full pl-6 pt-2 shadow-md w-full md:w-56">
          <p className="text-md text-gray-500">Drop Off Date</p>
          <DatePicker
            selected={dropOffDate}
            onChange={(date) => setDropOffDate(date)}
            className="bg-gray-100 text-md font-normal border-none w-full"
          />
        </div>
        <div className="bg-gray-100 rounded-full pl-6 pt-2 shadow-md w-full md:w-40">
          <p className="text-sm text-gray-500">Pick Up Time</p>
          <select
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
            className="bg-gray-100 text-md font-normal border-none w-full"
          >
            {times.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100 rounded-full pl-6 pt-2 shadow-md w-full md:w-40">
          <p className="text-sm text-gray-500">Drop Off Time</p>
          <select
            value={dropOffTime}
            onChange={(e) => setDropOffTime(e.target.value)}
            className="bg-gray-100 text-md font-normal border-none w-full"
          >
            {times.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
