import sessionGet from '../GET/sessionGet.js'

const getLoginuser = (name) => {

  const res = sessionGet('zsdf');
  if (name === 'settings') return res?.settings;
  else if (name === 'user') return res?.user;
  else if (name === 'menu') return res?.menu;
  else return [];
};

export default getLoginuser;
