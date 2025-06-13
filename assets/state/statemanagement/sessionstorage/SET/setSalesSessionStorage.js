const setSalesSessionStorage = (obj) => {
  sessionStorage.setItem('sales', JSON.stringify(obj));
};

export default setSalesSessionStorage;
