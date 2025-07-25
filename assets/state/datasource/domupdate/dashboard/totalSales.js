import { formatDate } from '../../../../utils/DateFormats.js';
import getDates from '../../../../utils/getDates.js';
import textContent from '../../../../utils/textContent.js';
import format_number from '../../../../utils/format_number.js';
import getCurrency from '../../../../utils/getCurrency.js';

const totalSales = (data) => {

  const invoice_total = data.reduce((a, b) => {
    return Number(a) + Number(b.total_sales);
  }, 0);

  const customerdates = getDates(data);
  textContent({
    classname: 'totalsales-total',
    content: `${getCurrency()} ${format_number(invoice_total)}`,
  });
  textContent({
    classname: 'totalsales-date',
    content: `${formatDate(customerdates[0])} - ${formatDate(
      customerdates[customerdates.length - 1]
    )}`,
  });
};

export default totalSales;
