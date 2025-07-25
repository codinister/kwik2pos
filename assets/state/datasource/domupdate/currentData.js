
import searchParam from '../../../utils/searchParam.js'


const currentData = (customers,products,users,user_id) => {
  const page = searchParam();
  
  let data = [];
  if (page === 'sales') {
    data = customers;
  } else if (page === 'products') {
    data = products;
  } else {
    if (page === 'users') {
      data = users;
    } else {
      data = users.filter((v) => v.user_id !== user_id);
    }
    return data
  }
};

export default currentData;
