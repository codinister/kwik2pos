import apikeyEvent from '../state/events/pages/apikeyEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import { Button, Input } from '../utils/InputFields.js';
const Apikey = () => {
  apikeyEvent();
  return `
    <div class="smssendername settings-wrapper">


      ${CompanyDetails({
        title: 'API Key',
        desc: 'Manage your API key using the form below.',
      })}


    

      <div>
        <div>
           ${Input({
             inputName: 'apikey',
             labelName: 'Api key',
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

export default Apikey;
