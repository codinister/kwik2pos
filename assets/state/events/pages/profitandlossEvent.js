import filterReport from '../../../components/profitandloss/filterReport.js';
import reportDescription from '../../../components/profitandloss/reportDescription.js';
import innerHTML from '../../../utils/innerHTML.js';

const profitandlossEvent = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.profitlossreport')) {
      innerHTML({ classname: 'modal-box', content: filterReport() });
    }
    if (e.target.matches('.profit-loss-question')) {
      innerHTML({ classname: 'modal-box', content: reportDescription() });
    }
  });
};

export default profitandlossEvent;
