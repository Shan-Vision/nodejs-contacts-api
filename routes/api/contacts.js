const express = require("express");

const { ctrlPackage } = require("../../helpers/");
const ctrl = require("../../controller/contacts");

const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", ctrlPackage(ctrl.getList));

router.get("/:contactId", ctrlPackage(ctrl.getById));

router.post("/", validateBody(schema.addSchema), ctrlPackage(ctrl.add));

router.put(
	"/:contactId",
	validateBody(schema.addSchema),
	ctrlPackage(ctrl.updateById)
);

router.delete(
	"/:contactId",

	ctrlPackage(ctrl.removeById)
);

module.exports = router;
