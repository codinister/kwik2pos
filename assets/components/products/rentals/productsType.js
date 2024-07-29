const productsType = () => {
  return `
    <select class="products-type">
      <option value="stocks">All Products</option>
      <option value="rented">Rented Products</option>
      <option class="available" value="available">Available Products</option>
    </select>
  `;
};

export default productsType;



