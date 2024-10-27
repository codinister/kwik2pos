const linkshareLocalstorage = () => {
  if (!localStorage.getItem('linkshare')) {
    localStorage.setItem(
      'linkshare',
      JSON.stringify({
        phone: '',
        email: '',
        link: '',
      })
    );
  }
};

export default linkshareLocalstorage;
