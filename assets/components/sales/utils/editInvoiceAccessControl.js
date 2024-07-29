
const editInvoiceAcessControl = (elem) => {
  const tx = JSON.parse(localStorage.getItem('taxes'));

  const { user_id, salesinvoice } = JSON.parse(localStorage.getItem('zsdf'));

  const trans_type = tx?.trans_type;
  const usid = tx?.user_id;

  if (trans_type === 'invoice') {
    let output;
    if (user_id === usid && salesinvoice === 'Salesinvoice') {
      output = elem;
    } else [(output = '<i class="fa fa-lock"></i>')];
    return output;
  } else {
    return elem;
  }
};

export default editInvoiceAcessControl;
