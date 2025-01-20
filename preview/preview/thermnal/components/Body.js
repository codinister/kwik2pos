import  format_number  from '../../../utils/format_number.js';

const Body = ({ ...obj }) => {
  const { items } = obj;

  const rows = Object.values(items).map((v) => {
    if (v.qty > 0) {
      return `<tr>
      <td style="width: 80px;">'.${v.prod_name}</td>
      <td style="width: 40px;">'.${v.qty}</td>
      <td style="width: 60px;">'.${v.unit_price}</td>
      <td style="width: 60px;">${format_number(v.total)}</td>
      </tr>`;
    }
  });

  return `<table>${rows}</table>`;
};

export default Body;
