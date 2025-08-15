import Customersbox from './Customersbox.js';
import Inventorybox from './Inventorybox.js';
import Statisticsheader from './Statisticsheader.js';

const Customersstatistics = () => {
  return `${Statisticsheader({
    title: 'Customers Statistics',
    subtitle: 'Analytics from 1st Jan 2025 to 31st Dec 2025.',
    fa: 'users'
  })}
  ${Customersbox()}
  `;
};

export default Customersstatistics;
