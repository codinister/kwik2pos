import table from '../../utils/table/table.js';

const Customerswhowe = () => {
  return table({
    thClass: 'arrears-table-head',
    tbClass: 'arrears-table-body',
    pagClass: 'arrears-table-pagination',
    searchClass: 'arrears-search-box', 
    otherdetails:'Customers who owe', 
    custWrapperClass:'customer-who-owe-wrapper'
  });
};

export default Customerswhowe;
