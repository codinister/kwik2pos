const checkmarkFn2 = (prod) => {
  const obj = JSON.parse(sessionStorage.getItem('checkmark'));

  const cat_id = !!obj?.cat_id;
  const prod_size = !!obj?.prod_size;
  const prodsize = obj?.prod_size;
  const catid = obj?.cat_id;
  const checkall = obj?.checkall;

  if (checkall && cat_id) {
    //Select products based on cat_id
    const uncheckedArr = obj?.uncheckedIds;

    let data = '';

    if (prod_size) {
      data = prod
        .filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize && v.cat_id === catid;
        })
        .filter((v) => !uncheckedArr.includes(v.prod_id));
    } else {
      data = prod
        .filter((v) => v.cat_id === catid)
        .filter((v) => !uncheckedArr.includes(v.prod_id));
    }

    return data;
  } else if (checkall && !cat_id) {
    //Select all products
    const uncheckedArr = obj?.uncheckedIds;

    let data = '';

    if (prod_size) {
      data = prod
        .filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize;
        })
        .filter((v) => !uncheckedArr.includes(v.prod_id));
    } else {
      data = prod.filter((v) => !uncheckedArr.includes(v.prod_id));
    }

    return data;
  } 
  else if (obj?.checkedids.length > 0) {
    //Select products based on prod_id s
    const checkedArr = obj?.checkedids;
    return prod.filter((v) => checkedArr.includes(v.prod_id));
  }
  else {
    let data = [];
    if (cat_id) {
      if (prod_size) {
        data = prod.filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize && v.cat_id === catid;
        });
      } else {
        data = prod.filter((v) => v.cat_id === catid);
      }
    } else {
      if (prod_size) {
        data = prod.filter((v) => {
          const val = v.prod_size.split(' ').join('').toLowerCase();
          return val === prodsize;
        });
      } else {
        data = prod;
      }
    }
    return data;
  }
};

export default checkmarkFn2;
