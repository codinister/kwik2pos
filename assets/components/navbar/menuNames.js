const menuNames = (slug, menu_name) => {
  const obj = {
    sales: `<i class="fa fa-cubes"></i> ${menu_name}`,
    users: `<i class="fa fa-users"></i> ${menu_name}`,
    bulksms: `<i class="fa fa-share"></i> ${menu_name}`,
    services: `<i class="fa fa-diamond"></i> ${menu_name}`,
  };

  return obj[slug] || '';
};

export default menuNames;
