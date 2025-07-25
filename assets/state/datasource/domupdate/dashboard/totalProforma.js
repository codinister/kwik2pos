import { formatDate } from '../../../../utils/DateFormats.js';
import getDates from '../../../../utils/getDates.js';
import textContent from '../../../../utils/textContent.js';
import format_number from '../../../../utils/format_number.js';
import getCurrency from '../../../../utils/getCurrency.js';

const totalProforma = (data) => {

  const proforma_total = data.reduce((a, b) => {
    return Number(a) + Number(b.proforma_total);
  },0);

  const customerSort = getDates(data);
  textContent({
    classname: 'totalproforma-total',
    content: `${getCurrency()} ${format_number(proforma_total)}`,
  });

  textContent({
    classname: 'totalproforma-date',
    content: `${formatDate(customerSort[0])} - ${formatDate(
      customerSort[customerSort.length - 1]
    )}`,
  });
};

export default totalProforma;
