const getRoleid = () => {
  const { role_id } = JSON.parse(sessionStorage.getItem('zsdf'))?.user;
  return role_id;
};

export default getRoleid;
