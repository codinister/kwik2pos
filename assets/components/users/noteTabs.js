import { classSelector } from '../utils/Selectors.js';
import Table from '../utils/Table.js';
import { formatDate } from '../utils/DateFormats.js';

const noteTabs = (details) => {
  const data = details ? details : [];

  const getDetailsOfUserNote = data
    .map(
      (v) => `
        <ul class="note-table-top">
            <li>${v.title}</li>
            <li class="view-note" data-note_id="${v.note_id}" data-user_id="${
        v.user_id
      }">
            ${v.message.substring(0, 50)}......</li>
            <li class="col-100 flex gap-2">
                <i class="fa fa-edit edit-note cursor" title="EDIT" data-user_id="${
                  v.user_id
                }" data-note_id="${v.note_id}"></i>
                <i class="fa fa-trash delete-note cursor" title="DELETE" data-note_id="${
                  v.note_id
                }"></i>
            </li>
        </ul>
    `
    )
    .join('');

  const tablehead = `
    <ul class="note-table-bottom">
    <li>Date</li>
    <li>Message</li>
    <li>Action</li>
    </ul>
    `;

  const tablebody = getDetailsOfUserNote;

  classSelector('tabs-content').innerHTML = `
    <div id="tab1" class="active hide-tab">
    ${Table(tablehead, tablebody)}
    </div>
    `;
  //END NOTE
};

export default noteTabs;
