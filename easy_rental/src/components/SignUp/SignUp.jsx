import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo1-bg.png';
import bgimage from '../../assets/img/bgimage.png';

const RegisterPage = () => {
  // Define state variables for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add further form handling logic here (e.g., form validation, API requests)
  };

  return (
    <div className="flex flex-1 w-full min-h-screen">
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <img src={bgimage} alt="background-image" className='mr-10 hidden md:block'/>
        <div className="w-full max-w-md text-center bg-white p-5 md:p-10 rounded-lg shadow-lg">
          <div className="w-24 mb-5 mx-auto">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="mt-5 text-2xl text-gray-800">Welcome</h2>
          <p className="my-2 text-gray-600">Create A New Account</p>
          <form id="registerForm" method="post" onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="flex flex-col md:flex-row w-full space-y-3 md:space-y-0 md:space-x-3">
              <div className="w-full md:w-1/2">
                <label htmlFor="firstName" className="self-start my-1 text-sm text-gray-800">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                  placeholder="John"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="lastName" className="self-start my-1 text-sm text-gray-800">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
                  placeholder="Doe"
                />
              </div>
            </div>
            <label htmlFor="email" className="self-start my-1 text-sm text-gray-800">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
              placeholder="example.email@gmail.com"
            />

            <label htmlFor="password" className="self-start my-1 text-sm text-gray-800">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
              placeholder="At least 8+ characters"
            />

            <label htmlFor="confirmPassword" className="self-start my-1 text-sm text-gray-800">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
            />

            <button type="submit" className="w-full p-3 my-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800">Sign-up</button>
          </form>
          <div className="mt-3 text-sm">
            <p>Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link></p>
          </div>
          <hr className="my-5" />
          <div className="mt-3">
            <button id="google-signin-button" className="flex items-center justify-center w-full p-3 mt-3 border border-gray-300 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100">
              {/* <img src={googleLogo} alt="Google logo" className="w-5 h-5 mr-2" /> */}
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
