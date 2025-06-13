import filterResult from './filterResult.js';

const checkmarkFn = (prod) => {
  const obj = JSON.parse(sessionStorage.getItem('checkmark'));

  const cat_id = !!obj?.cat_id;
  const prod_size = !!obj?.prod_size;
  const prodsize = obj?.prod_size;
  const catid = obj?.cat_id;
  const checkall = obj?.checkall;

  if (checkall && cat_id) {
    //Select products based on cat_id

    let data = '';

    if (prod_size) {
      const psize = prod.filter((v) => {
        const val = v.prod_size.split(' ').join('').toLowerCase();
        return val === prodsize && v.cat_id === catid;
      });
      data = filterResult(psize);
    } else {
      const catdata = prod.filter((v) => v.cat_id === catid);
      data = filterResult(catdata);
    }

    return data;
  } else if (checkall && !cat_id) {
    //Select all products

    let data = '';

    if (prod_size) {
      const psize = prod.filter((v) => {
        const val = v.prod_size.split(' ').join('').toLowerCase();
        return val === prodsize;
      });
      data = filterResult(psize);
    } else {
      data = filterResult(prod);
    }

    return data;
  } else {
    let data = [];
    if (cat_id) {
      if (prod_size) {
        const psize = prod.filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize && v.cat_id === catid;
        });
        data = filterResult(psize);
      } else {
        const catdata = prod.filter((v) => v.cat_id === catid);
        data = filterResult(catdata);
      }
    } else {
      if (prod_size) {
        const psize = prod.filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize;
        });
        data = filterResult(psize);
      } else {
        data = filterResult(prod);
      }
    }

    return data;
  }
};

export default checkmarkFn;
