const updateTaxsessionstorage = (name, val) => {
  if (sessionStorage.getItem('sales')) {
    const tx = JSON.parse(sessionStorage.getItem('sales'));
    tx[name] = val;
    sessionStorage.setItem('sales', JSON.stringify(tx));
  }
};

export default updateTaxsessionstorage;
