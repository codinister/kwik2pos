import filterAnalytics from "../../../components/profitandloss/filterAnalytics.js";
import innerHTML from "../../../utils/innerHTML.js";

const analyticsEvent = () => {
  document.addEventListener('click', (e) => {
    
      if (e.target.matches('.analyticsreport')) {
        innerHTML({ classname: 'modal-box', content: filterAnalytics() });
      }
    
  });
};

export default analyticsEvent;
