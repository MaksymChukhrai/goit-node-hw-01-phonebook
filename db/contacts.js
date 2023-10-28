const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.find((c) => c.id === contactId);
  if (!removedContact) {
    return null;
  }
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  console.log({ __dirname });
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(), // Генерируем уникальный идентификатор (может быть другой способ, если у вас есть иной механизм)
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
