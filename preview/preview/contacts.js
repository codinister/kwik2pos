
import contacts from './contacts/contacts.js'


const url = new URLSearchParams(window.location.search);

Promise.allSettled(['Contacts', 2, 3])
  .then((data) => {
    document.querySelector('.root').innerHTML = data[0].value;
  })
  .catch((err) => console.log(eerr));
