const getSuperadmin = () => {
  const { superadmin } = JSON.parse(sessionStorage.getItem('zsdf'));
  return superadmin;
};
export default getSuperadmin;
