import Salesbox from './Salesbox.js';
import Statisticsheader from './Statisticsheader.js';

const Salesstatistics = () => {
  return `${Statisticsheader({
    title: 'Sales Statistics',
    subtitle: 'Analytics from 1st Jan 2025 to 31st Dec 2025.',
    fa: 'database'
  })}
  
  ${Salesbox()}
  
  
  `;
};

export default Salesstatistics;
