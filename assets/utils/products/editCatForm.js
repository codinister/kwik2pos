import Buttons from '../Buttons.js';
import { textInput } from '../InputFields.js';
import displayToast from '../displayToast.js';
import productsSessionStorage from '../../state/statemanagement/sessionstorage/default/defaultProductsSessionStorage.js';

const editCatForm = (cat_name) => {

  document.addEventListener('input', (e) => {
    if (e.target.matches('.prod-inpt')) {
      if (!sessionStorage.getItem('prodsessionstorage')) {
        productsSessionStorage();
      }
      const { name, value } = e.target;
      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
      const newobj = { ...obj, [name]: value };
      sessionStorage.setItem('prodsessionstorage', JSON.stringify(newobj));
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.saveCategory')) {
      e.stopImmediatePropagation();

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));

      if (obj?.cat_name.length < 1) {
        return displayToast('bgdanger', 'Category field required!');
      }

      const { cat_id, cat_name } = obj;

      const fd = new FormData();

      fd.append(
        'cat',
        JSON.stringify({
          cat_id,
          cat_name,
        })
      );

      fetch('router.php?controller=products&task=update_category', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          displayToast('lightgreen', data);


          document.body.style.overflow = 'scroll'

          sessionStorage.removeItem('prodsessionstorage');
          sessionStorage.setItem('rend', 2);
        });
    }
  });

  return `
    <div class="prod-form-wrapper">
    <div>
        ${textInput({
          type: 'text',
          classname: 'cat_name prod-inpt',
          name: 'cat_name',
          required: true,
          label: 'Category Name',
          value: cat_name,
        })}

        ${Buttons([
          {
            btnclass: 'saveCategory',
            btnname: 'Update category',
          },
        ])}
    </div>
    <div></div>
    <div></div>
    </div>
    `;
};

export default editCatForm;
