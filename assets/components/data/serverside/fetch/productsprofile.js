

import {rentalsFilter,retailsFilter,roofingFilter, serviceFilter } from '../filters/productFilter.js'


import getIndustry from '../../../utils/getIndustry.js'

const productsprofile = (callback) => {
  const baseURL = 'router.php?controller=productsprofile&task';
  Promise.allSettled([
    fetch(`${baseURL}=getStocks`).then((resp) => resp.json()),
    fetch(`${baseURL}=getSoldProducts`).then((resp) => resp.json()),
  ])
    .then((value) => {

      const industry = getIndustry()

      const products = value[0].value;
      const sales = value[1].value;

      const rentals = rentalsFilter(products, sales);
      const retails = retailsFilter(products, sales);
      const service = serviceFilter(products);
      const roofing = roofingFilter(products);


      if (industry === 'rentals') {
  
        callback({rentals});
      }
      if (industry === 'retails') {
        callback({retails});
      }
      if (industry === 'service provider') {
        callback({service});
      }
      if ( industry === 'roofing company') {
        callback({roofing});
      }


    })
    .catch((err) => console.log(err));
};

export default productsprofile;
