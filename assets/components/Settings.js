import {
  textInput,
  checkBox,
  emailInput,
  phoneInput,
  radioButton,
} from './utils/InputFields.js';
import { classSelector } from './utils/Selectors.js';
import displayToast from './utils/displayToast.js';
import Layout from './Layout.js';
import getIndustry from './utils/getIndustry.js';
import Spinner from './utils/Spinner.js';
import settingsReducer from './data/clientside/reducers/settingsReducer.js';

const Settings = () => {
  const sett = JSON.parse(localStorage.getItem('sinpt'));
  const industry = getIndustry();

  document.addEventListener('click', (e) => {

    if (e.target.matches('.save_setting')) {
      const obj = JSON.parse(localStorage.getItem('settingupdate'));

      obj['comp_terms'] = CKEDITOR.instances.comp_terms.getData();

      let logo = [];
      if (
        classSelector('comp_logo').files &&
        classSelector('comp_logo').files[0]
      ) {
        logo = classSelector('comp_logo').files[0];
      }

      delete obj['modify'];

      const fd = new FormData();

      fd.append('data', JSON.stringify(obj));
      fd.append('comp_logo', logo);

      fetch(`router.php?controller=settings&task=update_settings`, {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            return displayToast('bgdanger', data);
          } else {
            localStorage.setItem('sinpt', JSON.stringify(obj));
            return displayToast('lightgreen', data);
          }
        })
        .catch((err) => console.log(err));
    }

    
  });

  document.addEventListener('input', (e) => {
    settingsReducer(e);
  });

  setTimeout(() => {
    if (classSelector('comp_terms')) {
      CKEDITOR.instances.comp_terms.setData(sett.comp_terms);
    }
    if (classSelector('duration')) {
      const dur = sett ? sett?.duration : '';
      classSelector('duration').value = dur;
    }

    if (classSelector('showinstock')) {
      const shoin = sett ? sett?.showinstock : '';
      classSelector('showinstock').value = shoin;
    }

    if (classSelector('currency')) {
      const cur = sett ? sett?.currency : '';
      classSelector('currency').value = cur;
    }
  });

  let duration = '';
  let showinstock = ''
  if (industry === 'service provider' || industry === 'rentals') {


    showinstock = `
    <div class="select-inpt" value= id="ss">	
    <label> Show in stock </label>
    <br>
    <select class="showinstock sinpt"  name="showinstock">
      <option hidden>Select days</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
    </select>
    </div>
    `;



    duration = `
    <div class="select-inpt" value= id="zz">	
    <label> Duration Type </label>
    <br>
    <select class="duration sinpt"  name="duration">
    <option hidden>Select duration type</option>
    <option value="Month">Month(s)</option>
    <option value="Day">Day(s)</option>
    <option value="Year">Year(s)</option>
    </select>
    </div>
    `;


  }

  const page = `

      <div class="settings-wrapper">


        <div class="settings-header">
          <div class="settings-header-inner">
            <div>
              <img src="assets/uploads/${
                sett?.comp_logo
              }"  class="logoimg" alt="Logo" />
            </div>
            <div>
              <h1 class="compname">${sett?.comp_name.toUpperCase()}</h1>
            </div>
          </div>
        </div>
        <div class="setting-file-uploads">
            <label>
            Upload Logo (100px x 80px)
            <input type="file"    class="comp_logo" />
            </label>
        </div>





    <div class="settings-sections">
        <h6>Company Details</h6>
        <div class="settings-row">

            <div>
                ${textInput({
                  type: 'text',
                  classname: 'comp_name sinpt',
                  name: 'comp_name',
                  required: true,
                  label: 'Company Name',
                  value: sett ? sett?.comp_name : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'comp_addr sinpt',
                  name: 'comp_addr',
                  required: true,
                  label: 'Company Address',
                  value: sett ? sett?.comp_addr : '',
                })}


    
                
                ${textInput({
                  type: 'text',
                  classname: 'comp_phone sinpt',
                  name: 'comp_phone',
                  required: true,
                  label: 'Phone',
                  value: sett ? sett?.comp_phone : '',
                })}



                ${textInput({
                  type: 'text',
                  classname: 'digitaladdress sinpt',
                  name: 'digitaladdress',
                  required: true,
                  label: 'Digital address',
                  value: sett ? sett?.digitaladdress : '',
                })}

            </div>
            <div>
            ${textInput({
              type: 'text',
              classname: 'comp_location sinpt',
              name: 'comp_location',
              required: true,
              label: 'Company Location',
              value: sett ? sett?.comp_location : '',
            })}


            ${emailInput({
              classname: 'sinpt',
              name: 'comp_email',
              value: sett ? sett?.comp_email : '',
              errorclass: 'compemail',
            })}





                ${textInput({
                  type: 'text',
                  classname: 'comp_website sinpt',
                  name: 'comp_website',
                  required: false,
                  label: 'Company Website',
                  value: sett ? sett?.comp_website : '',
                })}
            </div>
            </div>
        </div>

        <div class="settings-sections">
        <h6>Terms & Conditions</h6>
        <div class="settings-row">
            <div>
                <textarea class="comp_terms" id="comp_terms"></textarea>
            </div>
            </div>
        </div>

        <div class="settings-sections">
        <h6>Bank Details</h6>
        <div class="settings-row">
            <div>
                ${textInput({
                  type: 'text',
                  classname: 'comp_bank sinpt',
                  name: 'comp_bank',
                  required: false,
                  label: 'Bank',
                  value: sett ? sett?.comp_bank : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'bank_acc sinpt',
                  name: 'bank_acc',
                  required: false,
                  label: 'Account Number',
                  value: sett ? sett?.bank_acc : '',
                })}
            
            </div>
            <div>
                ${textInput({
                  type: 'text',
                  classname: 'acc_name sinpt',
                  name: 'acc_name',
                  required: false,
                  label: 'Account Name',
                  value: sett ? sett?.acc_name : '',
                })}
            </div>
            </div>
        </div>


        <div class="settings-sections">
        <h6>SMS</h6>
        <div class="settings-row">
            <div>
                ${textInput({
                  type: 'text',
                  classname: 'sms_sender_id  sinpt',
                  name: 'sms_sender_id',
                  required: false,
                  label: 'Sender ID',
                  value: sett ? sett?.sms_sender_id : '',
                })}
                ${textInput({
                  type: 'password',
                  classname: 'sms_api_key  sinpt',
                  name: 'sms_api_key',
                  value: sett?.sms_api_key ? sett?.sms_api_key : '',
                  required: false,
                  label: 'API Key',
                  value: sett ? sett?.sms_api_key : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'sms_api_url sinpt',
                  name: 'sms_api_url',
                  required: false,
                  label: 'API Url',
                  value: sett ? sett?.sms_api_url : '',
                })}
            </div>


            <div>
                ${textInput({
                  type: 'email',
                  classname: 'sms_cc sinpt',
                  name: 'sms_cc',
                  required: false,
                  label: 'SMS CC',
                  value: sett ? sett?.sms_cc : '',
                })}
                ${checkBox({
                  classname: 'sinpt',
                  labelname: 'SMS receipt alert',
                  name: 'activate_receipt_sms',
                  check: sett?.activate_receipt_sms === '1' ? 'checked' : '',
                })}
     
            </div>

        </div>
        </div>

        <div class="settings-sections">
        <h6>TAX</h6>
        <div class="settings-row">
            <div>
                ${textInput({
                  type: 'text',
                  classname: 'vat sinpt',
                  name: 'vat',
                  required: false,
                  label: 'VAT',
                  value: sett ? sett?.vat : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'nhil sinpt',
                  name: 'nhil',
                  required: false,
                  label: 'NHIL',
                  value: sett ? sett?.nhil : '',
                })}

                ${textInput({
                  type: 'text',
                  classname: 'withholdingtax sinpt',
                  name: 'withholdingtax',
                  required: false,
                  label: 'Withholding Tax',
                  value: sett ? sett?.withholdingtax : '',
                })}
              
            </div>
            <div>
                ${textInput({
                  type: 'text',
                  classname: 'getfund sinpt',
                  name: 'getfund',
                  required: false,
                  label: 'GETFUND',
                  value: sett ? sett?.getfund : '',
                })}
                ${textInput({
                  type: 'text',
                  classname: 'covid sinpt',
                  name: 'covid',
                  required: false,
                  label: 'COVID',
                  value: sett ? sett?.covid : '',
                })}
   
            </div>
            </div>
        </div>

        <div class="settings-sections">
        <h6>Other</h6>
        <div class="settings-row">
            <div>

                <div class="select-inpt  sinpt"  name="select-inpt" id="zz">	
                <label> Currency </label>
                <br>
                <select class="currency sinpt" name="currency">
                <option hidden>Select currency</option>
                <option value="GHs">GHs</option>
                <option value="$">$</option>
                <option value="£">£</option>
                <option value="€">€</option>
                </select>
                </div>
       
            </div>
            <div>
              ${duration}
            </div>
            <div>
              ${showinstock}
            </div>
            </div>  
        </div>

        <div class="settings-sections">
        <h6>Receipt Type</h6>
        <div class="settings-row">
            <div>
                ${radioButton({
                  labelname: 'A5',
                  name: 'receipt_type',
                  check: sett?.receipt_type === 'A5' ? 'checked' : '',
                  value: 'A5',
                  cls: 'sinpt',
                })}
            </div>
            <div>
                ${radioButton({
                  labelname: 'Thermnal paper',
                  name: 'receipt_type',
                  check: sett?.receipt_type === 'THERMNAL' ? 'checked' : '',
                  value: 'THERMNAL',
                  cls: 'sinpt',
                })}
            </div>
            </div>
        </div>

        <div class="setting-btn-wrapper">
        <a href="javascript:void(0);" class="save_setting">
        SAVE SETTING <span class="settings-spinner"></span>
        </a>
        </div>
    </div>
</div>

`;

  if (document.querySelector('.root')) {
    document.querySelector('.root').innerHTML = Layout('settings', page);
  }

  //CKEDITOR INSTANCE
  CKEDITOR.replace('comp_terms', {
    height: '300px',
  });
};

export default Settings;
