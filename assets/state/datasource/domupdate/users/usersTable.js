import paginationEvent from '../../../events/paginationEvent.js';
import usersEvent from '../../../events/pages/usersEvent.js';
import tableData from '../../../../utils/table/tableData.js';
import usersTableList from './usersTableList.js';
import { classSelector } from '../../../../utils/Selectors.js';
import innerHTML from '../../../../utils/innerHTML.js';

const usersTable = (data) => {

  paginationEvent();
  usersEvent(data);

  const datalist = data
    .map((v) => v)
    .flat(2)
    .sort((a, b) => {
      if (a.firstname > b.firstname) return 1;
      else if (a.firstname < b.firstname) return -1;
      else return 0;
    });

  tableData({
    datalist,
    listFn: usersTableList,
    thClass: 'users-table-head',
    thData: ['Name', 'Email', 'Role','Date','Action'],
    tbClass: 'users-table-body',
    pagClass: 'users-table-pagination',
  });

  const total_users = data.length > 1 ? data.length+' '+'Users' : data.length+' '+'User'

  innerHTML({
    classname: 'total-users',
    content: total_users
  })
};

export default usersTable;
