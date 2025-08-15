import Totalbox from './Totalbox.js';
import table from '../../utils/table/table.js';

const Expensesbox = () => {
  return `
  <div class="salesbox container">
  
  <div>
  <div>
  
    <h5>Top Expenses Category</h5>
    <p>List of your top expense categories.</p>
    <br />
  
    <div>
    <div>
    ${table({
      thClass: 'arrears-table-head',
      tbClass: 'arrears-table-body',
      pagClass: 'arrears-table-pagination',
      searchClass: 'arrears-search-box',
      otherdetails: 'Customers who owe',
      custWrapperClass: 'customer-who-owe-wrapper',
    })}
    </div>
    </div>
    <div>
    </div>
  </div>
  <div>
  ${Totalbox({
    fa: 'piechart',
    title: 'Total Expenses',
    amount: 'GHS 1000',
  })}
    ${Totalbox({
      fa: 'user',
      title: 'Total Paid Expenses',
      amount: '1000',
    })}
    ${Totalbox({
      fa: 'user',
      title: 'Suppliers Owed',
      amount: '1',
    })}
  </div>
</div>
  </div>
  `;
};

export default Expensesbox;
