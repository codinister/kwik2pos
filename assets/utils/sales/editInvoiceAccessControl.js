import roleAccess from '../roleAccess.js';
const editInvoiceAcessControl = (elem) => {
  const tx = JSON.parse(sessionStorage.getItem('sales'));

  const { user_id } = JSON.parse(sessionStorage.getItem('zsdf'));


  const trans_type = tx?.trans_type;
  const usid = user_id === tx?.user_id;

  if (trans_type === 'invoice') {
    let output;
    if (roleAccess() || usid) {
      output = elem;
    } else {
      output = '<i class="fa fa-lock"></i>';
    }

    return output;
  } else {
    return elem;
  }
};

export default editInvoiceAcessControl;
