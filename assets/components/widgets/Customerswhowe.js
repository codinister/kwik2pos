import format_number from '../utils/format_number.js';

const Customerswhowe = (data) => {
  return `
  <div class="arrears-table-head">
  <ul>
  <li>Name</li>
  <li>Phone</li>
  <li>Amount</li>
  <ul>  
  </div>
  <div class="arrears-table-row">
    ${data
    .map(
      (v) => `
   
      <ul>
        <li>
           <a href="javascript:void(0);" class="accstatement" data-cust_id="${v.cust_id}">
        ${v.fullname}
        </a>
        
        </li>
        <li>${v.phone}</li>
        <li>${format_number(v.debt)}</li>
      </ul>
    
      `
    )
    .join(' ')}
  </div>

  `;
};

export default Customerswhowe;
