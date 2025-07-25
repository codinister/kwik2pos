import {searchInput} from '../InputFields.js'


const table = ({ ...options }) => {

  const { thClass, tbClass, pagClass, searchClass, otherdetails='', custWrapperClass='' } = options;

  return `
  <div class="table-search-box">
  <div>
    ${searchInput({
      inputName: searchClass,
      value: JSON.parse(sessionStorage.getItem('sch'))
    })}
    </div>
    <div>${otherdetails}</div>
    </div>

    <div class="table-wrapper ${custWrapperClass}">
      <table cellspacing="0">
        <thead class="${thClass}"></thead>
        <tbody class="${tbClass}"></tbody>
      </table>
    </div>
    <div class="${pagClass}"></div>
    `;
};

export default table;
