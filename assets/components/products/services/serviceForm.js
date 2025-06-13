import dataListDropdown from '../../../utils/dataListDropdown.js';
import imageUpload from '../../../utils/imageUpload.js';
import getCurrency from '../../../utils/getCurrency.js';
import Buttons from '../../../utils/Buttons.js';
import { classSelector } from '../../../utils/Selectors.js';
import { textInput } from '../../../utils/InputFields.js';
import productsSessionStorage from '../../../state/statemanagement/sessionstorage/default/defaultProductsSessionStorage.js';
import displayToast from '../../../utils/displayToast.js';
import { dmy, formatDate, ymd } from '../../../utils/DateFormats.js';

const serviceForm = (categories) => {
  const currency = getCurrency();

  const categoryHTMLList = (v) => {
    return `<div class="list-box">
      <div>
        <a href="javascript:void(0);" data-id="${v.cat_id}" data-name="${v.cat_name}" class="pro-cat">
        ${v.cat_name}
        </a>
      </div>
    </div>`;
  };

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.category-inpt')) {
      const { value } = e.target;
      classSelector('productcatwrappper').innerHTML = categories
        .filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
        .map((v) => categoryHTMLList(v))
        .join(' ');

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
      obj['cat_id'] = '';
      obj['cat_name'] = value;

      sessionStorage.setItem('prodsessionstorage', JSON.stringify(obj));
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.prod-inpt')) {
      if (!sessionStorage.getItem('prodsessionstorage')) {
        productsSessionStorage();
      }

      const { name, value, id } = e.target;

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));

      if (id === 'pqt') {
        const newobj = {
          ...obj,
          prod_qty_arr: {
            ...obj?.prod_qty_arr,
            [name]: {
              prod_qty: value,
              qty_id: obj?.prod_qty_arr[name]?.qty_id || '',
              createdAt: obj?.prod_qty_arr[name]?.createdAt || ymd(new Date()),
            },
          },
        };
        sessionStorage.setItem('prodsessionstorage', JSON.stringify(newobj));
      } else {
        const newobj = { ...obj, [name]: value };
        sessionStorage.setItem('prodsessionstorage', JSON.stringify(newobj));
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.delete-qty')) {
      e.stopImmediatePropagation();
      const { qty_id } = e.target.dataset;

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));

      if (Object.values(obj?.prod_qty_arr).length < 2) {
        return displayToast('bgdanger', "You can't delee this item!");
      }

      if (confirm('Are you sure you want to delete!')) {
        fetch(`router.php?controller=products&task=delete_qty&id=${qty_id}`)
          .then((resp) => resp.text())
          .then((data) => {
            sessionStorage.setItem('rend', 2);
          });
      } else {
      }
    }

    if (e.target.matches('.category-inpt')) {
      classSelector('productcatwrappper').innerHTML = categories
        .map((v) => categoryHTMLList(v))
        .join(' ');
    }

    if (e.target.matches('.pro-cat')) {
      const { name, id } = e.target.dataset;

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
      obj['cat_id'] = id;
      obj['cat_name'] = name;

      sessionStorage.setItem('prodsessionstorage', JSON.stringify(obj));
    }

    if (e.target.matches('.saveservice')) {
      e.stopImmediatePropagation();
      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));

      if (obj?.cat_name.length < 1) {
        return displayToast('bgdanger', 'Category field required!');
      }
      if (obj?.prod_name.length < 1) {
        return displayToast('bgdanger', 'Service name required!');
      }
      // if (obj?.prod_qty_arr?.prod_qty?.prod_qty?.length < 1) {
      //   return displayToast('bgdanger', 'Product quantity required!');
      // }
      // if (Object.values(obj?.prod_qty_arr).length < 1) {
      //   return displayToast('bgdanger', 'Product quantity required!');
      // }
      // if (obj?.prod_size.length < 1) {
      //   return displayToast('bgdanger', 'Product size required!');
      // }
      if (obj?.selling_price.length < 1) {
        return displayToast('bgdanger', 'Unit price required!');
      }

      let fileUpload = '';
      if (
        classSelector('prod-img-inpt').files &&
        classSelector('prod-img-inpt').files[0]
      ) {
        fileUpload = classSelector('prod-img-inpt').files[0];
      }

      //obj['prod_qty_arr'] = Object.values(obj.prod_qty_arr);

      const {
        cat_id,
        cat_name,
        createdAt,
        prod_code,
        prod_id,
        prod_image,
        prod_name,
        prod_qty_arr,
        prod_size,
        selling_price,
      } = obj;

      const fd = new FormData();
      fd.append('file', fileUpload);
      fd.append(
        'product',
        JSON.stringify({
          cat_id,
          cat_name,
          createdAt,
          prod_code,
          prod_id,
          prod_image,
          prod_name,
          prod_size,
          selling_price,
        })
      );

      fd.append('qty', JSON.stringify(prod_qty_arr));

      fetch('router.php?controller=products&task=save_product', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            return displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', data);

            sessionStorage.removeItem('prodsessionstorage');
            if (
              classSelector('prod-img-inpt').files &&
              classSelector('prod-img-inpt').files[0]
            ) {
              classSelector('prod-img-inpt').files = null;
            }
            document.body.style.overflow = 'scroll';
            sessionStorage.setItem('rend', 2);
          }
        });
    }
  });

  window.addEventListener('load', (e) => {
    const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
    classSelector('category-inpt').value = obj?.cat_name;
  });

  const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));

  //let qty_list = '<h6>Quantity List</h5>';
  let prodimg = '<h6>Image Preview</h5>';

  // if (obj?.prod_id > 0) {
  //   qty_list =
  //     '<strong>Quantity List</strong>' +
  //     Object.values(obj?.prod_qty_arr)
  //       .map(
  //         (v) => `
  //       <div class="prod-qty-cont">
  //       <span>
  //       <input type="number" id="pqt" name="prod_qty${
  //         v.qty_id
  //       }"  required value="${v.prod_qty}" class="prod_qty_inpt prod-inpt" />
  //       </span>
  //       <span>${formatDate(v.createdAt)}</span>
  //       <span>
  //         <i class="fa fa-trash fa-lg delete-qty" title="Delete qty" data-qty_id="${
  //           v.qty_id
  //         }"></i>
  //       </span>
  //       </div>

  //   `
  //       )
  //       .join(' ');
  // }

  if (obj?.prod_image.length > 0) {
    prodimg = `<img src="assets/uploads/${obj?.prod_image}" />`;
  }

  return `
    <div class="prod-form-wrapper">

    <div>
        ${dataListDropdown(
          textInput,
          'category-inpt',
          'Select or add new category',
          'cat_id',
          'pro-cat',
          'productcatwrappper',
          `${obj?.cat_name}`
        )}

        ${textInput({
          type: 'text',
          classname: 'prod_name prod-inpt',
          name: 'prod_name',
          required: true,
          label: 'Service Name',
          value: obj?.prod_name,
        })}

        ${textInput({
          type: 'number',
          classname: 'selling_price prod-inpt',
          name: 'selling_price',
          required: true,
          label: `Unit Price (${currency})`,
          value: obj?.selling_price,
        })}
    </div>

    <div>



        ${textInput({
          type: 'text',
          classname: 'prod_code	prod-inpt',
          name: 'prod_code',
          required: false,
          label: 'Service Code',
          value: obj?.prod_code,
        })}

        ${imageUpload('prod-img', 'prod-img-inpt')}
    </div>

    <div>
        <div class="prod-img-preview">
        ${prodimg}
        </div>
    </div>

    </div>

    ${Buttons([
      {
        btnclass: 'saveservice',
        btnname: 'Save service',
      },
    ])}
    `;
};

export default serviceForm;
