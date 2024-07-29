import customerlistFunc from "./customerlistFunc.js";

const listOfallcustomers = (customers) => {
  return customers
  .map((v) => {
    return customerlistFunc(v);
  })
  .join('');
}

export default listOfallcustomers