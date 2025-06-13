const linkshareSessionStorage = () => {
  if (!sessionStorage.getItem('linkshare')) {
    sessionStorage.setItem(
      'linkshare',
      JSON.stringify({
        phone: '',
        email: '',
        link: '',
      })
    );
  }
};

export default linkshareSessionStorage;
