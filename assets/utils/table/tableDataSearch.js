import getSearchParam from '../getSearchParam.js';
import tableData from './tableData.js';

const tableDataSearch = ({ ...options }) => {
  const { datalist, listFn, thClass, thData, tbClass, pagClass, value } =
    options;

  sessionStorage.removeItem('sch');

  const { page } = getSearchParam();
  history.pushState('', null, `?page=${page}&p=1`);

  tableData({
    datalist,
    listFn,
    thClass,
    thData,
    tbClass,
    pagClass,
  });

  sessionStorage.setItem('sch', JSON.stringify(value));
};

export default tableDataSearch;
