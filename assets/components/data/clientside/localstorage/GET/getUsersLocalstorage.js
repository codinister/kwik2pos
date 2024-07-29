const getUsersLocalstorage = () => {
  if (localStorage.getItem('userlocalstorage') !== 'undefined') {
    return JSON.parse(localStorage.getItem('userlocalstorage'));
  } else {
    return []
  }
};

export default getUsersLocalstorage;
