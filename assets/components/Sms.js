import Modalboxnoreload from './utils/Modalboxnoreload.js';
import { classSelector } from './utils/Selectors.js';
import Table from './utils/Table.js';
import searchBox from './utils/searchBox.js';
import displayToast from './utils/displayToast.js';
import smsStatusCodes from './sms/smsStatusCodes.js';
import Layout from './Layout.js';
import Spinner from './utils/Spinner.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import smsBalance from './data/api/sms/smsBalance.js';
import sendSMS from './data/api/sms/sendSMS.js';

const Sms = () => {
  setTimeout(() => {
    smsBalance('smsrembalance');
  }, 0);

  document.addEventListener('input', (e) => {
    if (e.target.matches('.smsinpt')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('smsinpt')) {
        localStorage.setItem('smsinpt', JSON.stringify({}));
      }

      const obj = JSON.parse(localStorage.getItem('smsinpt'));

      let res = {};
      if (name === 'contacts') {
        //Remove country code
        if (value.startsWith('+')) {
          displayToast('bgdanger', 'remove country code');
          classSelector('contbx').value = '';
          classSelector('sendsmswrapper').innerHTML = '';
          return;
        }

        const splt = value.includes(',');

        if (!splt) {
          if (value.length >= 10) {
            const sp = value.split(',')[1] || '';

            if (sp.length < 1) {
              const trm = value.split(' ').join('');

              if (trm.length > 10) {
                displayToast('bgdanger', 'Phone number must be 10 digits');
                classSelector('contbx').value = '';
                classSelector('sendsmswrapper').innerHTML = '';
                obj.contacts = [];

                localStorage.setItem('smsinpt', JSON.stringify(obj));

                return;
              }

              if (trm.length === 10) {
                res = { ...obj, [name]: [trm] };
              }
            }
          } else {
            res = { ...obj, [name]: [] };
          }
        } else {
          const splt = value.split(',')[1] || '';
          if (splt.length < 1) {
            res = { ...obj, [name]: [...splt[0]] };
          } else {
            let arr = [];
            let invCont = [];
            const spt = value.split(',').forEach((v) => {
              const trm = v.split(' ').join('');
              if (trm.length === 10) {
                arr.push(trm);
              }
            });
            res = { ...obj, [name]: [...arr] };
          }
        }
      } else {
        res = { ...obj, [name]: value };

        const tot = value.length;

        const per = Math.floor(Number(tot) / 160) + 1;

        classSelector('perreceipient').textContent = per;
        classSelector('totalcharentered').textContent = value.length;
      }

      localStorage.setItem('smsinpt', JSON.stringify(res));

      if (res.contacts.length > 0 && res.message.length > 0) {
        classSelector(
          'sendsmswrapper'
        ).innerHTML = `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE</a>`;
      } else {
        classSelector('sendsmswrapper').innerHTML = '';
      }
    }
  });

  customersprofile((data) => {
    const divcolmFunc = (v) => `
    <tr class="smsdispflex">
        <td>
        <input type="checkbox" data-phone="${v.phone}" class="csms" />
        </td>
        <td>${v.fullname}</td>
        <td>${v.phone}</td>
    </tr>`;

    const get_only_customers_withphone = data.filter((v) => {
      if (v.phone) return v;
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.sendsms')) {
        const obj = JSON.parse(localStorage.getItem('smsinpt'));

        const msg = obj?.message;
        const cont = obj?.contacts.toString();

        sendSMS(
          msg,
          cont,
          'sendsmswrapper',
          `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE</a>`
        );
      }

      if (e.target.matches('.smscheckall')) {
        const selctall = Array.from(document.querySelectorAll('.csms'));
        if (e.target.checked) {
          selctall.forEach((v) => (v.checked = true));
        } else {
          selctall.forEach((v) => (v.checked = false));
        }
      }

      if (e.target.matches('.addsmsconts')) {
        Spinner('addsmscontsspin');
        const selctall = Array.from(
          document.querySelectorAll('.csms'),
          (v) => v.checked && v.dataset.phone.split(' ').join('')
        )
          .filter(Boolean)
          .join(',');

        classSelector('contbx').value = selctall;

        if (!localStorage.getItem('smsinpt')) {
          localStorage.setItem('smsinpt', JSON.stringify({}));
        }

        const obj = JSON.parse(localStorage.getItem('smsinpt'));

        const bj = { ...obj, contacts: [selctall] };

        localStorage.setItem('smsinpt', JSON.stringify(bj));

        const res = JSON.parse(localStorage.getItem('smsinpt'));

        if (res?.contacts?.length > 0 && res?.message?.length > 0) {
          classSelector(
            'sendsmswrapper'
          ).innerHTML = `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE</a>`;
        } else {
          classSelector('sendsmswrapper').innerHTML = '';
        }

        classSelector('noreload').classList.remove('show');
        document.body.style.overflow = 'scroll';
      }

      if (e.target.matches('.addexistingcont')) {
        const customersdetails = get_only_customers_withphone
          .map((v) => {
            if (v.phone) return divcolmFunc(v);
          })
          .join('');

        classSelector('smscontacts').innerHTML = `
          ${searchBox('searchsmsclass', 'Search Contacts')}

          ${Table(
            'sms-tbl',
            'smstbl',
            `<tr class="mobiletb smsdispflex">
                <td>
                &nbsp; &nbsp;<input type="checkbox" class="smscheckall" />
                </td>
                <td>Customers</td>
                <td>Contacts</td>
            </tr>`,
            `${customersdetails}`,
            'tableBodyClass'
          )}
          <a href="javascript:void(0);" class="addsmsconts">Add Contacts<span class="addsmscontsspin"></span></a>
          `;
        classSelector('noreload').classList.add('show');
        document.body.style.overflow = `hidden`;

        if (classSelector('addsmscontsspin')) {
          classSelector('addsmscontsspin').innerHTML = '';
        }
      }
    });

    setTimeout(() => {
      if (localStorage.getItem('smsinpt')) {
        const obj = JSON.parse(localStorage.getItem('smsinpt'));

        if (obj.contacts.length > 0) {
          classSelector('contbx').value = obj.contacts.toString();
        }
        if (obj.message.length > 0) {
          classSelector('smsmess').value = obj.message;

          const tot = obj.message.length;

          const per = Math.floor(Number(tot) / 160) + 1;

          classSelector('perreceipient').textContent = per;
          classSelector('totalcharentered').textContent = obj.message.length;
        }

        if (obj.contacts.length > 0 && obj.message.length > 0) {
          classSelector(
            'sendsmswrapper'
          ).innerHTML = `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE</a>`;
        } else {
          classSelector('sendsmswrapper').innerHTML = '';
        }
      }
    }, 1000);

    const page = `
      <div class="dash-container  bulksms">
      <div>
        <div>
          <div class="smsbalance">SMS Balance: <strong class="smsrembalance"></strong></div>

          <textarea placeholder="Message"  name="message" class="smsinpt smsmess"></textarea>

          <div>Total characters entered: <span class="totalcharentered"></span></div>
        </div>
      <div>

      <a href="javascript:void(0);" class="addexistingcont">ADD EXISTING CONTACTS TO MESSAGE</a>
        <textarea placeholder="Enter mobile numbers seperated by commas" 
        name="contacts" class="smsinpt contbx"
        ></textarea>


        <div>Number of Messages Per Recipient: <span class="perreceipient"></span></div>
        <br>
        <div class="sendsmswrapper">

      </div>
      </div>
  
    </div>

  </div>

  ${Modalboxnoreload('', '<div class="smscontacts"></div>')}
  `;

    document.querySelector('.root').innerHTML = Layout('sms', page);
  });
};

export default Sms;
