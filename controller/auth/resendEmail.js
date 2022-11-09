const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;


const resendEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw RequestError(400, 'Missing required field email');
  }
  const user = await User.findOne({ email });
  
  if (user.verify) {
    throw RequestError(400, 'Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };
  await sendEmail(mail);

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resendEmail;
