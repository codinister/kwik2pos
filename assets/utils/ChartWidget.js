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
      'rgb(68,1,84)',
      'rgb(71,45,123)',
      'rgb(59,82,139)',
      'rgb(44,114,142)',
      'rgb(33,144,140)',
      'rgb(39,173,129)',
      'rgb(93, 200, 99)',
      'rgb(170,220,50)',
      'rgb(253,231,50)',
      'rgb(241,197,229)',
      'rgb(241,173,246)',
      'rgb(245,198,182)',
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
