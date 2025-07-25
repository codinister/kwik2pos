import Chartbox from './widgets/Chartbox.js';
import Totalbox from './widgets/Totalbox.js';
import Customerswhowe from './widgets/Customerswhowe.js';
import dashboardEvent from '../state/events/dashboard/dashboardEvent.js';

const Dashboard = () => {
  dashboardEvent();

  return `
    <section class="container">
      <div>
        ${Totalbox('totalcustomers', 'Customers')}
        ${Totalbox('totalsales', 'Sales')}
        ${Totalbox('totalproforma', 'Proforma')}
      </div>
      <div>
        ${Chartbox('display-chart1')}
        ${Chartbox('display-chart2')}
      </div>
      <div>
        <div>
          ${Chartbox('display-chart3')}
        </div>
        <div>
          ${Customerswhowe()}
      </div>
    </section>
    `;


};

export default Dashboard;
