import tableDataSearch from '../../../utils/table/tableDataSearch.js';
import customersWhoOweList from '../../datasource/domupdate/dashboard/customersWhoOweList.js';

const dashboardEvent = (data=[]) => {



  document.addEventListener('input', (e) => {
    if (e.target.matches('.arrears-search-box')) {
      const { value } = e.target;
      const datalist = data
        .map((v) => v.aginginvoice)
        .flat(2)
        .filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        );

      tableDataSearch({
        datalist,
        listFn: customersWhoOweList,
        thClass: 'arrears-table-head',
        thData: ['Customer', 'Amount', 'Description'],
        tbClass: 'arrears-table-body',
        pagClass: 'arrears-table-pagination',
        value,
      });
    }
  });
};

export default dashboardEvent;
