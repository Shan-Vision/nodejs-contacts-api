const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveErrors } = require('../helpers');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    isbn: {
      type: String,
      match: /^\d{3}-\d-\d{3}-\d{5}-\d$/,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
  isbn:Joi.string(),
});

const UpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  UpdateFavoriteSchema,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
