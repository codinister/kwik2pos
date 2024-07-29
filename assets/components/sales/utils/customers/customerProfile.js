const customerProfile = ({ ...obj }) => {

  document.addEventListener('change', (e) => {
    if (e.target.matches('.updatecust')) {
      const { name, value } = e.target;
      const customerinfo = JSON.parse(localStorage.getItem('custinfo'));
      const obj = { ...customerinfo, [name]: value };
      localStorage.setItem('custinfo', JSON.stringify(obj));
    }
  });



  const {
    fullname = '',
    phone = '',
    email = '',
    location = '',
    type = '',
    debt = '',
    editing = false,
    cust_id = '',
    invoice_exist = false
  } = obj;


  const fullname_row = editing
    ? `<input type="text" class="updatecust" name="fullname" value="${fullname}" />`
    : fullname;

  const phone_row = editing
    ? `<input type="text" class="updatecust" name="phone" value="${phone}" />`
    : phone;

  const email_row = editing
    ? `<input type="text"  class="updatecust" name="email" value="${email}" />`
    : email;

  const location_row = editing
    ? `<input type="text"  class="updatecust" name="location" value="${location}" />`
    : location;

  const debt_row = debt ? debt : '';

  const referrer_type =
    type === 'customer'
      ? ''
      : `<span>Referrer type:</span><span>${
          editing
            ? `<select>   
          <option>Customer</option>
          <option>Friend</option>
          <option>Family</option>
          <option>Agent</option>
          <option>Other</option>
          </select>`
            : type
        }</span><span></span>`;

  return `
  <div> 
    <ul>
    <li class="cutomname">
    <span>Fullname:</span><span>${fullname_row}</span>      
    <span>
    ${
      invoice_exist
        ? `<button class="acc-statement" data-cust_id="${cust_id}">View Account Statement</button>`
        : ''
    }
    </span>
    </li>
    <li>
    <span>Phone:</span><span>${phone_row}</span><span></span>
    </li>
    <li>
    <span>Email:</span><span>${email_row}</span><span>
      
    </span>
    </li>
    <li>
    <span>Location:</span><span>${location_row}</span><span class="save-cust-btn">
      ${editing ? `<button class="save-customer">Save customer</button> ` : ''}
    </li>
    <li>
      ${referrer_type}
    </li>
    <li class="debt-box">
      <span>Total debt:</span><span>${debt_row}</span>
      <span></span>
    </li>
    </ul>
    </div>
  `;
};

export default customerProfile;
