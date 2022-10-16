const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { ctrlPackage } = require('../../helpers/');
const { schemas } = require('../../models/user');
const ctrl = require('../../controller/auth');
const router = express.Router();

router.post(
  '/signup',
  validateBody(schemas.signupSchema),
  ctrlPackage(ctrl.register)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlPackage(ctrl.login)
);
router.patch('/users', authenticate, ctrlPackage(ctrl.updateSubscription));
router.get('/current', authenticate, ctrlPackage(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlPackage(ctrl.logout));
module.exports = router;
