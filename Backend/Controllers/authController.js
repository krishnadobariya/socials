const authService = require('../Services/authServices');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await authService.registerUser(username, email, password);
    res.status(201).send(response);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).send(token);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
