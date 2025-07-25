import ChartWidget from '../../../../utils/ChartWidget.js';
import { formatMonth, month, year } from '../../../../utils/DateFormats.js';

const customersChart = (customers,dt) => {
  const custs = customers
    .filter((v) => year(v.createdAt) === year(dt))
    .map((v) => {
      return {
        total: 1,
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

  const custs_labels = Object.values(custs).map((v) => v.monthWord);
  const custs_data = Object.values(custs).map((v) => v.total);

  ChartWidget({
    idname: 'display-chart2',
    chart_data: custs_data,
    chart_labels: custs_labels,
    title: 'Customers',
  });
};

export default customersChart;
