const { Schema, model } = require('mongoose');
const Joi = require('Joi');
const { handleSaveErrors } = require('../helpers');

const emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const status = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegEx,
      unique: true,
      required: [true, 'Set email for contact'],
    },
    password: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    subscription: {
      type: String,
      enum: status,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErrors);

const signupSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegEx).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...status)
    .required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
