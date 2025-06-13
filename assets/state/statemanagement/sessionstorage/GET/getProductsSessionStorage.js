const getProductsSessionStorage = () => {
  const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
  return obj;
};

export default getProductsSessionStorage;
