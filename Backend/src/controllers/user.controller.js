const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// GET all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Failed to fetch users." });
//   }
// };

// CREATE a user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password, gender, phoneNumber } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
    });

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error creating user:", error);

    // Sequelize unique-constraint violation
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "An account with that email already exists." });
    }
    // validation for (isEmail, regex)
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ message: "Signup failed. Please try again." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const { password: _omit, ...safeUser } = user.toJSON();

    res.status(200).json({
      message: "Login successful.",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// // UPDATE a user
// const updateUser = async (req, res) => {
//   try {
//     await User.update(req.body, { where: { id: req.params.id } });
//     res.json({ message: 'Updated!' });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'Update failed.' });
//   }
// };

// // DELETE a user
// const deleteUser = async (req, res) => {
//   try {
//     await User.destroy({ where: { id: req.params.id } });
//     res.json({ message: 'Deleted!' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Delete failed.' });
//   }
// };

module.exports = { createUser, loginUser };
