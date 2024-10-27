const terms = ({ ...obj }) => {
  const {
    settings: { comp_terms },
    taxes: { trans_type },
  } = obj;

  let terms = '';
  if (comp_terms.length > 0 && trans_type === 'proforma') {
    terms = html_entity_decode(comp_terms);
  }

  return `
  <table>
  <tbody>
  <tr>
  <td>
  ${terms} 
  </td>
  </tr>
  </tbdoy>
  </table>
  
  `
};

export default terms;
