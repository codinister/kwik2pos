import paginationEvent from '../../../events/paginationEvent.js';
import dashboardEvent from '../../../events/dashboard/dashboardEvent.js';
import tableData from '../../../../utils/table/tableData.js';
import customersWhoOweList from './customersWhoOweList.js';
const customersWhoOwe = (data) => {
  paginationEvent();
  dashboardEvent(data);

  const datalist = data
    .map((v) => v.aginginvoice)
    .flat(2)
    .sort((a, b) => {
      if (a.fullname > b.fullname) return 1;
      else if (a.fullname < b.fullname) return -1;
      else return 0;
    });

  tableData({
    datalist,
    listFn: customersWhoOweList,
    thClass: 'arrears-table-head',
    thData: ['Customer', 'Amount', 'Description'],
    tbClass: 'arrears-table-body',
    pagClass: 'arrears-table-pagination',
  });
};

export default customersWhoOwe;
