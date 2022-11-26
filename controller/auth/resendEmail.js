const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }
  const verificationLink = `${BASE_URL}/api/users/verify/${user.verificationToken}`;

  await sendEmail(email, verificationLink);
  res.json({ message: 'Verification email sent' });
};

module.exports = resendEmail;
