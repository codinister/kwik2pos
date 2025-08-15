
import { Input, Button } from '../../utils/InputFields.js';

const filterSalesReport = () => {
  return `
  <div class="filterreport">
  <h5>Filter Report</h5>
  <br />

         <div>
            ${Input({
              inputName: 'from_date',
              type: 'date',
              labelName: 'From date',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: 'to_date',
              type: 'date',
              labelName: 'To date',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: '',
              value: '',
            })}
        </div>

        

        ${Button({
          classname: 'save-businessprofile',
          buttonname: 'Save Changes',
        })}

  </div>
  `;
};

export default filterSalesReport;
