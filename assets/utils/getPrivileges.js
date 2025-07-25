import getLoginuser from "../state/sessionstorage/GET/getLoginuser.js";

const getPrivileges = () => {
 const menu = getLoginuser('menu');
 return menu.filter((v) => v.slug === 'privilege');
}

export default getPrivileges