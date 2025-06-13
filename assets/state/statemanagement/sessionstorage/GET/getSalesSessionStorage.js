const getSalesSessionStorage = () => {
  const obj = JSON.parse(sessionStorage.getItem('sales'));
  return obj;
};

export default getSalesSessionStorage;
