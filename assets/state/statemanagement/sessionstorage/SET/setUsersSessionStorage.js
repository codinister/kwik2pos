const setUsersSessionStorage = (obj) => {
  sessionStorage.setItem('usersessionstorage', JSON.stringify(obj));
};

export default setUsersSessionStorage;
