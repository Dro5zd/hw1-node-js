const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
// let contacts = [];

async function listContacts() {
  try {
    const res = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(res);
    console.log(contacts);
  } catch (err) {
    console.error(err);
  }
}


async function getContactById(contactId) {
  try{
    const res = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(res);
    const user = contacts.find(contact => contact.id === contactId);
    console.log(user);
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
    const newArr = await fs.writeFile(contactsPath, filteredContacts)
    console.log(newArr);
  }
  catch (err) {
    console.error(err)
  }
}

async function addContact(name, email, phone) {
 try{
   const res = await fs.readFile(contactsPath, 'utf-8')
   const contactsArr = JSON.parse(res)
   const newContactsStr = JSON.stringify(contactsArr.concat({id: Date.now(),  name, email, phone}))
   const newContactsArr = await fs.writeFile(contactsPath, newContactsStr)
   console.log(newContactsArr);
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