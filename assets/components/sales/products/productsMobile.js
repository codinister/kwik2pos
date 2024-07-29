import searchBox from '../../utils/searchBox.js';
import Table from '../../utils/Table.js';
import getIndustry from '../../utils/getIndustry.js';
import { classSelector } from '../../utils/Selectors.js';

const productsMobile = (product) => {
  const removenulls = product.filter((v) => v.prod_name !== null);

  const products = Object.values(removenulls).map((v) => ({
    cat_id: v.cat_id,
    createdAt: v.createdAt,
    prod_code: v.prod_code,
    prod_id: v.prod_id,
    prod_image: v.prod_image,
    prod_name: v.prod_name,
    prod_qty: v.prod_qty,
    prod_size: '0',
    selling_price: v.selling_price,
  }));

  const industry = getIndustry();

  const productListFunc = (v) => {
    let rowqty = '';
    if (
      industry === 'service provider' ||
      industry === 'rentals' ||
      industry === 'retailing'
    ) {
      if (v.prod_qty > 0) {
        rowqty = v.prod_qty;
      } else {
        rowqty = '---';
      }
    } else {
      rowqty = '<input type="number" class="row-inpt" value="1" />';
    }

    let proddesc = v.prod_name;
    if (industry === 'retailing' || industry === 'rentals') {
      proddesc = v.prodsize + ' ' + v.prod_name;
    }

    return `
      <ul class="pos-product-table-mobile">
          <li>
          <a 
          class="prodList"
          data-prod_id="${v.prod_id}"
          data-prod_name="${v.prod_name}"
          data-prod_size="${v.prod_size}"
          data-prodsize="${v.prodsize}"
          data-prod_price="${v.selling_price}"
          href="javascript:void(0);">
          ${proddesc}
          </a>
          </li>
          <li>
          ${rowqty}
          </li>

      </ul>`;
  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.searchposproducts-mobile')) {
      const inpt = e.target.value;
      const output = products
        .filter((v) =>
          Object.values(v).join('').toLowerCase().includes(inpt.toLowerCase())
        )
        .map((v) => {
          return productListFunc(v, '', '');
        })
        .join('');

      classSelector('pos-product-output-mobile').innerHTML = output;
    }
  });

  const tableBodyList = Object.values(products)
    .map((v) => {
      if (v.prod_qty > 0) {
        return productListFunc(v);
      }
    })
    .filter(Boolean)
    .sort()
    .join('');

  let rowqty = '';
  if (industry === 'service provider' || industry === 'retailing') {
    rowqty = '<li>Qty</li>';
  }
  if (industry === 'rentals') {
    rowqty = '<li>Available</li>';
  } else {
    rowqty = '<li>Rows</li>';
  }

  return `
 
        <div class="pos-prod-searchbx-mobile">
        ${searchBox('searchposproducts-mobile', 'Search Products')}
        </div>
        ${Table(
          `
          <ul class="pos-product-table-mobile">
          <li>Item</li>
          ${rowqty}
          </ul>`,
          `${tableBodyList}`,
          'pos-product-output-mobile'
        )}

    `;
};

export default productsMobile;
