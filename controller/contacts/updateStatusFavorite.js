const { Contact } = require('../../models/contact');

const { RequestError } = require('../../helpers');

const updateStatusFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, 'Missing');
  }
  res.status(201).json(result);
};

module.exports = updateStatusFavorite;
