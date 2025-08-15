import taxprofileEvent from '../state/events/pages/taxprofileEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import { Button, Input } from '../utils/InputFields.js';
const Taxprofile = () => {
  taxprofileEvent();
  return `
    <section class="taxes settings-wrapper">

        ${CompanyDetails({
          title: 'Tax Profile Settings',
          desc: 'Use the form below to update your tax information.',
        })}


        <div>
          <div>
                ${Input({
                  inputName: 'vat',
                  labelName: 'VAT',
                  required: 1,
                  min: 1,
                  stateName: 'taxes',
                  stateFields: '',
                  value: '',
                })}
                ${Input({
                  inputName: 'nhil',
                  labelName: 'NHIL',
                  required: 1,
                  min: 1,
                  stateName: 'taxes',
                  stateFields: '',
                  value: '',
                })}

                ${Input({
                  inputName: 'withholdingtax',
                  labelName: 'Withholding',
                  required: 1,
                  min: 1,
                  stateName: 'taxes',
                  stateFields: '',
                  value: '',
                })}
              
            </div>
            <div>
                ${Input({
                  inputName: 'getfund',
                  labelName: 'GETFUND',
                  required: 1,
                  min: 1,
                  stateName: 'taxes',
                  stateFields: '',
                  value: '',
                })}
                ${Input({
                  inputName: 'covid',
                  labelName: 'Covid',
                  required: 1,
                  min: 1,
                  stateName: 'taxes',
                  stateFields: '',
                  value: '',
                })}
          </div>
          </div>

          ${Button({
            classname: 'save-businessprofile',
            buttonname: 'Save Changes',
          })}

    
    </sectiom>
  `;
};

export default Taxprofile;
