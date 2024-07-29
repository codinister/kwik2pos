import { classSelector } from './Selectors.js';

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
			<input type="${type}" placeholder="${placeholder}"  class="fminpt form-control ${classname}" ${disabled} ${req} readonly value="${value}" name="${name}" ${checked}>
			<label>${label}${!required ? ' (Optional)' : ''}</label>
		</div>`;
};

const emailInput = ({ ...obj }) => {
  const { classname = '', name = '', id = classname, value = '', errorclass='' } = obj;
  return `
      <div class="form-group  pt-0 input-animate">	
        <input type="email" placeholder="" value="${value}"  class="fminpt form-control ${classname}" required readonly  name="${name}">
        <label>Email</label>
        <span class="${errorclass}"></span>
      </div>`;
};

const phoneInput = ({ ...obj }) => {
  const { classname = '', name = '',  value = '', errorclass='' } = obj;
  return `
      <div class="form-group  pt-0 input-animate">	
        <input type="number" placeholder="" value="${value}"  class="fminpt form-control ${classname}" required readonly  name="${name}">
        <label>Phone</label>
        <span class="${errorclass}"></span>
      </div>`;
};

const passwordInput = ({ ...obj }) => {
  const cls = obj?.classname.split(' ')[0];
  const { classname = '', name = '', id = cls , errorclass=''} = obj;

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
};
