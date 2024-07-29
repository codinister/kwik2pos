const updateTaxlocalstorage = (name, val) => {
  if (localStorage.getItem('taxes')) {
    const tx = JSON.parse(localStorage.getItem('taxes'));
    tx[name] = val;
    localStorage.setItem('taxes', JSON.stringify(tx));
  }
};

export default updateTaxlocalstorage;
