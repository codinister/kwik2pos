const setProductsSessionStorage = (obj) => {
  sessionStorage.setItem('prodsessionstorage', JSON.stringify(obj));
};

export default setProductsSessionStorage;
