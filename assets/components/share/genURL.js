const genURL = (tax_id, user_id, code, cust_id, pay_id) => {
  const url = `https://www.kwik2pos.com`;
  if (pay_id.length > 0) {
    return `
    ${url}/preview/reciepts.html?pyid=${pay_id}&usd=${user_id}
    txid=${tax_id}&cde=${code}&cusd=${cust_id}
    `;
  } else {
    return `
    ${url}/preview/invoices.html?txd=${tax_id}&usd=${user_id}&cde=${code}&cusd=${cust_id}
    `;
  }
};

export default genURL;
