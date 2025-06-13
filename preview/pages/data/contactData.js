import contacts from '../contacts/contacts.js';

const contactData = (settings, customers) => {
  const obj = {
    settings,
    customers,
  };

  document.querySelector('.contentroot').innerHTML = contacts(obj);
};

export default contactData;
