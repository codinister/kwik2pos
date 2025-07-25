import accessControl from '../../../utils/accessControl.js';
import getLoginuser from '../../sessionstorage/GET/getLoginuser.js';
import receiptsChart from '../domupdate/dashboard/receiptsChart.js';
import salesChart from '../domupdate/dashboard/salesChart.js';
import customersChart from '../domupdate/dashboard/customersChart.js';
import totalCustomers from './dashboard/totalCustomers.js';
import totalSales from './dashboard/totalSales.js';
import totalProforma from './dashboard/totalProforma.js';
import customersWhoOwe from './dashboard/customersWhoOwe.js';

const dashboardOnload = (customers) => {
  const us = getLoginuser('user');
  const data = accessControl(customers);
  const dt = new Date(us?.login_date);

  totalCustomers(data);
  totalSales(data);
  totalProforma(data);
  receiptsChart(data, dt);
  salesChart(data, dt);
  customersChart(data, dt);
  customersWhoOwe(data)
};

export default dashboardOnload;
