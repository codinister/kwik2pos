import viewcustomers from './viewCustomers.js';
import addCustomer from './addCustomer.js';
import { textInput } from '../../utils/InputFields.js';
import { classSelector } from '../../utils/Selectors.js';
import dataListDropdown from '../../utils/dataListDropdown.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import displayProductList from '../utils/displayProductList.js';
import getIndustry from '../../utils/getIndustry.js';
import { ymd } from '../../utils/DateFormats.js';
import updateTaxlocalstorage from '../utils/updateTaxlocalstorage.js';
import getPrevilleges from '../utils/getPrevilleges.js';
import usersprofile from '../../data/serverside/fetch/usersprofile.js';

const salesTopbar = (customersDatas, receipts, proforma, invoice) => {
  usersprofile((data) => {
    const users = data.map((v) => ({
      user_id: v.user_id,
      fullname: v.firstname + ' ' + v.lastname,
    }));

    document.addEventListener('click', (e) => {
      if (e.target.matches('.userwrapperinpt')) {
        if (users) {
          const usersdata = users.map((v) => usersIteratorFunc(v)).join('');
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
              Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
            )
            .map((v) => usersIteratorFunc(v))
            .join('');
          classSelector('userwrapper').innerHTML = usersdata
        }
      }
    });




  });

  const industry = getIndustry();
  const { role_id, user_id } = JSON.parse(localStorage.getItem('zsdf'));

  let customersData = [];

  if (role_id === '111' || role_id === '1' || role_id === '5') {
    customersData = customersDatas;
  } else {
    customersData = customersDatas.filter((v) => v.user_id === user_id);
  }

  document.addEventListener('change', (e) => {
    if (e.target.matches('.invoice_date')) {
      e.preventDefault();

      if (classSelector('invoice_date')) {
        const value = classSelector('invoice_date').value;
        updateTaxlocalstorage('invoice_date', value);
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







  

  const usersIteratorFunc = (v) => {

      return `
      <li>
      <a href="javascript:void(0);" 
      class="userlink" 
      data-fullname="${v.fullname}"
      data-user_id="${v.user_id}"
      >
      ${v.fullname}
      </a>
      </li>
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
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }
  });

  //ADD EMPRTY ROWS
  document.addEventListener('click', (e) => {
    if (e.target.matches('.customerinptclass')) {
      if (customersData) {
        const searchres = customersData.filter((v) => v.type === 'customer')
          .map((v) => customerIteratorFunc(v))
          .join('');
        classSelector('customerwrapper').innerHTML = searchres;
      }
    }




    
    if (e.target.matches('.addrows')) {

      e.stopImmediatePropagation();
      salesLocalstorage();

      let getItem;
      if (localStorage.getItem('prozdlist')) {
        getItem = JSON.parse(localStorage.getItem('prozdlist'));
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
          prod_size: '',
          prod_price: '',
          total: 0,
          exp_date: '',
        },
      ];

      if (classSelector('pos-sales-output')) {
        localStorage.setItem('prozdlist', JSON.stringify(listItems));
        classSelector('pos-sales-output').innerHTML = displayProductList();
      }

      if (localStorage.getItem('sales')) {
        const tx = JSON.parse(localStorage.getItem('sales'));

        if (tx['invoice_date'].length < 1) {
          const date = new Date();
          const value = ymd(date);
          tx['invoice_date'] = value;
          tx['receipt_date'] = value;
          localStorage.setItem('sales', JSON.stringify(tx));
        }
      }
    }








  });

  const showbtn = getPrevilleges('addrowsbutton') ? 'show' : 'hide';

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
    <div>
    ${dataListDropdown(
      textInput,
      'userwrapperinpt',
      'Assign to',
      '',
      'userlink',
      'userwrapper'
    )}
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
