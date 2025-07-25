const allCustomers = (data) => {
  return Object.values(data).reduce((a, b) => {
    a[b.cust_id] = b;
    return a;
  }, {});
};

export default allCustomers;
