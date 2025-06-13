const calculateVAT = (subtotal, nhil, getfund, covid, v) => {
  const v1 = Number(subtotal) + Number(nhil);
  const v2 = Number(v1) + Number(getfund);
  const v3 = Number(v2) + Number(covid);
  const v4 = Number(v3) * Number(v.vat);
  const vat = Number(v4) / 100;

  return vat;
};

export default calculateVAT;
