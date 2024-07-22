import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardCard from "./components/DashboardCard/DashboardCard";
import Navbar from "./components/Navbar/Navbar";
import teslaImage from "./assets/img/tesla.png";
import CarCardContainer from "./components/CarCardComponent/CarCardComponent";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/SignUp/SignUp";
import RecentActivityCard from "./components/RecentActivityCard/RecentActivityCard";

function App() {
  const cars = [
    {
      image: teslaImage,
      name: "Tesla",
      rating: 4,
      passengers: "3+1",
      driverOption: true,
      transmission: true,
      airConditioning: true,
      fuelPolicy: true,
      meetAndGreet: true,
    },
    // Add more car objects here as needed
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashboardCard />
              <div className="flex flex-wrap justify-center p-4">
                <div className="flex flex-wrap justify-center gap-4 w-full lg:w-3/4">
                  <CarCardContainer cars={cars} />
                  <CarCardContainer cars={cars} />
                  <CarCardContainer cars={cars} />
                  <CarCardContainer cars={cars} />
                </div>
                <div className="w-full lg:w-1/4">
                  <RecentActivityCard />
                </div>
              </div>
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
