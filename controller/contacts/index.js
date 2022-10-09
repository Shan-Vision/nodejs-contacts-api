const getList = require('./getList');
const getById = require('./getById');
const add = require('./add');
const removeById = require('./removeById');
const updateById = require("./updateById");
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getList,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
};
