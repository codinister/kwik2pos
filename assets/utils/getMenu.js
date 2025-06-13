const getMenu = (callback) => {
  const { menus } = JSON.parse(sessionStorage.getItem('zsdf'));
  callback(menus);
};
export default getMenu;
