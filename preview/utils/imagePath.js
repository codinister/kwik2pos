const imagePath = () => {
  let path;

  if (localStorage.getItem('zsdf')) {
    path = 'preview/';
  } else {
    path = '';
  }

  return path;
};

export default imagePath;
