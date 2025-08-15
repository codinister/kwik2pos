import Totalbox from './Totalbox.js';
import table from '../../utils/table/table.js'

const Servicesbox = () => {
  return `
  <div class="salesbox container">
  
  <div>
  <div>
  
  <h5>Services Statistics</h5>
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
    title: 'Total Services',
    amount: '2',
  })}

  </div>
</div>
  </div>
  `;
};

export default Servicesbox;
