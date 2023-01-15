const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = {id: Date.now().toString(), ...data};
    contacts.push(newContact);
    await updateContacts(contacts);
    return contacts
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
      return null
    }
    contacts.splice(index, 1)
    await updateContacts(contacts);
    return contacts
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};