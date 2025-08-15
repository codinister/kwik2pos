import Totalbox from './Totalbox.js';
import table from '../../utils/table/table.js'

const Inventorybox = () => {
  return `
  <div class="salesbox container">
  
  <div>
  <div>
  
    <h5>Top Performing Products</h5>
    <p>List of your most sold products..</p>
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
    fa: 'plus-square-o',
    title: 'Products In-Stock',
    amount: '2',
  })}
    ${Totalbox({
      fa: 'plus-square-o',
      title: 'Products Out of Stock',
      amount: '1',
    })}
    ${Totalbox({
      fa: 'plus-square-o',
      title: 'Products Low in Stock',
      amount: '1',
    })}
    ${Totalbox({
      fa: 'trash',
      title: 'Damaged Products',
      amount: '0 / GHS 0.00',
    })}
  </div>
</div>
  </div>
  `;
};

export default Inventorybox;
