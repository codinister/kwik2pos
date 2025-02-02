import  format_number  from '../../../utils/format_number.js';

const Body = ({ ...obj }) => {
  const { items } = obj;

  const rows = Object.values(items).map((v) => {
    if (v.qty > 0) {
      return `<tr>
      <td style="width: 8rem;">${v.prod_name}</td>
      <td style="width: 4rem; text-align: center;">${v.qty}</td>
      <td style="width: 6rem;">${v.unit_price}</td>
      <td style="width: 6rem;">${format_number(v.total)}</td>
      </tr>`;
    }
  }).join(' ');

  return `<table>${rows}</table>`;
};

export default Body;
