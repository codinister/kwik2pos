import { formatDate } from '../utils/DateFormats.js';
import displayToast from '../utils/displayToast.js';
import getIndustry from '../utils/getIndustry.js';
import customersprofile from '../data/serverside/fetch/customersprofile.js';

const remondexbx = () => {
  const industry = getIndustry();

  const { role_id } = JSON.parse(localStorage.getItem('zsdf'));

  customersprofile((data) => {
    const obj = data.map((v) => v.expiries).flat(2);
    const count = obj.length;

    if (industry === 'rentals' || industry === 'service provider') {
      if (count > 0) {
        document.querySelector('.alert-rounded').classList.add('show');
        setTimeout(() => {
          document.querySelector('.alert-rounded').textContent = count;
        }, 0);
      }
    }

    const res = obj
      .map((v) => {
        let smslink = '';

        if (role_id === '5' || role_id === '1' || role_id === '111') {
          smslink = `
            <a href="javascript:void(0)"
            class="sendsmsmess"
            data-prod_id = "${v.tax_id}"
            data-phone = "${v.phone}"
            data-fullname = "${v.fullname}"
            data-exp_date = "${v.exp_date}"
            data-profile = "${v.profile}"
            >SEND SMS</a>`;
        }

        return `
        <div class="expiriesbx flex gap-1">
        <div class="expiriesbx-details">
        <h3>${v.fullname.toUpperCase()}</h3>
        <small><i class="fa fa-phone fa-lg"></i> ${v.phone}</small>
        <strong class="explabel"><span>Exp date:</span> ${formatDate(
          v.exp_date
        )}</strong>

        <div class="expbtns">
        ${smslink}
        <a href="javascript:void(0)"
        class="preview-invoice"
        data-cust_id = "${v.cust_id}"
        data-tax_id = "${v.tax_id}"
        data-user_id = "${v.user_id}"
        >VIEW INVOICE</a>  
        </div>

        <div class="sendsmsbx${v.tax_id}"></div>
        </div>
        </div>
    `;
      })
      .join('');

    if (document.querySelector('.contarea')) {
      if (industry === 'rentals' || industry === 'service provider') {
        document.querySelector('.contarea').innerHTML = res;
      } else [(document.querySelector('.contarea').innerHTML = '')];
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.alert-rounded')) {
      document.querySelector('.remondexbx').classList.add('show');
    }

    if (e.target.matches('.closemainexpbox')) {
      document.querySelector('.remondexbx').classList.remove('show');
    }

    if (e.target.matches('.sendsmstoclient')) {
      e.stopImmediatePropagation();

      const { prod_id } = e.target.dataset;

      const phone = document.querySelector(`.smsinpval${prod_id}`).value;
      const mess = document.querySelector(`.smstexval${prod_id}`).value;

      e.target.textContent = 'SENDING WAIT...';

      if (!phone) {
        return displayToast('bgdanger', 'Phone field required!');
      }

      if (phone.length < 10) {
        return displayToast('bgdanger', 'Phone number must be 10 or more!');
      }

      if (!mess) {
        return displayToast('bgdanger', 'Message field required!!');
      }

      sendSMS(mess, phone, 'sendsmstoclientwrapper', 'sent');
    }

    if (e.target.matches('.closesmsbx')) {
      const { prod_id } = e.target.dataset;
      document.querySelector(`.sendsmsbx${prod_id}`).innerHTML = '';
    }

    if (e.target.matches('.sendsmsmess')) {
      const { phone, prod_id, fullname, exp_date, profile } = e.target.dataset;

      document.querySelector(`.sendsmsbx${prod_id}`).innerHTML = `
      <div class="smssbx">
      <span class="closesmsbx" data-prod_id="${prod_id}">Close</span>
      <input type="text" class="smsinpval${prod_id}" value="${
        phone ? phone : ''
      }" placeholder="Phone" />
      <textarea placeholder="Message" class="smstexval${prod_id}">Hello! ${fullname} be informed that your job (${profile}) will expire on ${formatDate(
        exp_date
      )}  </textarea>

      <div class="sendsmstoclientwrapper">
      <a href="javascript:void(0);" data-prod_id=${prod_id} class="sendsmstoclient">
       <span>SEND SMS  </span></a>
       </div>
      </div>
      `;
    }
  });

  return `
  <div class="alert-rounded"></div>
    <div class="remondexbx">
      <a href="javascript:void(0);" class="closemainexpbox">Close</a>
      <div class="remondexbxwrapper">
      <div class="bottomboxx">
      <div class="contarea">
      
      </div>
      </div>
      </div>
    </div>
  `;
};

export default remondexbx;
