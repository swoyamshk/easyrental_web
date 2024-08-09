import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardCard from "./components/DashboardCard/DashboardCard";
// import Navbar from "./components/Navbar/Navbar";
import Navbar from "./components/Header/Header";
import teslaImage from "./assets/img/tesla.png";
import CarCardContainer from "./components/CarCardComponent/CarCardComponent";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/SignUp/SignUp";
import RecentActivityCard from "./components/RecentActivityCard/RecentActivityCard";
import ContactUs from "./components/ContactUs/ContactUs";
import HomePage from "./components/HomePage/HomePage";
import RentForm from "./components/RentForm/RentForm";
import BrowseCars from "./components/BrowseCars/BrowseCars";
import BookForm from "./components/BookForm/BookFrom"
import BookingConfirmation from "./components/BookingConfirmation/BookingConfirmation";
function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //           <DashboardCard />
    //           <div className="flex flex-wrap justify-center p-4">
    //             <div className="flex flex-wrap justify-center gap-4 w-full lg:w-3/4">
    //               <CarCardContainer cars={cars} />
    //               <CarCardContainer cars={cars} />
    //               <CarCardContainer cars={cars} />
    //               <CarCardContainer cars={cars} />
    //             </div>
    //             <div className="w-full lg:w-1/4">
    //               <RecentActivityCard />
    //             </div>
    //           </div>
    //         </>
    //       }
    //     />
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //   </Routes>
    // </Router>
    // <CarRentalForm />
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/rent" element={<RentForm />} />
          <Route path="/browse-cars" element={<BrowseCars />} />
          <Route path="/book" element={<BookForm />} />
          <Route path="/bookingconfirmation" element={<BookingConfirmation/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
