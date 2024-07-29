const sumTaxes = (subtotal, nhil, getfund,covid, vat) => {
  const taxTotal =
    Number(nhil) + Number(getfund) + Number(covid) + Number(vat) + Number(subtotal);
  return taxTotal;
};

export default sumTaxes;
