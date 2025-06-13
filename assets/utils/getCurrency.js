const getCurrency = () => {
  const cur = JSON.parse(sessionStorage.getItem('sinpt'));

  if (cur?.currency) {
    return cur?.currency;
  } else {
    return 'GHs';
  }
};

export default getCurrency;
