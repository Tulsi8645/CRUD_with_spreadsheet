const authModel = require("../models/authModel");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await authModel.registerUser(username, password);
    res.send('Registration successful! <a href="/login">Login here</a>');
  } catch (error) {
    console.error("Error occurred while processing registration:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const isAuthenticated = await authModel.authenticateUser(
      username,
      password
    );
    if (isAuthenticated) {
      res.send("Login successful!");
    } else {
      res.send("Invalid username or password.");
    }
  } catch (error) {
    console.error("Error occurred while processing login:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
};
