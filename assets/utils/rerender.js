const rerender = (fn, num) => {
  const rend = sessionStorage.getItem('rend');

  if (rend == num) {
    fn();
    sessionStorage.setItem('rend', num);
  }

  setTimeout(() => {
    rerender(fn, num);
  }, 1000);
};

export default rerender;
