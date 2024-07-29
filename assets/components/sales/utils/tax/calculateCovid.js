const calculateCovid = (subtotal, v) => {
  const covid = (Number(subtotal) * Number(v.covid)) / 100;
  return covid;
};

export default calculateCovid

