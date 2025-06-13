import { expdate_left } from './DateFormats.js';
import industryCheck from './industryCheck.js';

const soldProducts = (sales) => {


  let salesobj = [];

  if (sales) {
    if (industryCheck('rentals', 'service provider')) {
      const ss = Object.values(sales).map((v) => ({
        s_id: v.s_id,
        prod_name: v.prod_name,
        exp_date: v.exp_date,
        days_remain: expdate_left(v.exp_date),
      }));

      salesobj = Object.values(sales).filter(
        (v) => expdate_left(v.exp_date) > 1
      );
    } else {
      salesobj = sales;
    }
  }

  return salesobj;
};

export default soldProducts;
