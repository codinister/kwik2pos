import getSignature from './getSignature.js';

const signature = ({ ...obj }) => {
  const { fullname, signatures } = obj;

  const sign = getSignature(signatures, fullname);

  return `
    <table>
      <tbody>

        <tr>
        <td style="width: 60rem;"></td>


        <td style="width: 8.5rem;  text-align: center;">
        <div>
        ${sign}
        <br />
        </div>
        Signature
        </td>

        </tr>

      </tbody>
    </table>
`;
};

export default signature;
