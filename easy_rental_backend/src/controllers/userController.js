const User = require('../models/user');

// Create a new user
const createUser = async (req, res) => {
  const { email, password, displayName, photoURL, role, provider } = req.body;
  const newUser = new User({
    email: email,
    password: password,
    displayName: displayName,
    photoURL: photoURL,
    role: role,
    provider: provider,
});

  try {
    const response = await newUser.save();
    res.status(201).json({ message: "User created successfully", response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
    createUser
  };