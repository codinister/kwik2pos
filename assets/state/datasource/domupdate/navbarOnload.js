import { formatDate } from '../../../utils/DateFormats.js';
import { classSelector } from '../../../utils/Selectors.js';

const navbarOnload = (data, innerHTML, textContent) => {
  if (classSelector('expiries-box')) {
    const obj = data
      .map((v) => Object.values(v.expiries))
      .flat(2)
      .map((v) => Object.values(v))
      .flat(2);

    if (obj.length > 0) {
      //Display the number of expiring invoices
      classSelector('alert-rounded').classList.add('show');
      setTimeout(() => {
        textContent({
          classname: 'alert-rounded',
          content: obj.length,
        });
      }, 0);

      //Display expiry invoices

      const res = obj
        .map((v) => {
          return `
        <div class="expiriesbx">
        <div class="expiriesbx-details">
        <h5>${v.fullname.toUpperCase()}</h5>
        <small>
        <i class="fa fa-phone fa-lg"></i> ${v.phone}
        </small>
        <div>
        <small>
        <strong>Profile:</strong> ${v.profile}
        </small>
        </div>
        <div>
        <strong class="explabel">
        <span>Exp date:</span> 
        ${formatDate(v.exp_date)}
        </strong>
        </div>
        <div class="expbtns">
          <a href="javascript:void(0)"
            class="sendsmsmess"
            data-ss_id = "${v.ss_id}"
            data-phone = "${v.phone}"
            data-fullname = "${v.fullname}"
            data-exp_date = "${v.exp_date}"
            data-profile = "${v.profile}"
          >SEND SMS</a>
          <a href="javascript:void(0)"
          class="viewinv"
          data-cust_id = "${v.cust_id}"
          data-ss_id = "${v.ss_id}"
          data-user_id = "${v.user_id}"
          >VIEW INVOICE</a>  
        </div>
        <div class="sendsmsbx${v.ss_id}"></div>
        </div>
        </div>
    `;
        })
        .join('');

      innerHTML({
        classname: 'expiries-box',
        content: res,
      });
    }
  }
};

export default navbarOnload;
