import getPerpage from './getPerpage.js';

const divideFn = (cur_page, per_page) => {
  const divide = Number(cur_page) / per_page;

  let loop_start;
  let loop_end;

  if (String(divide).indexOf('.') != -1) {
    const res = Number(cur_page) / per_page;
    loop_start = parseInt(res) * per_page;
    loop_end = per_page * (parseInt(res) + 1);
  } else {
    const subt = Number(cur_page) - 1;
    const res = Number(subt) / per_page;
    loop_start = cur_page - 2;
    loop_end = loop_start + per_page;
  }

  return { loop_start, loop_end };
};

const paginationBtn = (length) => {
  
  const p = new URLSearchParams(window.location.search);
  const cur_page = p.get('p') || 1;
  const per_page = Number(getPerpage());

  const { loop_start, loop_end } = divideFn(cur_page, per_page);



  const arr = [];
  for (let i = 0; i <= length - 1; i++) {
    arr.push(i);
  }

  const arrSlice = arr.slice(loop_start, loop_end);

  const arrResult = arrSlice
    .map((v, k) => {
      const num = v + 1;
      return `
      <a href="javascript:void(0);" class="${cur_page == num && 'pgn-btn-active'} pgn-btn" data-num="${num}">
      ${num}
      </a>
      `;
    })
    .join(' ');


  const total_length =   loop_end >= length ? '' : `...<a href="javascript:void(0);" class="${cur_page == length && 'pgn-btn-active'} pgn-btn" data-num="${length}">
  ${length}
  </a>`

  const initial_num =   loop_end > per_page ?  `<a href="javascript:void(0);" class="${cur_page == 1 && 'pgn-btn-active'} pgn-btn" data-num="1">
  1
  </a>...` : ''

  return `<div class="pagination-btns">
  ${cur_page > 1 ? '<button class="prev-btn">Prev</button>' : ''}
  <div>${initial_num} ${arrResult} ${total_length}</div>
  ${cur_page < length ? '<button class="next-btn">Next</button>' : ''}
  </div>`;

  
};

export default paginationBtn;
