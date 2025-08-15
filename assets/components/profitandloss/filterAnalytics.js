
import { Input, Button } from '../../utils/InputFields.js';

const filterAnalytics = () => {
  return `
  <div class="filteranalytics">
  <h5>Filter Analytics</h5>

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
          buttonname: 'Apply Filter',
        })}

  </div>
  `;
};

export default filterAnalytics;
