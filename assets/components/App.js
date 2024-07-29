import pageHistory from './utils/pageHistory.js';

pageHistory();

document.addEventListener('click', (e) => {
  if (e.target.matches('.navlinks')) {
    const { navlinks } = e.target.dataset;

    history.pushState(null, '', navlinks);
    pageHistory();
  }

  if (e.target.matches('.fminpt')) {
    e.target.removeAttribute('readonly');
  }
});

window.onpopstate = function (e) {
  pageHistory();
};

window.addEventListener('load', (e) => {
  const getLowStocksAlert = async () => {
    try {
      const fch = await fetch(
        `router.php?controller=products&task=getLowStocksAlert`
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  getLowStocksAlert();
});
