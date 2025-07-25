import { classSelector } from './Selectors.js';
import setInputValue from './setInputValue.js';

const Input = ({ ...obj }) => {
  const {
    inputName = '',
    labelName = '',
    required = 0,
    type = 'text',
    id = '',
    checked = '',
    className = 'input-control',
    min = 0,
    max = 0,
    stateName = '',
    stateFields = 0,
    value = '',
  } = obj;

  const inptvalue = setInputValue(stateName, inputName, value);

  if (type === 'date') {
    setTimeout(() => {
      classSelector(inputName).valueAsDate = new Date();
    }, 1000);
  }

  return `
		<div class=${className}>	
			<input 
      type="${type}" 
      placeholder="" 
      class="fminpt ${inputName}"
      readonly 
      name=${inputName}
      value="${inptvalue}"  
       ${checked}
      data-required = ${required}
      data-min = ${min}
      data-max = ${max}
      data-statename = ${stateName}
      data-statefields = ${stateFields}
      data-id = ${id}
      >
			<label>
      ${labelName} 
      ${required ? '<div class="required-box">!</div>' : ''}
      </label>

      ${
        type === 'password'
          ? `<i class="fa showpass fa-eye fa-lg" data-name=${inputName}></i>`
          : ''
      }
      <div class="error-result error-${inputName}"></div>
		</div>`;
};

const searchInput = ({ ...obj }) => {
  const { inputName = '', value='' } = obj;

  return `
		<div class="input-control">	
			<input 
      type="text" 
      placeholder="Search" 
      class="searchinpt ${inputName}"
      name="${inputName}"
      value="${value}"
      >
      <i class="fa searchicon fa-search fa-lg" ></i>
		</div>`;
};

const FileUpload = ({ ...obj }) => {
  const {
    inputName = '',
    labelName = '',
    required = 0,
    stateName = '',
    stateFields = 0,
    classname = '',
  } = obj;

  return `
      <div class="file-upload-btn">
      <label>
      <div>${labelName} ${
    required ? '<div class="required-box">!</div>' : ''
  }</div>
      <input 
      type="file" 
      name=${inputName} 
      data-statename = ${stateName}
      data-statefields = ${stateFields}
      class="fminpt ${classname}"
      />
      </label>
      <div class="error-result error-${inputName}"></div>
      </div>

`;
};

const TextArea = ({ ...obj }) => {
  const {
    inputName = '',
    placeholder = '',
    max = '',
    stateName = '',
    stateFields = '',
    required = 0,
    value = '',
  } = obj;

  const inptvalue = inputvalue(stateName, inputName, value);

  return `
		<div class="texarea-control">	
			<textarea 
      name=${inputName}  
      class="fminpt"
      placeholder="${placeholder}"
      data-statename = ${stateName}
      data-statefields = ${stateFields}
      data-required = ${required}
      >${inptvalue}</textarea>
		</div>`;
};

const Button = ({ ...obj }) => {
  //classname must be the same as your state name
  const { classname = '', buttonname = '' } = obj;

  return `
		<button  
    class="btn-rounded
		${classname}">
    ${buttonname.toUpperCase()}
    </button>`;
};

export {
  Button,
  Input,
  TextArea,
  FileUpload,
  searchInput,
};
