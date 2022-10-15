const express = require('express');
const { validateBody } = require('../../middlewares');
const { ctrlPackage } = require('../../helpers/');
const { schemas } = require('../../models/user');
const ctrl = require('../../controller/auth');
const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlPackage(ctrl.register)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlPackage(ctrl.login)
);
module.exports = router;
