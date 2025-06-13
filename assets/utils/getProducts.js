const getProducts = async (callback) => {
  const products = JSON.parse(sessionStorage.getItem('kwikproducts'));
  callback(products);
};
export default getProducts;
