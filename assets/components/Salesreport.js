import salesreportEvent from '../state/events/pages/salesreportEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import table from '../utils/table/table.js'

const Salesreport = () => {
  salesreportEvent();

  return `
    <section class="salesreport">
      <div class="">
        <div>
          ${CompanyDetails({
            title: 'Salles Report',
            desc: '',
          })}
        </div>
        <div>
          <button> 
          <i class="fa fa-calendar"></i>
          <span data-modal="modal-one"  class="show-modal sales-report">
          1st Jan 2025 - 31st Dec 2025
          </span>
          </button>
        </div>
      </div>


      <div>
          <table cellpadding="0">
            <tbody>
              <tr>
                <td>SALES AMOUNT</td> 
                <td>$3,750.00</td> 
              </tr>
              <tr>
                <td>SALES TAX</td> 
                <td>$277.50</td> 
              </tr>
              <tr>
                <td>SALES TOTAL</td> 
                <td>$4,027.50</td> 
              </tr>
            </tbody>
          </table>
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


    </section>
  `;
};

export default Salesreport;
