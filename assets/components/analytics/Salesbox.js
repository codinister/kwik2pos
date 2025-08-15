import Totalbox from './Totalbox.js';
import Chartbox from '../widgets/Chartbox.js'

const Salesbox = () => {
  return `
  <div class="salesbox container">
  
  <div>
  <div>
  
  <h5>Sales</h5>
  <p>Breakdown of your sales.</p>
  <br />
  
  <div>
    <div> 
      <stromg>Total Sales</strong>
      <h5>GHS 0.00</h5>
    </div>
    <div> 
      <strong>Balance to Receive</strong>
      <h5>GHS 0.00</h5>
    </div>
    </div>

    <div>
    ${Chartbox('display-chart3')}
    </div>
    <div>


    </div>
  </div>
  <div>
  ${Totalbox({
    fa: 'percent',
    title: 'Total Discounts',
    amount: '0 / GHS 0.00',
  })}
    ${Totalbox({
      fa: 'money',
      title: 'Total Receipts',
      amount: '0 / GHS 0.00',
    })}
    ${Totalbox({
      fa: 'square-o',
      title: 'Total Invoices',
      amount: '0 / GHS 0.00',
    })}
    ${Totalbox({
      fa: 'sticky-note-o',
      title: 'Total Proformas',
      amount: '0 / GHS 0.00',
    })}
    ${Totalbox({
      fa: 'reply',
      title: 'Total Refunds',
      amount: '0 / GHS 0.00',
    })}
  </div>
</div>
  </div>
  `;
};

export default Salesbox;
