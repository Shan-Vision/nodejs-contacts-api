const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { RequstError } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequstError(401, 'Email or password are wrong');
  }
  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequstError(401, 'Email or password are wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  res.json({
    token,
  });
};

module.exports = login;
