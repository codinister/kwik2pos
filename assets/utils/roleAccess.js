const roleAccess = () => {
  const role_id = JSON.parse(sessionStorage.getItem('zsdf'))?.user
  return ['1', '111', '5'].includes(role_id);
};

export default roleAccess;


//roleAccess()
