const getLoginuser = () => {
  if (sessionStorage.getItem('zsdf') !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('zsdf'));
  } else {
    return []
  }
};

export default getLoginuser;
