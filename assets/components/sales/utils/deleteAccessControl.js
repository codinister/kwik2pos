const deleteAccessControl = (elem, id = '') => {
  const { role_id, user_id } = JSON.parse(localStorage.getItem('zsdf'));

  let output;
  if (role_id === '111' || user_id === id) {
    output = elem;
  } else [(output = '<i class="fa fa-lock"></i>')];
  return output;
};

export default deleteAccessControl;
