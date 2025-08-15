import smssendernameEvent from '../state/events/pages/smssendernameEvent.js';
import { Button, Input } from '../utils/InputFields.js';
import CompanyDetails from '../utils/CompanyDetails.js';
const Smssendername = () => {
  smssendernameEvent();
  return `
    <div class="smssendername settings-wrapper">


      ${CompanyDetails({
        title: 'SMS sender name',
        desc: 'Manage your SMS Sender name using the form below.',
      })}


    

      <div>
        <div>
           ${Input({
             inputName: 'sendername',
             labelName: 'SMS Sender name',
             required: 1,
             min: 1,
             stateName: 'smssendername',
             stateFields: '',
             value: '',
           })}


           ${Button({
             classname: 'save-businessprofile',
             buttonname: 'Save Changes',
           })}
        </div>
        </div>


    </div>
  `;
};

export default Smssendername;
