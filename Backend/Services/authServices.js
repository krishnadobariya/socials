const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    User.create(
      { username, email, password: hashedPassword },
      (err, result) => {
        if (err) return reject(err);
        resolve({ message: "User registered successfully" });
      }
    );
  });
};

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findByEmail(email, async (err, result) => {
      if (err || result.length === 0) return reject("User not found");

      const user = result[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return reject("Invalid credentials");

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      User.updateToken(user.id, token, (err) => {
        if (err) return reject("Failed to update token");
        resolve({ token: token, id: user.id, username: user.username });
      });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
