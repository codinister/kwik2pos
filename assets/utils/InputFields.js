import { classSelector } from './Selectors.js';

const inputvalue = (stateName, inputName, value) => {
  const fieldValue = JSON.parse(sessionStorage.getItem(stateName));
  if (fieldValue) {
    return fieldValue[inputName];
  }
  return value;
};

const textInput = (obj) => {
  const {
    type = '',
    classname = '',
    required = '',
    label = '',
    placeholder = '',
    value = '',
    name = '',
    disabled = '',
    checked = '',
  } = obj;

  let req = '';
  if (req !== 'none') {
    req = `required="${required}"`;
  }

  return `
		<div class="form-group  pt-0 input-animate">	
			<input type="${type}" autocomplete="none" placeholder="${placeholder}" readonly  class="fminpt form-control ${classname}" ${disabled} ${req}  value="${value}"  name="${name}" ${checked}>
			<label>${label}${!required ? ' (Optional)' : ''}</label>
		</div>`;
};

const emailInput = ({ ...obj }) => {
  const {
    classname = '',
    name = '',
    id = classname,
    value = '',
    errorclass = '',
  } = obj;
  return `
      <div class="form-group  pt-0 input-animate">	
        <input type="email" placeholder="" value="${value}"  class="fminpt form-control ${classname}" required readonly  name="${name}">
        <label>Email</label>
        <span class="${errorclass}"></span>
      </div>`;
};

const phoneInput = ({ ...obj }) => {
  const { classname = '', name = '', value = '', errorclass = '' } = obj;
  return `
      <div class="form-group  pt-0 input-animate">	
        <input type="number" placeholder="" value="${value}"  class="fminpt form-control ${classname}" required readonly  name="${name}">
        <label>Phone</label>
        <span class="${errorclass}"></span>
      </div>`;
};

const passwordInput = ({ ...obj }) => {
  const cls = obj?.classname.split(' ')[0];
  const { classname = '', name = '', id = cls, errorclass = '' } = obj;

  document.addEventListener('click', (e) => {
    if (e.target.matches(`.${cls}ps`)) {
      if (classSelector(`${cls}password`).getAttribute('type') === 'password') {
        classSelector(`${cls}password`).setAttribute('type', 'text');
      } else {
        classSelector(`${cls}password`).setAttribute('type', 'password');
      }
    }
  });

  return `
      <div class="form-group  pt-0 input-animate">	
        <input type="password" placeholder=""  id="${id}" class="fminpt form-control password ${classname} ${cls}password " required readonly  name="${name}">
        <label>Password</label>
        <i class="fa fa-eye showppasss ${cls}ps"></i>
        <span class="${errorclass}"></span>
      </div>`;
};

const dateInput = ({ ...obj }) => {
  const {
    classname = '',
    required = '',
    label = '',
    placeholder = '',
    value = '',
    name = '',
    disabled = '',
  } = obj;

  return `
		<div class="form-group  pt-0 input-animate">	
			<input type="date" placeholder="${placeholder}" 
      class="fminpt form-control ${classname}" 
      ${disabled}  
      value="${value}"
      required="${required}" 
      readonly  name="${name}"
      >
			<label>${label}${!required ? ' (Optional)' : ''}</label>
		</div>`;
};

const textArea = ({ ...obj }) => {
  const { classname, placeholder } = obj;

  return `
		<div class="form-groupe">	
			<textarea class="${classname} message-box"  placeholder="${placeholder}"></textarea>
		</div>`;
};

const Button = ({ ...obj }) => {
  const {
    output = '',
    classname = '',
    buttonname = '',
    buttonType = 'button',
  } = obj;

  return `
		<div class="results ${output}"></div>
		<div class="submitbtn">
		<button type="${buttonType}"  class="button-rounded 
		${classname}">${buttonname.toUpperCase()}</button>
		</div>`;
};

const Titlebar = (title) => {
  return `
			<div class="heading-title">
			${title}
			</div>
		`;
};

const checkBox = ({ ...obj }) => {
  const { classname = '', labelname = '', name = '', check = '' } = obj;

  return `
		<div class="checkbox-group">
			<input type="checkbox"   name="${name}" ${check} class="${classname}" />
			<label>${labelname}</label>
		</div>
		`;
};

const radioButton = ({ ...obj }) => {
  const {
    labelname = '',
    name = '',
    check = '',
    value = '',
    id = '',
    cls = '',
  } = obj;
  return `
		<div class="checkbox-group">
			<input type="radio"  ${check} id="${id}"  class="${cls}" name="${name}" value="${value}"   />
			<label>${labelname}</label>
		</div>
		`;
};

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

  const inptvalue = inputvalue(stateName, inputName, value);

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

const FileUpload = ({ ...obj }) => {
  const {
    inputName = '',
    labelName = '',
    required = 0,
    stateName = '',
    stateFields = 0,
    classname=''
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

const Buttonx = ({ ...obj }) => {
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
  textInput,
  textArea,
  Button,
  Titlebar,
  checkBox,
  radioButton,
  dateInput,
  passwordInput,
  phoneInput,
  emailInput,
  Input,
  TextArea,
  Buttonx,
  FileUpload,
};
