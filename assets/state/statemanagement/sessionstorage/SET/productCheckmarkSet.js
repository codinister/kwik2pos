const productCheckmarkSet = ({ ...options }) => {
  if (sessionStorage.getItem('checkmark')) {
    const { checkall, cat_id, checkedids, uncheckedIds, prod_size } = options;

    const obj = JSON.parse(sessionStorage.getItem('checkmark'));

    obj['checkall'] = checkall;
    obj['cat_id'] = cat_id;
    obj['prod_size'] = prod_size;
    obj['checkedids'] = [...checkedids];
    obj['uncheckedIds'] = [...uncheckedIds];

    sessionStorage.setItem('checkmark', JSON.stringify(obj));
  }
};

export default productCheckmarkSet;
