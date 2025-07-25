import innerHTML from '../innerHTML.js';
import tableHeader from './tableHeader.js';
import tableBody from './tableBody.js';
import paginationBtn from './paginationBtn.js';
import pagination from './pagination.js';

const tableData = ({ ...options }) => {
  const { datalist = [], listFn, thClass, thData, tbClass, pagClass } = options;



  const sch = JSON.parse(sessionStorage.getItem('sch')) || '';

  let output;

  if (sch.length > 0) {
    output = datalist.filter((v) =>
      Object.values(v).join(' ').toLowerCase().includes(sch.toLowerCase())
    );
  } else {
    output = datalist;
  }


  const { paginResult , length } = pagination(output);

  const tbData = Object.values(paginResult).map((v) => listFn(v));

  tableHeader({
    thClass,
    thData,
  });

  tableBody({
    tbClass,
    tbData,
  });

  innerHTML({
    classname: pagClass,
    content: paginationBtn(length),
  });
};

export default tableData;
