import trimPhone from '../../share/btn/trimPhone.js'


const sendWhatsapp = (phone, message) => {
  const mobile = trimPhone(phone);

  let num = '233' + mobile;
  if (mobile.startsWith('+')) {
    num = mobile;
  }

  const mess = encodeURIComponent(message);
  window.location.href = `https://wa.me/${num}?text=${mess}`;
};

export default sendWhatsapp;
