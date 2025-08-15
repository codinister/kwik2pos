import filterSalesReport from "../../../components/salesreport/filterSalesReport.js";
import innerHTML from '../../../utils/innerHTML.js'



const salesreportEvent = () => {

  document.addEventListener('click', (e) => {
    if (e.target.matches('.sales-report')) {
      innerHTML({ classname: 'modal-box', content: filterSalesReport() });
    }
  });

};

export default salesreportEvent;
