import CompanyDetails from '../utils/CompanyDetails.js';
import table from '../utils/table/table.js';

const Activitylogs = () => {
  return `
    <div class="activitylogs">

    <div>

      <div>
        <div>
          ${CompanyDetails({
            title: 'User Logs',
            desc: '',
          })}
        </div>
        <div>
          2 Logs
        </div>
      </div>




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
    </div>
  `;
};

export default Activitylogs;
