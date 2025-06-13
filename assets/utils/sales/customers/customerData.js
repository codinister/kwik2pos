import roleAccess from "../../roleAccess.js";

const customerData = (customer) => {
  const { user_id } = JSON.parse(sessionStorage.getItem('zsdf'));

  let customers = [];
  if (roleAccess()) {
    customers = customer;
  } else {
    customers = customer.filter((v) => v.user_id === user_id);
  }

  return customers
};

export default customerData;
