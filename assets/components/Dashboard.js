import Layout from './Layout.js';
import Chartbox from './widgets/Chartbox.js';
import Totalbox from './widgets/Totalbox.js';
import productsprofile from './data/serverside/fetch/productsprofile.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import usersprofile from './data/serverside/fetch/usersprofile.js';
import { formatMonth, month, year } from './utils/DateFormats.js';
import Customerswhowe from './widgets/Customerswhowe.js';
import format_number from './utils/format_number.js';
import { textInput } from './utils/InputFields.js';
import getIndustry from './utils/getIndustry.js';

const Dashboard = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.accstatement')) {
      const { cust_id } = e.target.dataset;

      window.location = `assets/pdf/accstatement.php?t=${cust_id}`;
    }
  });

  productsprofile((products) => {
    customersprofile((customers) => {
      usersprofile((users) => {
        const customers_total = customers.filter(
          (v) => v.fullname !== 'Anonymous'
        ).length;
        const total_users = users.length;

        const industry = getIndustry();

        let Available = [];
        let prod_desc = '';

        if (industry === 'rentals') {
          prod_desc = 'Available Products';
          Available = products?.rentals.availables.reduce((a, b) => {
            return Number(b.remaining) + a;
          }, 0);
        }

        if (industry === 'retails') {
          prod_desc = 'Total Products';
          Available = products?.retails.stocks.reduce((a, b) => {
            return Number(b.remaining) + a;
          }, 0);
        }

        if (industry === 'service provider') {
          prod_desc = 'Total Services';
          Available = products?.service.length;
        }

        if (industry === 'roofing company') {
          prod_desc = 'Total products';
          Available = products?.roofing.length;
        }

        const dt = new Date();
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

        const owings = customers
          .filter((v) => v.total_debt > 0)
          .map((v) => ({
            cust_id: v.cust_id,
            fullname: v.fullname,
            debt: Number(v.total_debt),
            phone: v.phone,
          }));

        const total_debt = [...owings].reduce((a, b) => {
          return Number(a) + Number(b.debt);
        }, 0);

        document.addEventListener('keyup', (e) => {
          if (e.target.matches('.search-arrears')) {
            const val = e.target.value;
            const res = owings
              .filter((v) =>
                Object.values(v)
                  .join(' ')
                  .toLowerCase()
                  .includes(val.toLowerCase())
              )
              .map(
                (v) => `
                  <tr  class="arrears-table-row">
                    <td>
                    <a href="javascript:void(0);" class="accstatement" data-cust_id="${
                    v.cust_id
                    }">
                    ${v.fullname}
                    </a>
                    </td>
                    <td>${v.phone}</td>
                    <td>${format_number(v.debt)}</td>
                  </tr>
                  `
              )
              .join(' ');

            document.querySelector('.tr-bg').innerHTML = res;
          }
        });

        const page = `
          <section class="dashboard-section">
            <div class="dashboard-container">
              <div class="total-wrapper">
                ${Totalbox('Total Customers', customers_total)}
                ${Totalbox('Total Users', total_users)}
                ${Totalbox(prod_desc, Available)}
              </div>
            </div>
            <div class="dashboard-container">
            <div class="chartbox-wrapper">
                ${Chartbox('display-chart1', sales_labels, [
                  {
                    data: sales_data,
                    label: year(dt) + ' Sales',
                    backgroundColor: colors.slice(0, sales_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}
                ${Chartbox('display-chart2', receipts_labels, [
                  {
                    data: receipts_data,
                    label: year(dt) + ' Receipts',
                    backgroundColor: colors.slice(0, receipts_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}
            </div>
            </div>
            <div class="dashboard-container">
            <div class="chartbox-wrapper">
                ${Chartbox('display-chart3', custs_labels, [
                  {
                    data: custs_data,
                    label: year(dt) + ' Customers',
                    backgroundColor: colors.slice(0, custs_data.length),
                    borderColor: 'rgb(66,92,89)',
                    borderWidth: '1',
                  },
                ])}

                <div>
                <div class="owing-wrapper">

                <div>    
                <div> Arrears: <span>${format_number(total_debt)}</span> </div>
                <div>
                    ${textInput({
                      type: 'text',
                      classname: 'search-arrears',
                      required: true,
                      label: 'Search arrears',
                    })}
                </div>
                </div>

                <div>
                ${Customerswhowe(owings)}
                </div>

                </div>
                </div>


            </div>
            </div>
            </section>
            `;

        document.querySelector('.root').innerHTML = Layout('dashboard', page);
      });
    });
  });
};

export default Dashboard;
