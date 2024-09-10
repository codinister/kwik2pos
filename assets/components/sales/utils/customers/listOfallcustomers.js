import customerlistFunc from "./customerlistFunc.js";

const listOfallcustomers = (customers,desc) => {
  return customers
  .map((v) => {
    return customerlistFunc(v,desc);
  })
  .join('');
}

export default listOfallcustomers