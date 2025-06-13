const getUsersSessionStorage = () => {
  if (sessionStorage.getItem('usersessionstorage') !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('usersessionstorage'));
  } else {
    return []
  }
};

export default getUsersSessionStorage;
