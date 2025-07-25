import menuNames from "./menuNames.js";

const menuLink = (menu) => {
  const arr = ['sales', 'users', 'bulksms', 'services'];

  const result = Object.values(menu).filter((v) => arr.includes(v.slug));

  return result.map((v) => {
    return `<li>
          <a class="navlinks"  
          href="javascript:void(0);"   
          data-navlinks = "?page=${v.slug}">
          ${menuNames(v.slug, v.menu_name)} 
          </a>
          </li>`;
  }).join(' ');
};

export default menuLink;
