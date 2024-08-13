const Rental = require('../models/rentalModel');

// Create a new rental
const createRental = async (req, res) => {
  const { user, car, rentalStart, rentalEnd, totalCost, status, pickupLocation, paymentId } = req.body;

  if (!user || !car || !rentalStart || !rentalEnd || !totalCost || !pickupLocation || !paymentId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRental = new Rental({
    user,
    car,
    rentalStart,
    rentalEnd,
    totalCost,
    status: status || 'reserved',
    pickupLocation,
    paymentId // Save the paymentId here
  });

  try {
    const savedRental = await newRental.save();
    res.status(201).json({ message: "Rental created successfully", savedRental });
  } catch (err) {
    console.error('Error creating rental:', err);
    res.status(500).json({ message: "Internal server error", err });
  }
};



// Get all rentals
const getAllRentals = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authentication middleware

    // Find rentals where the 'user' field matches the logged-in user's ID
    const rentals = await Rental.find({ user: userId }).populate('user').populate('car');

    res.status(200).json(rentals);
  } catch (err) {
    console.error("Error fetching rentals:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};


const getTotalRentals = async (req, res) => {
  try {
    const count = await Rental.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching total rentals:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Get a single rental by ID
const getRentalById = async (req, res) => {
  const { id } = req.params;
  try {
    const rental = await Rental.findById(id).populate('user').populate('car');
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json(rental);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update a rental by ID
const updateRental = async (req, res) => {
  const { id } = req.params;
  const { user, car, rentalStart, rentalEnd, totalCost, status } = req.body;

  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { user, car, rentalStart, rentalEnd, totalCost, status },
      { new: true }
    ).populate('user').populate('car');

    if (!updatedRental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json({ message: "Rental updated successfully", updatedRental });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

const cancelRental = async (req, res) => {
  const { id } = req.params; // Assuming you use the rental ID, not booking ID

  try {
    // Find the rental by ID
    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // Check if the rental is already cancelled
    if (rental.status === 'cancelled') {
      return res.status(400).json({ message: 'Rental is already cancelled' });
    }

    // Update the status to 'cancelled'
    rental.status = 'cancelled';
    await rental.save();

    res.status(200).json({ message: 'Rental cancelled successfully', rental });
  } catch (error) {
    console.error('Error cancelling rental:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a rental by ID
const deleteRental = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRental = await Rental.findByIdAndDelete(id);
    if (!deletedRental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

const getRecentActivities = async (req, res) => {
  try {
    const recentRentals = await Rental.find()
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .limit(10)
      .populate('user', 'firstName lastName') // Corrected field names
      .populate('car', 'model'); // Populating car with only 'model' field

    const activities = recentRentals.map(rental => ({
      name: `${rental.user?.firstName || 'Unknown'} ${rental.user?.lastName || 'User'}`, // Combine firstName and lastName
      status: rental.status,
      car: rental.car?.model || 'Unknown Car', // Handle cases where car data might be missing
      date: `Rented on ${new Date(rental.createdAt).toLocaleDateString()}`,
      iconBgColor: rental.status === 'ongoing' ? 'bg-primary' : 'bg-secondary',
      iconColor: rental.status === 'ongoing' ? 'text-primary-foreground' : 'text-secondary-foreground',
    }));

    res.json(activities);
  } catch (error) {
    console.error('Error fetching recent activities:', error.message);
    console.error(error); // Log the full error object for more insights
    res.status(500).json({ error: 'Failed to fetch recent activities', details: error.message });
  }
};




const getTotalRevenue = async (req, res) => {
  try {
    // Sum all totalCost fields
    const aggregateResult = await Rental.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalCost" }
        }
      }
    ]);

    const totalRevenue = aggregateResult[0] ? aggregateResult[0].totalRevenue : 0;
    res.status(200).json({ totalRevenue });
  } catch (err) {
    console.error("Error fetching total revenue:", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
  cancelRental,
  getTotalRentals,
  getTotalRevenue,
  getRecentActivities
};
