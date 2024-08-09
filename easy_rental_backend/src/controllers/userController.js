const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserProfile = require("../models/userProfileModel");
dotenv.config();

// User registration
const createUser = async (req, res) => {
  const { email, password, firstName, lastName, role, provider } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      email,
      password,
      firstName,
      lastName,
      role,
      provider,
    });

    await user.save();

    // Create profile for the new user
    const newProfile = new UserProfile({ user: user._id });
    await newProfile.save();

    // do this if you want to redirect to dashboard after registration
    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // console.log(payload);

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token});
    //   }
    // );

    res.status(201).json({
      msg: "User registered successfully",
      user: user,
      userProfile: newProfile,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: err.message });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "user logged in successfully",
          token: `Bearer ${token}`,
          user: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single user by ID
const getUserbyId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUser = async (req, res) => {
  const {firstName,lastName, role, provider } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // user.displayName = displayName || user.displayName;
    user.role = role || user.role;
    user.provider = provider || user.provider;

    await user.save();

    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await UserProfile.findOneAndDelete({ user: req.params.id });

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
  getUserbyId,
  getUser,
};
