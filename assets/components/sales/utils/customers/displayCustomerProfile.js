import { classSelector } from '../../../utils/Selectors.js';
import customerProfile from './customerProfile.js';

const displayCustomerProfile = (
  customers,
  user_id,
  usid,
  cust_id,
  invoice_exist
) => {
  if (customers) {
    const obj = customers
      .filter((v) => v.cust_id === cust_id)
      .map((v) => ({
        ...v,
        bol: user_id === usid ? true : false,
      }))[0];

    if (obj) {
      const { fullname, phone, email, location, type, debt } = obj;
      const profile = {
        fullname,
        phone,
        email,
        location,
        type,
        debt,
        cust_id,
        invoice_exist,
      };
      classSelector('top-part').innerHTML = customerProfile(profile);
    }
  }
};

export default displayCustomerProfile;
