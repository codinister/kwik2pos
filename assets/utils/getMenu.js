import getLoginuser from "../state/sessionstorage/GET/getLoginuser.js";

const getMenu = () => {
 const menu = getLoginuser('menu');
 return menu.filter((v) => v.slug !== 'privilige');
}

export default getMenu