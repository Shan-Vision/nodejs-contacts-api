const express = require('express');

const { ctrlPackage } = require('../../helpers/');
const ctrl = require('../../controller/contacts');

const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlPackage(ctrl.getList));

router.get('/:contactId', ctrlPackage(ctrl.getById));

router.post('/', validateBody(schemas.addSchema), ctrlPackage(ctrl.add));

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlPackage(ctrl.updateById)
);
router.patch(
  '/:contactId',
  validateBody(schemas.UpdateFavoriteSchema),
  ctrlPackage(ctrl.updateFavorite)
);
router.delete('/:contactId', ctrlPackage(ctrl.removeById));

module.exports = router;
