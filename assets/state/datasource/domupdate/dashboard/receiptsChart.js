import ChartWidget from '../../../../utils/ChartWidget.js';
import { formatMonth, month, year } from '../../../../utils/DateFormats.js';

const receiptsChart = (customers,dt) => {
  const receipts = customers
    .map((v) => v.receipt_list)
    .filter(Boolean)
    .flat(3)
    .filter((v) => year(v.createdAt) === year(dt))
    .map((v) => {
      return {
        payment: Number(v.payment),
        date: v.createdAt,
        month: month(v.createdAt),
        monthWord: formatMonth(v.createdAt),
      };
    })
    .reduce((a, b) => {
      if (a[b.month]) {
        a[b.month].payment += Number(b.payment);
      } else {
        a[b.month] = b;
      }

      return a;
    }, {});

  const receipts_labels = Object.values(receipts).map((v) => v.monthWord);
  const receipts_data = Object.values(receipts).map((v) => v.payment);

  ChartWidget({
    idname: 'display-chart1',
    chart_data: receipts_data,
    chart_labels: receipts_labels,
    title: 'Reciept',
  });
};

export default receiptsChart;
