const express = require('express');
const { ctrlPackage } = require('../../helpers/');
const ctrl = require('../../controller/contacts');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const router = express.Router();

router.get('/', authenticate, ctrlPackage(ctrl.getList));

router.get('/:contactId', authenticate, ctrlPackage(ctrl.getById));

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlPackage(ctrl.add)
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlPackage(ctrl.updateById)
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.UpdateStatusSchema),
  ctrlPackage(ctrl.updateStatusFavorite)
);

router.delete('/:contactId', authenticate, ctrlPackage(ctrl.removeById));

module.exports = router;
