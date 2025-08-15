import Totalbox from './Totalbox.js';
import table from '../../utils/table/table.js'

const Customersbox = () => {
  return `
  <div class="salesbox container">
  
  <div>
  <div>
  
    <h5>Top Customers</h5>
    <p>List of your top customers.</p>
    <br />
  
    <div>
    <div>
    ${table({
        thClass: 'arrears-table-head',
        tbClass: 'arrears-table-body',
        pagClass: 'arrears-table-pagination',
        searchClass: 'arrears-search-box', 
        otherdetails:'Customers who owe', 
        custWrapperClass:'customer-who-owe-wrapper'
    })}
    </div>
    </div>
    <div>
    </div>
  </div>
  <div>
  ${Totalbox({
    fa: 'user',
    title: 'Total Customers',
    amount: '2',
  })}
    ${Totalbox({
      fa: 'user',
      title: 'Total Returning Customers',
      amount: '1',
    })}
    ${Totalbox({
      fa: 'user',
      title: 'Total Onetime Customers',
      amount: '1',
    })}
    ${Totalbox({
      fa: 'user',
      title: 'Total Customers Owing',
      amount: '3',
    })}
  </div>
</div>
  </div>
  `;
};

export default Customersbox;
