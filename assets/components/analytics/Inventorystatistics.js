import Inventorybox from './Inventorybox.js';
import Statisticsheader from './Statisticsheader.js';

const Inventorystatistics = () => {
  return `${Statisticsheader({
    title: 'Inventory Statistics',
    subtitle: 'Analytics from 1st Jan 2025 to 31st Dec 2025.',
    fa: 'wpforms'
  })}
  
  ${Inventorybox()}
  
  
  `;
};

export default Inventorystatistics;
