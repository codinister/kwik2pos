import fetchApiUrl from '../../../../utils/fetchApiUrl.js';
import industryCheck from '../../../../utils/industryCheck.js';
import urlCode from '../../../../utils/urlCode.js';
import {
  rentalsFilter,
  retailsFilter,
  roofingFilter,
  serviceFilter,
} from './productFilter.js';

const productsprofile = (callback) => {
  Promise.allSettled([
    fetch(fetchApiUrl('productsprofile', 'getStocks') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('productsprofile', 'getSoldProducts') + urlCode()).then(
      (resp) => resp.json()
    ),
  ])
    .then((value) => {
      const products = value[0].value;
      const sales = value[1].value;
      const rentals = rentalsFilter(products, sales);
      const retails = retailsFilter(products, sales);

      const service = serviceFilter(products);
      const roofing = roofingFilter(products);

      if (industryCheck('rentals')) {
        callback({ rentals });
      }
      if (industryCheck('retails')) {
        callback({ retails });
      }
      if (industryCheck('service provider')) {
        callback({ service });
      }
      if (industryCheck('roofing company')) {
        callback({ roofing });
      }
    })
    .catch((err) => console.log(err));
};

export default productsprofile;
