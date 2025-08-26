import expensesEvent from '../state/events/pages/expensesEvent.js';
import ButtonDropdown from '../utils/ButtonDropdown.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import table from '../utils/table/table.js';
const expenses = () => {
  expensesEvent();
  return `
    <div class="expenses">

    <div>
      <div>
        ${CompanyDetails({
          title: 'Expenses',
          desc: '',
        })}
      </div>
      <div>

      ${ButtonDropdown({
        title: 'Record Expenses',
        icon: 'plus',
        classname: 'record-expense-btn',
        content: `
        <li>
          <a href="?page=recordexpenses">
          <i class="fa fa-pie-chart"></i>
          General Business Expense
          </a>
        </li>
        <li>
          <a href="?page=recordexpenses">
          <i class="fa fa-cube"></i>
          Stock Purchase Expense
          </a>
        </li>
        `,
      })}

      ${ButtonDropdown({
        title: '<i class="fa fa-ellipsis-h"></i>',
        icon: '',
        classname: 'manage-cat-btn',
        content: `
        <li>
          <a href="?page=recordexpenses">
          Manage Categories
          </a>
        </li>
        <li>
          <a href="?page=recordexpenses">
          Expenses Analytics
          </a>
        </li>
        `,
      })}
      </div>
    </div>


    <div>
      <div>
        <h5>Amount paid</h5>
        <h4>GHS 7,000</h4>
      </div>
      <div>
        <h5>Amount Owed</h5>
        <h4>GHS 0.00</h4>
      </div>
    </div>


    <div>
      <div>
        <strong>1 Record</strong>
      </div>
      <div>
        ${
          table({
            thClass: 'arrears-table-head',
            tbClass: 'arrears-table-body',
            pagClass: 'arrears-table-pagination',
            searchClass: 'arrears-search-box', 
            otherdetails:'Customers who owe', 
            custWrapperClass:'customer-who-owe-wrapper'
          })
        }
      </div>
    </div>

  
    </div>
  `;
};

export default expenses;
