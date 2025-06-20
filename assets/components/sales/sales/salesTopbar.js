import viewcustomers from './viewCustomers.js';
import addCustomer from './addCustomer.js';
import { textInput } from '../../../utils/InputFields.js';
import { classSelector } from '../../../utils/Selectors.js';
import dataListDropdown from '../../../utils/dataListDropdown.js';
import salesSessionStorage from '../../../state/statemanagement/sessionstorage/default/defaultSalesSessionStorage.js';
import displayProductList from '../../../utils/sales/displayProductList.js';
import { ymd } from '../../../utils/DateFormats.js';
import updateTaxsessionstorage from '../../../utils/sales/updateTaxsessionstorage.js';
import getPrevilleges from '../../../utils/sales/getPrevilleges.js';
import usersprofile from '../../../state/serverside/read/users/usersprofile.js';
import deleteAccessControl from '../../../utils/sales/deleteAccessControl.js';
import roleAccess from '../../../utils/roleAccess.js';
import getLoginuser from '../../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const salesTopbar = (customersDatas, receipts, proforma, invoice) => {
  usersprofile((data) => {
    const users = data.map((v) => ({
      user_id: v.user_id,
      fullname: v.firstname + ' ' + v.lastname,
    }));

    document.addEventListener('click', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        if (users) {
          const usersdata = users
            .slice(0, 10)
            .map((v) => usersIteratorFunc(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }
    });

    document.addEventListener('keyup', (e) => {

      
      if (e.target.matches('.userwrapperinpt')) {
        const val = e.target.value;
        if (users) {
          const usersdata = users
            .filter((v) =>
              Object.values(v)
                .join('')
                .toLowerCase()
                .includes(val.toLowerCase())
            )
            .slice(0, 10)
            .map((v) => usersIteratorFunc(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata;
        }
      }
    });
  });


  const { user_id } = getLoginuser('user')

  let customersData = [];

  if (roleAccess()) {
    customersData = customersDatas;
  } else {
    customersData = customersDatas.filter((v) => v.user_id === user_id);
  }

  document.addEventListener('change', (e) => {
    if (e.target.matches('.invoice_date')) {
      e.preventDefault();

      if (classSelector('invoice_date')) {
        const value = classSelector('invoice_date').value;
        updateTaxsessionstorage('invoice_date', value);
      }
    }
  });

  const customerIteratorFunc = (v) => {
    return `
      <li>
      <a href="javascript:void(0);" 
      class="customerlink" 
      data-name="${v.fullname}"
      data-phone="${v.phone}"
      data-location="${v.location}"
      data-email="${v.email}"
      data-id="${v.cust_id}"
      data-funds="${v.funds}"
      >
      ${v.fullname}
      </a>
      </li>
    `;
  };

  const mobileCustomerIteratorFunc = (v) => {
    return `

    <div class="cust-list-box">


    <div class="custfullnamebx">
      <a href="javascript:void(0);" 
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      data-phone = "${v.phone}"
      data-email = "${v.email}"
      data-ref_type = "${v.ref_type}"
      data-location = "${v.location}"
      data-description = "${v.description}"
      data-type = "${v.type}"
      data-desc="customer"
      data-user_id = "${v.user_id}"
      class="mobile-customerlink" title= "Assigned to: ${v.firstname} ${
      v.lastname
    }">
      ${v.fullname}
      </a>
    </div>


    <div>

    <a href="javascript:void(0);">
    <i class="fa fa-pencil editcust"
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      data-phone = "${v.phone}"
      data-email = "${v.email}"
          data-type = "${v.type}"
      data-ref_type = "${v.ref_type}"
      data-location = "${v.location}"
      data-debt = "${v.debt}"
    ></i>
    </a>


    <a href="javascript:void(0);">
    ${deleteAccessControl(
      `<i class="fa fa-trash delt-cust"  
      data-cust_id="${v.cust_id}" 
      data-fullname = "${v.fullname}"
      ></i>`
    )}
    </a>
    
    </div>
  
  
  </div>
  
  
  `;
  };

  const usersIteratorFunc = (v) => {
    return `
      <td>
      <a href="javascript:void(0);" 
      class="userlink" 
      data-fullname="${v.fullname}"
      data-user_id="${v.user_id}"
      >
      ${v.fullname}
      </a>
      </td>
    `;
  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.customerinptclass')) {
      const val = e.target.value;
      if (customersData) {
        const searchres = customersData
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.mobile-customerinptclass')) {
      const val = e.target.value;
      if (customersData) {
        const searchres = customersData
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => mobileCustomerIteratorFunc(v))
          .join('');
        classSelector('mobile-customerwrapper').innerHTML = searchres;
      }
    }
  });

  //ADD EMPRTY ROWS
  document.addEventListener('click', (e) => {
    if (e.target.matches('.customerinptclass')) {
      if (customersData) {
        const searchres = customersData
          .filter((v) => v.type === 'customer')
          .slice(0, 10)
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.mobile-customerinptclass')) {
      if (customersData) {
        const searchres = customersData
          .filter((v) => v.type === 'customer')
          .slice(0, 10)
          .map((v) => mobileCustomerIteratorFunc(v))
          .join('');
        classSelector('mobile-customerwrapper').innerHTML = searchres;
      }
    }

    if (e.target.matches('.addrows')) {
      e.stopImmediatePropagation();
      salesSessionStorage();

      let getItem;
      if (sessionStorage.getItem('prozdlist')) {
        getItem = JSON.parse(sessionStorage.getItem('prozdlist'));
      } else {
        getItem = [{}];
      }

      const listItems = [
        ...getItem,
        {
          s_id: '',
          qty: '1',
          prod_id: '',
          prod_name: '',
          duration: '',
          prod_size: '',
          prod_price: '',
          total: 0,
          exp_date: '',
        },
      ];

      if (classSelector('pos-sales-output')) {
        sessionStorage.setItem('prozdlist', JSON.stringify(listItems));
        classSelector('pos-sales-output').innerHTML = displayProductList();
      }

      if (sessionStorage.getItem('sales')) {
        const tx = JSON.parse(sessionStorage.getItem('sales'));

        if (tx['invoice_date'].length < 1) {
          const date = new Date();
          const value = ymd(date);
          tx['invoice_date'] = value;
          tx['receipt_date'] = value;
          sessionStorage.setItem('sales', JSON.stringify(tx));
        }
      }
    }
  });

  const showbtn = getPrevilleges('addrowsbutton') ? 'show' : 'hide';
  const assigntovalid = getPrevilleges('assignto');

  const assignto = assigntovalid
    ? `
      ${dataListDropdown(
        textInput,
        'userwrapperinpt',
        'Assign to',
        '',
        'userlink',
        'userwrapper'
      )}
  
  `
    : '';

  const endDate = `
  ${textInput({
    type: 'date',
    classname: 'end_date',
    required: false,
    label: 'Duration end date',
  })}
  <div class="top_total_wrapper">
  <span>Total:</span> <div class="top_total"></div>
  </div>
  
  `;

  setTimeout(() => {
    if (classSelector('invoice_date')) {
      classSelector('invoice_date').valueAsDate = new Date();
    }
  }, 0);

  return `
    <div class="salesTopbar">


    <div>
    <div>
    ${dataListDropdown(
      textInput,
      'customerinptclass',
      'Choose Customer',
      '',
      'customerlink',
      'customerwrapper'
    )}
    </div>
    <div class="flex custbtns">
      ${addCustomer(customersData)}
      ${viewcustomers(customersData, receipts, proforma, invoice)}
    </div>
    </div>

    <div>
    <div class="assignto-wrapper">
    ${assignto}
    </div>
    </div>




    <div class="addrowbtn">
      
      ${textInput({
        type: 'date',
        classname: 'invoice_date',
        required: true,
        label: 'Invoice Date',
      })}
   
      <a href="javascript:void(0);" class="addrows ${showbtn}">Add empty rows</a>
      
    </div>

    </div>
    `;
};

export default salesTopbar;
