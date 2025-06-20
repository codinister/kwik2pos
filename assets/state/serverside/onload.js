import navbarOnload from './onload/navbarOnload.js';
import customersprofile from './read/customers/customersprofile.js';
import productsprofile from './read/products/productsprofile.js';
import usersprofile from './read/users/usersprofile.js';
import rerender from '../../utils/rerender.js';
import inputValidationEvent from '../events/inputvalidation/inputValidationEvent.js';
import getLoginuser from '../statemanagement/sessionstorage/GET/getLoginuser.js';
import userProfileOnload from './onload/userProfileOnload.js';
import currentData from './onload/currentData.js';

const onload = () => {
  customersprofile((customers) => {
    productsprofile((products) => {
      usersprofile((users) => {
        const { user_id } = getLoginuser('user');
        navbarOnload(customers);
        userProfileOnload(users, user_id);
        inputValidationEvent(currentData(customers, products, users, user_id));
      });
    });
  });
};

rerender(onload, 246);
export default onload;
