import roleAccess from "../roleAccess.js";

const deleteAccessControl = (elem, id = '') => {
  const { user_id } = JSON.parse(sessionStorage.getItem('zsdf'));

  let output;
  if (roleAccess() || user_id === id) {
    output = elem;
  } else [(output = '<i class="fa fa-lock"></i>')];
  return output;
};

export default deleteAccessControl;
