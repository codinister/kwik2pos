import { classSelector } from '../Selectors.js';

export const PaginationLogic = (data) => {
  const search = new URLSearchParams(window.location.search);
  const cur_page = search.get('p');
  const per_page = 10;
  const start_page = Number(cur_page) * Number(per_page) - Number(per_page);
  const end_page = Number(cur_page) * Number(per_page);
  const stocks = [...data].slice(start_page, end_page);
  return stocks;
};

export const PaginationLinks = ({ ...obj }) => {
  const { data, paginationCls } = obj;

  const search = new URLSearchParams(window.location.search);
  const cur_page = search.get('p');
  const cat = search.get('c');
  const ps = search.get('ps');
  const catbool = !!cat;
  const psbool = !!ps;
  const per_page = 10;

  const pageButtons = (cur_page) => {
    let actual_stocks;
    if (catbool) {
      if (psbool) {
        actual_stocks = Object.values(data).filter(
          (v) =>
            v.cat_id === cat &&
            v.prod_size.split(' ').join('').toLowerCase() === ps
        );
      } else {
        actual_stocks = Object.values(data).filter((v) => v.cat_id === cat);
      }
    } else {
      if (psbool) {
        actual_stocks = Object.values(data).filter(
          (v) => v.prod_size.split(' ').join('').toLowerCase() === ps
        );
      } else {
        actual_stocks = data;
      }
    }

    const calc = Number(actual_stocks.length) / Number(per_page);
    const number_of_pages = Math.ceil(calc);

    const pagesOfArr = [];

    for (let i = 1; i <= number_of_pages; i++) {
      pagesOfArr.push(i);
    }

    if (pagesOfArr.length > 0) {
      const last = Number(pagesOfArr.length) - 1;
      const last_page = pagesOfArr[last];
      const lastpage =
        Number(cur_page) < Number(last_page) - 10
          ? '....' +
            `<a href="javascript:void(0)" data-p="${last_page}"  class="pgn ${
              Number(last_page) === Number(cur_page) ? 'active' : ''
            }">${last_page}</a>`
          : '';



      const divd = Number(cur_page) / 10;
      const calc = parseInt(String(divd));

      const sum = Number(calc) * 10 - 1;
      const cur_start_page = Number(sum) < 0 ? 0 : sum;
      const cur_end_page = Number(calc) * 10 + 10;

      classSelector(paginationCls).innerHTML = `
      <div> 
      ${Number(cur_page) > 1 ? '<button class="prev-btn">Prev</button>' : ''}
      </div>
      <div>
  
      ${
        pagesOfArr
          .slice(cur_start_page, cur_end_page)
          .map((v) => {
            return `<a href="javascript:void(0);" 
            data-p="${v}"
             class="pgn ${
               Number(v) === Number(cur_page) ? 'active' : ''
             }">${v}</a>`;
          })
          .join(' ') + lastpage
      }
      
        </div>
        <div>
            ${
              Number(cur_page) < Number(last_page) - 10
                ? '<button class="next-btn">Next</button>'
                : ''
            }
        </div>`;
    }
  };

  function nextFn() {
    const search = new URLSearchParams(window.location.search);
    const cur_page = search.get('p');

    let n = Number(cur_page);

    return () => {
      n++;
      let url = '';
      if (catbool && !psbool) {
        url = `index.html?page=products&p=${n}&c=${cat}`;
      } else if (psbool && catbool) {
        url = `index.html?page=products&p=${n}&c=${cat}&ps=${ps}`;
      } else if (psbool && !catbool) {
        url = `index.html?page=products&p=${n}&ps=${ps}`;
      } else {
        url = `index.html?page=products&p=${n}`;
      }

      history.pushState({}, null, url);
      sessionStorage.setItem('rend', 2);
    };
  }

  function prevFn() {
    const search = new URLSearchParams(window.location.search);
    const cur_page = search.get('p');
    let n = Number(cur_page);

    return () => {
      n--;
      let url = '';

      if (catbool && !psbool) {
        url = `index.html?page=products&p=${n}&c=${cat}`;
      } else if (psbool && catbool) {
        url = `index.html?page=products&p=${n}&c=${cat}&ps=${ps}`;
      } else if (psbool && !catbool) {
        url = `index.html?page=products&p=${n}&ps=${ps}`;
      } else {
        url = `index.html?page=products&p=${n}`;
      }

      history.pushState({}, null, url);
      sessionStorage.setItem('rend', 2);
    };
  }

  function pagesFn(n) {
    let url = '';

    if (catbool && !psbool) {
      url = `index.html?page=products&p=${n}&c=${cat}`;
    } else if (psbool && catbool) {
      url = `index.html?page=products&p=${n}&c=${cat}&ps=${ps}`;
    } else if (psbool && !catbool) {
      url = `index.html?page=products&p=${n}&ps=${ps}`;
    } else {
      url = `index.html?page=products&p=${n}`;
    }

    history.pushState({}, null, url);
    sessionStorage.setItem('rend', 2);
  }

  document.addEventListener('click', (e) => {
    if (e.target.matches('.next-btn')) {
      e.stopImmediatePropagation();
      nextFn()();
    }
    if (e.target.matches('.prev-btn')) {
      e.stopImmediatePropagation();
      prevFn()();
    }
    if (e.target.matches('.pgn')) {
      e.stopImmediatePropagation();
      const { p } = e.target.dataset;
      pagesFn(p);
    }
  });

  pageButtons(cur_page);
};
