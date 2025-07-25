import dashboardEvent from '../state/events/dashboard/dashboardEvent.js';
import { year } from './DateFormats.js';

const ChartWidget = ({ ...options }) => {
  const {
    idname = '',
    chart_data = [],
    chart_labels = [],
    title = '',
  } = options;

  if (document.getElementById(idname)) {
    const dt = new Date();
    const getcanvas = document.getElementById(idname).getContext('2d');

    const colors = [
      'rgb(241,197,229)',
      'rgb(241,173,246)',
      'rgb(245,198,182)',
      'rgb(248,125,67)',
      'rgb(67,186,127)',
      'rgb(255,212,60)',
      'rgb(255,190,52)',
      'rgb(204,101,248)',
      'rgb(132,30,255)',
      'rgb(160,230,116)',
      'rgb(254,102,133)',
      'rgb(97,106,251)',
    ];

    const chart = new Chart(getcanvas, {
      type: 'bar',
      data: {
        labels: chart_labels,
        datasets: [
          {
            data: chart_data,
            label: year(dt) + title,
            backgroundColor: colors.slice(0, chart_data.length),
            borderColor: 'rgb(66,92,89)',
            borderWidth: '1',
          },
        ],
      },
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches(`.chart-selector`)) {
        e.preventDefault();
        chart.config.type = e.target.value;
        chart.update();
      }
    });
  }
};

export default ChartWidget;
