import setInputValue from '../../../utils/sales/setInputValue.js';
import format_number from '../../../utils/format_number.js';
import { textInput } from '../../../utils/InputFields.js';
import industryCheck from '../../../utils/industryCheck.js';


const othercharges = (vv) => {

  let invoice_desc = '';

  if (industryCheck('roofing company')) {
    invoice_desc = `${textInput({
      type: 'text',
      classname: 'profile trans',
      required: true,
      name: 'profile',
      label: 'Profile',
      value: setInputValue(vv?.profile || ''),
    })}`;
  }

  return `
    <div>
    ${invoice_desc}
      ${textInput({
        type: 'text',
        classname: 'location trans',
        required: true,
        name: 'location',
        label: 'Site Location',
        value: setInputValue(vv?.location || ''),
      })}

      ${textInput({
        type: 'number',
        classname: 'transportation trans',
        required: false,
        label: 'Transportation',
        name: 'transportation',
        value: setInputValue(format_number(vv?.transportation || '')),
      })}
        ${textInput({
          type: 'number',
          classname: 'installation trans',
          required: false,
          label: 'Installation',
          name: 'installation',
          value: setInputValue(format_number(vv?.installation || '')),
        })}
      </div>
  `;
};

export default othercharges;
