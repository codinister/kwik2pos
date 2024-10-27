const note = ({ ...obj }) => {
  const {
    taxes: { note },
  } = obj;

  let notes = '';

  if (note.length > 0) {
    notes = `
    <table>
    <tbody>
    <tr> 
    <td>
    <h4>NOTE</h4>
    </td>
    </tr>
    <tr>
    <td>
    ${note}
    For God did not send His son into the word to condermn the world but 
    that the world through him might be saved
    </td>
    </tr>
    </tbody>
    </table>
    `;
  }


 return notes
};

export default note;
