import Modalboxnoreload from './utils/Modalboxnoreload.js';
import { classSelector } from './utils/Selectors.js';
import Table from './utils/Table.js';
import searchBox from './utils/searchBox.js';
import displayToast from './utils/displayToast.js';
import smsStatusCodes from './sms/smsStatusCodes.js';
import Layout from './Layout.js';
import Spinner from './utils/Spinner.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import getSmsBalance from './sms/getSmsBalance.js';

const Sms = () => {
  getSmsBalance();

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.smsmessage')) {
      const len = e.target.value.length;
      classSelector('totalcharentered').textContent = len;
      const per = Math.floor(Number(len) / 160) + 1;
      classSelector('perreceipient').textContent = per;
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.sendsms')) {
      const commasepcontacts = classSelector('commasepcontacts').value;
      const smsmessage = classSelector('smsmessage').value;

      if (!commasepcontacts) {
        displayToast('bgdanger', 'Contacts field required!');
        return;
      }

      if (!smsmessage) {
        displayToast('bgdanger', 'Message field required!');
        return;
      }

      classSelector('sendsmswrapper').innerHTML = Spinner('sendsmsspin');

      const fd = new FormData();
      fd.append('contacts', commasepcontacts);
      fd.append('message', smsmessage);

      fetch('router.php?controller=widget&task=send_sms', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          const obj = JSON.parse(data);

          if (obj?.code === '1000') {
            const res = smsStatusCodes(obj?.code);
            displayToast('lightgreen', res);
            getSmsBalance();
            classSelector(
              'sendsmswrapper'
            ).innerHTML = `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>`;
          } else if (obj?.code !== '1000') {
            const res = smsStatusCodes(data?.code);
            displayToast('bgdanger', res);
            classSelector(
              'sendsmswrapper'
            ).innerHTML = `<a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>`;
          }

        });
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

      classSelector('commasepcontacts').value = selctall;
      classSelector('noreload').classList.remove('show');
      document.body.style.overflow = 'scroll';
    }

    if (e.target.matches('.addexistingcont')) {
      customersprofile((data) => {
        const divcolmFunc = (v) => `
            <ul class="smsdispflex">
                <li>
                <input type="checkbox" data-phone="${v.phone}" class="csms" />
                </li>
                <li>${v.fullname}</li>
                <li>${v.phone}</li>
            </ul>`;

        const get_only_customers_withphone = data.filter((v) => {
          if (v.phone) return v;
        });

        const customersdetails = get_only_customers_withphone
          .map((v) => {
            if (v.phone) return divcolmFunc(v);
          })
          .join('');

        classSelector('smscontacts').innerHTML = `
          ${searchBox(
            'searchsmsclass',
            'Search Contacts',
            get_only_customers_withphone,
            divcolmFunc,
            'tableBodyClass'
          )}

          ${Table(
            `<ul class="mobiletb smsdispflex">
                <li>
                <input type="checkbox" class="smscheckall" />
                </li>
                <li>Customers</li>
                <li>Contacts</li>
            </ul>`,
            `${customersdetails}`,
            'tableBodyClass'
          )}
          <a href="javascript:void(0);" class="addsmsconts">Add Contacts<span class="addsmscontsspin"></span></a>
          `;
        classSelector('noreload').classList.add('show');
        document.body.style.overflow = `hidden`;
      });

      if (classSelector('addsmscontsspin')) {
        classSelector('addsmscontsspin').innerHTML = '';
      }
    }
  });

  const page = `
      <div class="dash-container  bulksms">
      <div>
        <div>
          <div class="smsbalance">SMS Balance: <strong class="smsrembalance"></strong></div>
          <textarea placeholder="Message" class="smsmessage"></textarea>
          <div>Total characters entered: <span class="totalcharentered"></span></div>
        </div>
      <div>

      <a href="javascript:void(0);" class="addexistingcont">ADD EXISTING CONTACTS TO MESSAGE</a>
        <textarea placeholder="Enter mobile numbers seperated by commas" class="commasepcontacts"></textarea>
        <div>Number of Messages Per Recipient: <span class="perreceipient"></span></div>
        <br>
        <div class="sendsmswrapper">
      <a href="javascript:void(0)" class="sendsms">SEND MESSAGE <span class="sendsmsspin"></span></a>
      </div>
      </div>
  
    </div>

  </div>

  ${Modalboxnoreload('', '<div class="smscontacts"></div>')}
  `;

  document.querySelector('.root').innerHTML = Layout('sms', page);
};

export default Sms;
