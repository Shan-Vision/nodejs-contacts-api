const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await Jimp.read(tempUpload)
    .then(image => {
      return image.resize(250, 250).quality(100).write(tempUpload);
    })
    .catch(err => {
      throw RequestError(err.status, err.message);
    });
  const extention = originalname.split('.').pop();
  const filename = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
