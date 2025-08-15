import inventorysettingsEvent from '../state/events/pages/inventorysettingsEvent.js';
import Caption from '../utils/Caption.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import { Button, Input } from '../utils/InputFields.js';
import dataList from '../utils/dataList.js';
const Inventorysettings = () => {
  inventorysettingsEvent();
  return `
  <section class="inventorysettings settings-wrapper">
        
  ${CompanyDetails({
    title: 'Inventory Settings',
    desc: 'Use the form below to update your inventory settings.',
  })}


  <div>


       ${dataList({
         data: [
           {
             name: 'Invoice',
             id: '1',
           },
           {
             name: 'Part payment',
             id: '2',
           },
           {
             name: 'Receipt',
             id: '3',
           },
         ],
         state: 'accounttype',
         inputName: 'accountingType',
         labelName: 'Reduce Inventory On',
         question: `
           <p>Choose when items should be deducted from your inventory</p>
            <br />
           <ol>
           <li>
            <strong>Invoice:</strong> 
            Inventory reduction occurs when the invoice is created
           </li>

           <li>
            <strong>Part payment:</strong>
            Inventory is reduced when a partial 
            payment is made.
           </li>
           <li>
            <strong>Receipt:</strong>
            Inventory decreases only upon receipt of full payment.
           </li>
           </ol>
           
           `,
         required: 1,
       })}

  <div>

${Caption({
  title: 'Restrict Sale Items to', 
  text: `
    <p> 
      Specify the limitations for adding items to a sale 
    </p>
    <br />
    <ol>
      <li>
        <strong>Inventory</strong>
        When checked, only products from your 
        inventory can be added to the sale, Prices are fixed and cannot be changed
      </li>
      <li>
        <strong>Services:</strong>
        When checked, only services from your 
        services can be added to the sale. Prices
        for services remain uneditable 
      </li>
    </ol>
  `
})}


  <div>
      <div> 
          ${Input({
            inputName: 'inventory',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Inventory',
            required: 1,
            min: 1,
            stateName: 'inventorysettings',
            stateFields: '',
            value: '',
          })}
      </div>
      <div> 
          ${Input({
            inputName: 'service',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Services',
            required: 1,
            min: 1,
            stateName: 'businessprofile',
            stateFields: '',
            value: '',
          })}
      </div>

      </div>

      </div>
    
    <div>
      ${Button({
        classname: 'save-businessprofile',
        buttonname: 'Save Changes',
      })}
    </div>
    
    </div>

  </section>
  `;
};

export default Inventorysettings;
