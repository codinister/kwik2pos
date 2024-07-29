import format_number from '../../utils/format_number.js';
import { classSelector } from '../../utils/Selectors.js';
import editInvoiceAcessControl from './editInvoiceAccessControl.js';
import { unitprice, invoicedesc } from '../utils/activateInvoiceinputs.js';

const editInvoiceDetails = (data, trans_type = '') => {
  const { products, taxes } = data;

  if (trans_type === 'proforma') {
    taxes['trans_type'] = 'proforma';
  } else {
    taxes['trans_type'] = 'invoice';
  }

  let numbering = 1;

  const productsListItems = (v, k) => {
    if (v?.prod_id) {
      const total_length = Number(v.prod_size) ? Number(v.prod_size) : 1;
      const total_amnt =
        Number(v.qty) * Number(total_length) * Number(v.prod_price);

      products[k].total = total_amnt;

      return `
          <ul class="sales-table">
          <li>${numbering++}</li>
          <li>
          <input type="text" name="qty" data-key="${k}" value="${
        v.qty
      }" class="qty sumitems" />
          </li>
          <li>

          <input type="text" name="prod_name" data-key="${k}" 
          value="${v.prod_name}" ${invoicedesc} class="prod_name schprod " />
          
          </li>
          <li>
          <input class="sumitems" name="prod_size" type="text" data-key="${k}" value="${
        v.prod_size
      }" class="prod_size" />
          </li>
          <li>
          <input class="sumitems" name="prod_price" type="text" data-key="${k}" 
          value="${v.prod_price}" ${unitprice} class="prod_price" />
          </li>
          <li>
          <span class="total${k}">
          ${format_number(total_amnt)}
          </span>
          </li>
          <li>
          ${editInvoiceAcessControl(
            `<i class="fa fa-trash delete-item" data-s_id="${v.s_id}"  data-trash="${k}"></i>`
          )}
          </li>
          </ul>
        `;
    }
  };

  const prods = products.map((v, k) => productsListItems(v, k)).join('');

  const subtotal =
    Number(taxes?.transportation) +
    Number(taxes?.installation) +
    Number(taxes?.sub_total);

  const discount = Number(subtotal) - Number(taxes?.discount);
  const withholdtax = Number(discount) - Number(taxes?.withholdingtax);
  const checktax = taxes?.total > withholdtax ? true : false;

  const subt = Number(taxes?.total) - Number(taxes?.withholdingtax);

  const withholdchecked = taxes?.total > subt;

  if (classSelector('pos-sales-output')) {
    classSelector('pos-sales-output').innerHTML = prods;

    if (!taxes?.pay_type) {
      taxes['pay_type'] = 'Cash';
    }

    if (classSelector('balance')) {
      classSelector('balance').value = taxes?.balance;
    }
    //classSelector('payment').value = taxes?.payment;
    classSelector('total').value = taxes?.total;

    if (classSelector('top_total')) {
      classSelector('top_total').textContent = taxes?.total;
    }

    if (classSelector('tax-inpt')) {
      classSelector('tax-inpt').checked = checktax;
    }

    if (classSelector('with-tax-inpt')) {
      classSelector('with-tax-inpt').checked = withholdchecked;
      taxes['withholdingchecked'] = withholdchecked;
    }

    if (classSelector('estimatorinptclass')) {
      classSelector('estimatorinptclass').value = taxes?.est_name;
    }

    classSelector('customerinptclass').value = taxes?.cust_name;
    classSelector('customerhiddeninpt').value = taxes?.cust_id;
    classSelector('sub_total').value = taxes?.sub_total;
    classSelector('discount').value = taxes?.discount;
    classSelector('pay_type').value = taxes?.pay_type || 'Cash';
    classSelector('profile').value = taxes?.profile;

    if (classSelector('location')) {
      classSelector('location').value = taxes?.location;
    }

    if (classSelector('transportation')) {
      classSelector('transportation').value = taxes?.transportation;
    }

    if (classSelector('installation')) {
      classSelector('installation').value = taxes?.installation;
    }

    localStorage.setItem('taxes', JSON.stringify(taxes));
    localStorage.setItem('prozdlist', JSON.stringify(products));
  }
};

export default editInvoiceDetails;
