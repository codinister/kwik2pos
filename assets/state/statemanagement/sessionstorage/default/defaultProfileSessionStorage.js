import { ymd } from '../../../../utils/DateFormats.js';

const defaultProfileSessionStorage = () => {
  const date = new Date();

  if (!sessionStorage.getItem('userprofile')) {
    const obj = JSON.parse(sessionStorage.getItem('zsdf'));
    sessionStorage.setItem(
      'userprofile',
      JSON.stringify({
        firstname: obj?.firstname,
        lastname: obj?.lastname,
        email: obj?.email,
        phone: obj?.phone,
        residence: obj?.residence,
        password: '',
        birthdate: ymd(obj?.birthdate),
        photo: obj?.photo,
        signature: obj?.signature,
        createdAt: ymd(date),
      })
    );
  }
};

export default defaultProfileSessionStorage;
