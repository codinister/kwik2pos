import expensesEvent from '../state/events/pages/expensesEvent.js';
import ButtonDropdown from '../utils/ButtonDropdown.js';
import CompanyDetails from '../utils/CompanyDetails.js';
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
          <a href="">
          <i class="fa fa-pie"><?i>
          General Business Expense
          </a>
        </li>
        <li>
          <a href="">
          <i class="fa fa-pie"><?i>
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
          <a href="">
          <i class="fa fa-pie"><?i>
          Manage Categories
          </a>
        </li>
        <li>
          <a href="">
          <i class="fa fa-pie"><?i>
          Expenses Analytics
          </a>
        </li>
        `,
      })}
      </div>
    </div>
  
    </div>
  `;
};

export default expenses;
