import displayToast from '../../utils/displayToast.js';
import salesLocalstorage from '../../data/clientside/localstorage/default/defaultSalesLocalstorage.js';
import Buttons from '../../utils/Buttons.js';
import { classSelector } from '../../utils/Selectors.js';
import { textInput } from '../../utils/InputFields.js';
import dataListDropdown from '../../utils/dataListDropdown.js';
import getIndustry from '../../utils/getIndustry.js';
import Spinner from '../../utils/Spinner.js';

const addCustomer = (customersData) => {
  const referrerIteratorFunc = (v) => {

    return `
      <li>
      <a href="javascript:void(0);" 
      class="refererlink" 
      data-name="${v.fullname}"
      data-phone="${v.phone}"
      data-location="${v.location}"
      data-email="${v.email}"
      data-funds="${v.funds}"
      data-ref_type="${v.ref_type}"
      >
      ${v.fullname}
      </a>
      </li>
    `;
  };

  document.addEventListener('input', (e) => {
    if (e.target.matches('.custinp')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('custinp'))
        localStorage.setItem(
          'custinp',
          JSON.stringify({
            cemail: '',
            cfullname: '',
            clocation: '',
            cphone: '',

            custname: '',
            ref_type: 'Customer',
            rphone: '',
          })
        );
      const getobj = JSON.parse(localStorage.getItem('custinp'));
      const newobj = { ...getobj, [name]: value };
      localStorage.setItem('custinp', JSON.stringify(newobj));
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.referrerinptclass')) {
      const val = e.target.value;

      const reffererData = Object.values(customersData).filter(
        (v) => v.type === 'referrer'
      );

      const searchres = Object.values(reffererData)
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
        )
        .map((v) => referrerIteratorFunc(v))
        .join('');
      classSelector('referrerwrapper').innerHTML = searchres;
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.referrerinptclass')) {
      const val = e.target.value;

      const reffererData = Object.values(customersData).filter(
        (v) => v.type === 'referrer'
      );

      const searchres = Object.values(reffererData)
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
        )
        .map((v) => referrerIteratorFunc(v))
        .join('');
      classSelector('referrerwrapper').innerHTML = searchres;
    }

    if (e.target.matches('.refererlink')) {
      const { phone, ref_type } = e.target.dataset;
      classSelector('rphone').value = phone;
      classSelector('ref_type').value = ref_type;

      if (!localStorage.getItem('custinp'))
        localStorage.setItem(
          'custinp',
          JSON.stringify({
            cemail: '',
            cfullname: '',
            clocation: '',
            cphone: '',
            custname: '',
            ref_type: 'Customer',
            rphone: '',
          })
        );
      const getobj = JSON.parse(localStorage.getItem('custinp'));
      const newobj = {
        ...getobj,
        [phone]: phone,
        [ref_type]: ref_type,
      };
      localStorage.setItem('custinp', JSON.stringify(newobj));
    }

    if (e.target.matches('.referrercheckbox')) {
      if (e.target.checked) {
        classSelector('referrerboxwrapper').classList.add('show');
      } else {
        classSelector('referrerboxwrapper').classList.remove('show');
      }
    }

    if (e.target.matches('.savecustomer')) {
      e.stopImmediatePropagation();
      salesLocalstorage();

      const data = JSON.parse(localStorage.getItem('custinp'));

      const obj = data ? data : {};

      const val = Object.entries(obj).map(([k, v]) => {
        return v;
      });

      if (val < 2) {
        return displayToast('bgdanger', 'Fullname field required!');
      }

      Spinner('savecustomerspin');

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));
      fetch(`router.php?controller=customer&task=add_customer`, {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
            classSelector('savecustomerspin').innerHTML = '';
          } else {
            let res;
            if (data) {
              res = data.split('-');
            }

            const info = res[0];
            const cust_id = res[1];

            const txx = JSON.parse(localStorage.getItem('taxes'));
            txx['cust_id'] = cust_id;
            txx['cust_name'] = obj?.cfullname;
             txx['cust_phone'] = obj?.cphone;
             txx['cust_email'] = obj?.cemail;
            // txx['cust_location'] = obj?.clocation;
            localStorage.setItem('taxes', JSON.stringify(txx));

            displayToast('lightgreen', info);
            classSelector('modalboxtwo').classList.remove('show');
            document.body.style.overflow = 'scroll';
            classSelector('customerinptclass').value = obj?.cfullname;
            classSelector('savecustomerspin').innerHTML = '';

            localStorage.setItem('rend', 3);
            localStorage.removeItem('custinp');
          }
        });
    }

    if (e.target.matches('.addcustomers')) {
      e.stopImmediatePropagation();

      const industry = getIndustry();

      Spinner('addcustomersspin');

      const refoptRoofing = `
        <option>Agent</option>
        <option>Carpenter</option>
        <option>Foreman</option>
        <option>Friend</option>
        <option>Family</option>
        <option>Other</option>
      `;

      const refoptOther = `
        <option>Customer</option>
        <option>Friend</option>
        <option>Family</option>
        <option>Agent</option>
        <option>Other</option>
      `;

      const referrer_options =
        industry === 'roofing company' ? refoptRoofing : refoptOther;

      classSelector('addcustomerwrapper').innerHTML = `
      <h2>Add New Customer</h2>
      <div class="customer-flex-bx">
        ${textInput({
          type: 'text',
          classname: 'cfullname custinp',
          name: 'cfullname',
          required: true,
          label: 'Fullname',
        })}
      ${textInput({
        type: 'text',
        classname: 'cphone custinp',
        name: 'cphone',
        required: false,
        label: 'Phone',
      })}
      </div>
      <div class="customer-flex-bx">
      ${textInput({
        type: 'text',
        classname: 'clocation  custinp',
        name: 'clocation',
        required: false,
        label: 'Location',
      })}

    ${textInput({
      type: 'text',
      classname: 'cemail  custinp',
      name: 'cemail',
      required: false,
      label: 'Email',
    })}
    </div>

    <div class="referrerboxwrapper">
    <div class="referrer-box">
    <h5>Referrer Details</h5>
    ${dataListDropdown(
      textInput,
      'referrerinptclass  custinp',
      'Referrer Name',
      'referrerhiddeninpt',
      'refererlink',
      'referrerwrapper'
    )}

    ${textInput({
      type: 'text',
      classname: 'rphone  custinp',
      name: 'rphone',
      required: true,
      label: 'Referrer Phone',
    })}
    <div class="selectinpt">	
      <select class="ref_type custinp"  name="ref_type" value="">

        ${referrer_options}

      </select>
    </div>


    </div>
    </div>

    <div class="customerbtndiv">
      ${Buttons([
        {
          btnclass: 'savecustomer',
          btnname: 'SAVE CUSTOMER',
        },
      ])}

      <div>
      <label>Add Referer <input type="checkbox" class="referrercheckbox" /></label>
      </div>
      </div>
      `;

      classSelector('modalboxtwo').classList.add('show');
      document.body.style.overflow = 'hidden';
      classSelector('addcustomersspin').innerHTML = '';
    }
  });

  return `
${Buttons([
  {
    btnclass: 'addcustomers',
    btnname: 'ADD CUSTOMER',
  },
])}
`;
};

export default addCustomer;
