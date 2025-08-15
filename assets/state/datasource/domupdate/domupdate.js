import navbarOnload from './navbarOnload.js';
import customersprofile from '../getdata/customers/customersprofile.js';
import productsprofile from '../getdata/products/productsprofile.js';
import usersprofile from '../getdata/users/usersprofile.js';
import rerender from '../../../utils/rerender.js';
import inputValidationEvent from '../../events/inputvalidation/inputValidationEvent.js';
import getLoginuser from '../../sessionstorage/GET/getLoginuser.js';
import userProfileOnload from './userProfileOnload.js';
import currentData from './currentData.js';
import innerHTML from '../../../utils/innerHTML.js';
import textContent from '../../../utils/textContent.js';
import dashboardOnload from './dashboardOnload.js';
import usersOnload from './usersOnload.js';

const domupdate = () => {
  customersprofile((customers) => {
    productsprofile((products) => {
      usersprofile((users) => {
        const us = getLoginuser('user');
        const data = currentData(customers, products, users, us?.user_id);
        navbarOnload(customers, innerHTML, textContent);
        userProfileOnload(users, us?.user_id, innerHTML);
        inputValidationEvent(data);
        dashboardOnload(customers)
        usersOnload(users)
      });
    });
  });
};

rerender(domupdate, 246);
export default domupdate;
