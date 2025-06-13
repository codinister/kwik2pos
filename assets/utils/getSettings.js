const getSettings = (callback) => {
  const settings = JSON.parse(sessionStorage.getItem('sinpt'));
  callback(settings);
};

export default getSettings;
