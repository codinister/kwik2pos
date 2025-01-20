import tableHeader from './components/tableHeader.js';
import regularTable from './components/regularTable.js';
import durationTable from './components/durationTable.js';
import tableFooter from './components/tableFooter.js';
import transactions from '../../../utils/transactions.js';
import signature from '../../../utils/signature.js';
import note from '../../../utils/note.js';
import terms from '../../../utils/terms.js';

const spagency = ({ ...obj }) => {
  return `
  <div class="invwrapper">
    ${tableHeader(obj)}
    <br />
    ${durationTable(obj)}
    ${regularTable(obj)}
    <br />
    ${transactions(obj)}
        <br />
    ${signature(obj)}
        <br />
    ${note(obj)}
        <br />
    ${terms(obj)}
        <br />    <br />
    ${tableFooter(obj)}
    </div>
    `;
};

export default spagency;
