const getUserid = () => {
  const { user_id } = JSON.parse(sessionStorage.getItem('zsdf'));
  return user_id;
};

export default getUserid;
