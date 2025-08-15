
import Expensesbox from './Expensesbox.js';
import Statisticsheader from './Statisticsheader.js';

const Expensesstatistics = () => {
  return `${Statisticsheader({
    title: 'Expenses Statistics',
    subtitle: 'Analytics from 1st Jan 2025 to 31st Dec 2025.',
    fa: 'users'
  })}
  ${Expensesbox()}
  `;
};

export default Expensesstatistics;
