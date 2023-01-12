const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const res = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(res);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try{
    const res = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(res);
    return contacts.find(contact => contact.id === contactId);
  }
  catch (err) {
    console.error(err)
  }
}

async function removeContact(contactId) {
  try{
    const res = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(res);
    const filteredContacts = JSON.stringify(contacts.filter(contact => contact.id !== contactId));
    await fs.writeFile(contactsPath, filteredContacts)
    return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
  }
  catch (err) {
    console.error(err)
  }
}

async function addContact(name, email, phone) {
 try{
   const res = await fs.readFile(contactsPath, 'utf-8')
   let contacts = JSON.parse(res)
   const newContactsStr = JSON.stringify(contacts.concat({id: Date.now().toString(),  name, email, phone}))
   await fs.writeFile(contactsPath, newContactsStr);
   return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
 }
 catch (err) {
   console.error(err)
 }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};