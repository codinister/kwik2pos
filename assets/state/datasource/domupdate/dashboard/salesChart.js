import ChartWidget from '../../../../utils/ChartWidget.js';
import { formatMonth, month, year } from '../../../../utils/DateFormats.js';

const salesChart = (customers,dt) => {

  const invoices = customers
    .map((v) => v.invoice_list)
    .filter(Boolean)
    .flat(3)
    .filter((v) => year(v.createdAt) === year(dt))
    .map((v) => {
      return {
        total: Number(v.total),
        date: v.createdAt,
        month: month(v.createdAt),
        monthWord: formatMonth(v.createdAt),
      };
    })
    .reduce((a, b) => {
      if (a[b.month]) {
        a[b.month].total += Number(b.total);
      } else {
        a[b.month] = b;
      }

      return a;
    }, {});

  const sales_labels = Object.values(invoices).map((v) => v.monthWord);
  const sales_data = Object.values(invoices).map((v) => v.total);

  ChartWidget({
    idname: 'display-chart3',
    chart_data: sales_data,
    chart_labels: sales_labels,
    title: 'Sales ',
  });

};

export default salesChart;
