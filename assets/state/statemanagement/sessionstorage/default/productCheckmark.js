const productCheckmark = (prodType) => {
  sessionStorage.setItem(
    'checkmark',
    JSON.stringify({
      prodType,
      checkall: false,
      cat_id: '',
      prod_size: '',
      checkedids: [],
      uncheckedIds: [],
    })
  );
};

export default productCheckmark;
