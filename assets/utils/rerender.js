const rerender = (fn, num) => {
  const rend = sessionStorage.getItem('rend');

  if (rend == num) {
    fn();
    sessionStorage.setItem('rend', 0);
  }

  setTimeout(() => {
    rerender(fn, num);
  }, 1000);
};

export default rerender;
