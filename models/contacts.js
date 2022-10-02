const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "./contacts.json");
const updateContacts = async (contacts) =>
	await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
	const data = await fs.readFile(contactPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const updateId = String(contactId);
	const result = contacts.find((item) => item.id === updateId);
	return result;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const updateId = String(contactId);
	const contactIndex = await contacts.findIndex((item) => item.id === updateId);
	if (contactIndex === -1) return null;
	const [result] = contacts.splice(contactIndex, 1);
	updateContacts(contacts);
	return result;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...body,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const updateId = String(contactId);
	const contactIndex = await contacts.findIndex((item) => item.id === updateId);
	if (contactIndex === -1) return null;
	contacts[contactIndex] = { id: nanoid(), ...body };
	await updateContacts(contacts);
	return contacts[contactIndex];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
