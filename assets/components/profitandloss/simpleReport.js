import FullCompanyDetails from '../../utils/FullCompanyDetails.js';
import reportTitle from '../../utils/reportTitle.js';

const simpleReport = () => {
  return `
  <div class="simplereport">
    ${FullCompanyDetails()}

        ${reportTitle({
          title: 'Simple Profit & Loss Report',
          subtitle: '(Cash Accounting)',
          desc: 'For the Period EndedAug 2025',
        })}

  
    <table cellspacing="0">
      <tbody>
        <tr>
          <td><strong>Revenue</strong></td>
          <td><strong>Aug 2025</strong></td>
        </tr>
        <tr>
          <td>Sales</td>
          <td>GHS 0.00</td>
        </tr>
        <tr>
          <td><strong>Total Revenue</strong></td>
          <td><strong>GHS 0.00</strong></td>
        </tr>

        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>
        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>


        <tr>
          <td colspan="2">
          <strong>Cost of Goods Sold</strong>
          </td>
        </tr>
        <tr>
          <td>
          <strong>
          Total Cost of Goods Sold (COGS)
          </strong>
          </td>
          <td>
          <strong>GHS 0.00</strong>
          </td>
        </tr>


        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>
        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>


        <tr>
          <td>Gross Profit / (Loss)</td>
          <td>(GHS 0.00)</td>
        </tr>


        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>
        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>



        <tr>
          <td colspan="2">Operating Expenses</td>
        </tr>
        <tr>
          <td>Total Operating Expenses</td>
          <td>GHS 0.00</td>
        </tr>



        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>
        <tr>
          <td colspan="2" class="td-margin"></td>
        </tr>



  
        <tr>
          <td>Net Profit / (Loss)</td>
          <td>(GHS 0.00)</td>
        </tr>


      </tbody>
    </table>

  </div>
  `;
};

export default simpleReport;
