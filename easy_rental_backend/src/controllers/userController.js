const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

console.log(bcrypt); // Confirm bcrypt is correctly imported

// Create a new user
const createUser = async (req, res) => {
  const { email, password, displayName, photoURL, role, provider } = req.body;

  try {
    console.log('createUser called with:', req.body);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword, // Use the hashed password
      displayName,
      photoURL,
      role,
      provider,
    });

    await newUser.save(); // Save the user to the database

    // If you have a UserProfile model, save the user profile
    // const newProfile = new UserProfile({ user: newUser._id });
    // await newProfile.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err; // Handle error
        res.status(201).json({ msg: "User Registered Successfully", token, userDetails: newUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('loginUser called with:', req.body);

    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err; // Handle error
        res.json({ message: "User logged in successfully", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createUser,
  loginUser,
};
