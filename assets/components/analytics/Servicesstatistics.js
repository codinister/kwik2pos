import Servicesbox from './Servicesbox.js';
import Statisticsheader from './Statisticsheader.js';

const Servicesstatistics = () => {
  return `${Statisticsheader({
    title: 'Services Statistics',
    subtitle: 'Analytics from 1st Jan 2025 to 31st Dec 2025.',
    fa: 'briefcase'
  })}
  
  ${Servicesbox()}
  
  
  `;
};

export default Servicesstatistics;
