import { ym } from '../DateFormats.js';

const filterResult = (proddata) => {

  const obj = JSON.parse(sessionStorage.getItem('checkmark'));
  const search = obj?.search;
  const expiries = obj?.expiries;
  const searchBoolean = !!obj?.search;
  const expiriesBoolean = !!obj?.expiries;

  let data = [];

  if (expiriesBoolean) {
    const expdata = [...proddata].filter((v) => ym(v.exp_date) === ym(expiries));
    if (searchBoolean) {
      data = [...expdata].filter((v) =>
        Object.values(v).join(' ').toLowerCase().includes(search.toLowerCase())
      );
    } else {
      data = expdata;
    }
  } else {
    if (searchBoolean) {
      data = [...proddata].filter((v) =>
        Object.values(v).join(' ').toLowerCase().includes(search.toLowerCase())
      );
    } else {
      data = proddata;
    }
  }

  return data;

};

export default filterResult;
