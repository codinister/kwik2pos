// {
//   key: 'checkmark',
//   data: [{ name: '', value: '' }],
// }

const setSessionStorage = ({ ...options }) => {
  const { key, data } = options;

  if (sessionStorage.getItem(key)) {
    const obj = JSON.parse(sessionStorage.getItem(key));

    data.forEach((v) => {
      obj[v.name] = v.value;
    });

    sessionStorage.setItem(key, JSON.stringify(obj));
  }
};

export default setSessionStorage;
