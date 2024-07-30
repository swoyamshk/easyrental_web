const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (req, res) => {
  const { email, password, displayName, photoURL, role, provider } = req.body;

  try {
    console.log('createUser called with:', req.body);

    // Check if user already exists
    let user = await User.findOne({ email });
    console.log('User findOne result:', user); // Log the result
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed password:', hashedPassword);

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
    console.log('User saved:', newUser);

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('loginUser called with:', req.body);

    // Find the user by email
    let user = await User.findOne({ email });
    console.log('User findOne result:', user); // Log the result
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('User found:', user);

    // Log plain text password and hashed password
    console.log('Plain text password:', password);
    console.log('Hashed password:', user.password);

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

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


const plainTextPassword = 'swoyam';
const hashedPassword = '$2a$10$DV46Rg14wXixykRnI0iA5.9AgIVVpRFx8plOLjRGMSuVpWuZh0UBu';

bcrypt.compare(plainTextPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Password match:', isMatch);
  }
});

module.exports = {
  createUser,
  loginUser,
};
