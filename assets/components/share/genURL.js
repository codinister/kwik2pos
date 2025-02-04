const genURL = (tax_id, user_id, code, cust_id, pay_id) => {
  // const url = `https://www.kwik2pos.com`;

  const url = `http://localhost/kwikpos`;
  
  if (pay_id.length > 0) {
    return `
    ${url}/preview/reciepts.html?pyid=${btoa(pay_id)}&usd=${btoa(user_id)}
    txid=${btoa(tax_id)}&cde=${code}&cusd=${btoa(cust_id)}
    `;
  } else {
    return `
    ${url}/preview/invoices.html?txd=${btoa(tax_id)}&usd=${btoa(user_id)}&cde=${code}&cusd=${btoa(cust_id)}
    `;
  }
};

export default genURL;
