import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [totalRentals, setTotalRentals] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
          // Fetch total cars
          const carsResponse = await axios.get("http://localhost:5000/api/car/cars/total");
          setTotalCars(carsResponse.data.count);
      
          // Fetch total rentals
          const rentalsResponse = await axios.get("http://localhost:5000/api/rental/total");
          setTotalRentals(rentalsResponse.data.count);
      
          // Fetch total users
          const usersResponse = await axios.get("http://localhost:5000/api/user/totalusers");
          console.log("Users response:", usersResponse.data); // Debugging line
          setTotalUsers(usersResponse.data.totalUsers); // Update this line
      
          // Fetch total revenue
          const revenueResponse = await axios.get("http://localhost:5000/api/rental/revenue");
          setTotalRevenue(revenueResponse.data.totalRevenue);

          const activitiesResponse = await axios.get("http://localhost:5000/api/rental/activities");
          setActivities(activitiesResponse.data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      
    fetchData();
  }, []);
  console.log("Rendered totalUsers:", totalUsers);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Cars Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex-col space-y-1.5 p-6 flex items-center justify-between pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Total Cars
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <path d="M9 17h6"></path>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold">{totalCars}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </div>
          </div>
          {/* Active Rentals Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex-col space-y-1.5 p-6 flex items-center justify-between pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Active Rentals
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold">{totalRentals}</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </div>
          </div>
          {/* Revenue Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex-col space-y-1.5 p-6 flex items-center justify-between pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                Revenue
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </div>
          </div>
          {/* New Signups Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex-col space-y-1.5 p-6 flex items-center justify-between pb-2">
              <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                New Signups
              </h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">View the latest customer bookings, rentals, and returns.</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                    <div className={`${activity.iconBgColor} rounded-md flex items-center justify-center aspect-square w-12`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-6 h-6 ${activity.iconColor}`}
                      >
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <path d="M9 17h6"></path>
                        <circle cx="17" cy="17" r="2"></circle>
                      </svg>
                    </div>
                    <div className="grid flex-1 gap-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{activity.name}</div>
                        <div
                          className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                            activity.status === 'Ongoing'
                              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                              : 'text-foreground'
                          } text-xs`}
                        >
                          {activity.status}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.car} · {activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
