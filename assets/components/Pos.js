import { classSelector } from './utils/Selectors.js';
import products from './sales/products/products.js';
import sales from './sales/sales/sales.js';
import Modalboxtwo from './utils/Modalboxtwo.js';
import Modalboxnoreload from './utils/Modalboxnoreload.js';
import Modalboxfour from './utils/Modalboxfour.js';
import editingMode from './utils/editingMode.js';
import Layout from './Layout.js';
import Modalboxnoreload3 from './utils/Modalboxnoreload3.js';
import rerender from './utils/rerender.js';
import productsMobile from './sales/products/productsMobile.js';
import productsprofile from './data/serverside/fetch/productsprofile.js';
import customersprofile from './data/serverside/fetch/customersprofile.js';
import getIndustry from './utils/getIndustry.js';
import { ymd } from './utils/DateFormats.js';
import availableStockData from './products/utils/availableStockData.js';

const Pos = () => {
  const industry = getIndustry();

  setTimeout(() => {
    const set = JSON.parse(localStorage.getItem('taxes'));
    if (set?.invoice_date.length > 0) {
      if (classSelector('invoice_date')) {
        const date = set?.invoice_date;
        classSelector('invoice_date').valueAsDate = new Date(ymd(date));
      }
    }
  }, 3000);

  //SET AVAILABLE PRODUCTS
  productsprofile((resp) => {
    const prod = availableStockData(resp);

    let availables = [];


    if (industry === 'retails') {
      availables = prod.filter((v) => v.remaining > 0).map((v) => v);
    } else {
      availables = prod.filter((v) => v.prod_qty > 0).map((v) => v);
    }

    let prods = [];
    if (industry === 'service provider' || industry === 'roofing company') {
      prods = prod;
    } else {
      prods = availables;
    }

    classSelector('pos-products').innerHTML = products(prods);

    document.addEventListener('click', (e) => {
      //MODAL BOX FIVE
      if (e.target.matches('.additems')) {
        classSelector('noreload3').classList.add('show');
        classSelector('salesitems').innerHTML = productsMobile(availables);
        document.body.style.overflow = 'hidden';
      }
    });
  });

  customersprofile((cust) => {
    const customers = cust
      .map((v) => ({
        cust_id: v.cust_id,
        fullname: v.fullname,
        phone: v.phone,
        email: v.email,
        location: v.location,
        user_id: v.user_id,
        debt: v.totdebt,
        type: v.type,
        ref_type: v.ref_type,
        description: v.description,
        firstname: v.firstname,
        lastname: v.lastname,
        inv_total: v.totinvamnt,
        inv_list: v.invlist,
        rec_total: v.totrecamnt,
        rec_list: v.reclist,
        sales: v.totinvamnt,
        payments: v.totrecamnt,
        balance: v.totdebt,
      }))
      .flat(2);


    

    const receipts = cust.map((v) => v.receipt_list).flat(2);
    const proforma = cust.map((v) => v.proforma_list).flat(2);
    const invoice = cust.map((v) => v.invoice_list).flat(2);

    classSelector('pos-sales').innerHTML = sales(
      customers,
      receipts,
      proforma,
      invoice
    );
  });

  const tax = JSON.parse(localStorage.getItem('taxes'));

  if (tax?.cust_name) {
    if (classSelector('customerhiddeninpt')) {
      classSelector('customerhiddeninpt').value = tax?.cust_id;
    }

    setTimeout(() => {
      if (classSelector('customerinptclass')) {
        classSelector('customerinptclass').value = tax?.cust_name;
      }
    }, 1000);
  }

  const page = `

    <div class="pos-container">

        <div class="pos-products-wrapper">
        <div class="pos-sales"></div>
        <div class="pos-products"></div>
        </div>


    </div>




    ${Modalboxtwo('', `<div class="addcustomerwrapper"></div>`)}

    ${Modalboxnoreload(
      '',
      `<div class="viewcustomerwrapper hide-on-mobile"></div>
    <div class="viewcustomerwrapper-mobile hide-on-desktop"></div>
    `
    )}
  
    ${Modalboxfour('', `<div class="sendemailorwhatsapp"></div>`)}

    <div class="hide-on-desktop">
    ${Modalboxnoreload3('', `<div class="salesitems"></div>`)}
    </div>

    ${editingMode()}
    `;

  document.querySelector('.root').innerHTML = Layout('sell', page);
};

rerender(Pos, 3);

export default Pos;
