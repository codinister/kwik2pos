import analyticsEvent from '../state/events/pages/analyticsEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import Inventorystatistics from './analytics/Inventorystatistics.js';
import Salesstatistics from './analytics/Salesstatistics.js';
import Servicesstatistics from './analytics/Servicesstatistics.js'
import Customersstatistics from './analytics/Customersstatistics.js'

import Expensesstatistics from './analytics/Expensesstatistics.js'


const Analytics = () => {
  analyticsEvent();
  return `
    <section class="analytics">

    <div class="container">
      <div>
        ${CompanyDetails({ title: 'Analytics', desc: '' })}
      </div>
      <div>
        <button
        data-modal="modal-one"  
        class="show-modal analyticsreport"
        >1st Jan 2025 - 31st Dec 2025</button>
      </div>
    </div>

    ${Salesstatistics()}
    ${Inventorystatistics()}
    ${Servicesstatistics()}
    ${Customersstatistics()}
    ${Expensesstatistics()}
    </section>
  `;
};

export default Analytics;
