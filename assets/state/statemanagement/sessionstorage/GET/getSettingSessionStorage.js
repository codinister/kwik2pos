const getSettingSessionStorage = () => {
  if (sessionStorage.getItem('sinpt') !== 'undefined') {
    return JSON.parse(sessionStorage.getItem('sinpt'));
  } else {
    return []
  }
};

export default getSettingSessionStorage;
