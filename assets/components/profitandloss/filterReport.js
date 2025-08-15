import dataList from '../../utils/dataList.js';
import { Input, Button } from '../../utils/InputFields.js';

const filterReport = () => {
  return `
  <div class="filterreport">
  <h5>Filter Report</h5>

         ${dataList({
           data: [
             {
               name: 'Cash Accounting',
               id: '1',
             },
             {
               name: 'Accrual Accounting',
               id: '2',
             },
           ],
           state: 'accounttype',
           inputName: 'accountingType',
           labelName: 'Accounting Type',
         })}


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

         ${dataList({
           data: [
             {
               name: 'Month',
               id: '',
             },
             {
               name: 'Year',
               id: '',
             },
           ],
           state: 'accounttype',
           inputName: 'periodType',
           labelName: 'Period Type',
         })}


        ${Button({
          classname: 'save-businessprofile',
          buttonname: 'Save Changes',
        })}

  </div>
  `;
};

export default filterReport;
