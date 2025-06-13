import { classSelector } from '../Selectors.js';
import mobileCatHTMLlist from './mobileCatHTMLlist.js';
import categoryHTMLList from './categoryHTMLList.js';
import productSearchBox from './productSearchBox.js';
import productCheckmarkSet from '../../state/statemanagement/sessionstorage/SET/productCheckmarkSet.js';

const categoriesComponent = (categories) => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.categorylistinpt')) {
      if (categories) {
        const catarr = categories
          .map((v) => mobileCatHTMLlist(v))
          .join('');
        classSelector('categwrapper').innerHTML = catarr;
      }
    }

    if (e.target.matches('.prodbycat')) {
      const { id } = e.target.dataset;
      const url = `index.html?page=products&p=1&c=${id}`;
      productCheckmarkSet({
        checkall: false,
        cat_id: id,
        checkedids: [],
        uncheckedIds: [],
      });
      history.pushState({},null,url)
      sessionStorage.setItem('rend', 2);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.categorylistinpt')) {
      const val = e.target.value;
      if (categories) {
        const catarr = categories
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => mobileCatHTMLlist(v, 'editrentalcat', 'deleterentalcat'))
          .join('');
        classSelector('categwrapper').innerHTML = catarr;
      }
    }

    if (e.target.matches('.search-rental-cat')) {
      const { value } = e.target;
      classSelector('products-categories').innerHTML = categories
        .filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
        .map((v) => categoryHTMLList(v))
        .join(' ');
    }
  });

  if (classSelector('categories-searchbox')) {
    classSelector('categories-searchbox').innerHTML = productSearchBox(
      'Search Categories',
      'search-rental-cat'
    );
  }

  if (classSelector('products-categories')) {
    classSelector('products-categories').innerHTML = categories
      .map((v) => categoryHTMLList(v))
      .join(' ');
  }
};

export default categoriesComponent;
