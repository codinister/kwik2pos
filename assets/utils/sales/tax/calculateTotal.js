const calculateTotal = (sumtotal, v) => {
  const tax = JSON.parse(sessionStorage.getItem('sales'));

  const total =
    Number(sumtotal) + Number(v.transportation) + Number(v.installation);

  const grandtotal = Number(total) - Number(tax?.withholdingtax);

  return grandtotal;
};

export default calculateTotal;
