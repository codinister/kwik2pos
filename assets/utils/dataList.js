import { classSelector } from '../utils/Selectors.js';
import innerHTML from '../utils/innerHTML.js';

const dataHTMList = (v, item) => `
          <li class="${item}" 
          data-id="${v.id}"
          data-name="${v.name}"
          >
            ${v.name}
          </li>
        `;

const dataList = ({ ...options }) => {
  const { data, state, inputName, labelName, question = '', required = 0 } = options;

  const dropdownclass = inputName + '-item-dropdown';
  const item = inputName + '-item';

  document.addEventListener('click', (e) => {
    if (e.target.matches(`.${inputName}`)) {
      if (classSelector(dropdownclass)) {
        classSelector(dropdownclass).classList.add('active');
      }
    }
    if (!e.target.matches(`.${item}`) && !e.target.matches(`.${inputName}`)) {
      if (classSelector(dropdownclass)) {
        classSelector(dropdownclass).classList.remove('active');
      }
    }
    if (e.target.matches(`.${item}`)) {
      const { id, name } = e.target.dataset;

      if (classSelector(dropdownclass)) {
        classSelector(inputName).value = name;

        if (!sessionStorage.getItem(state)) {
          sessionStorage.setItem(
            state,
            JSON.stringify({
              item_name: name,
              item_id: id,
            })
          );
        } else {
          const obj = JSON.parse(sessionStorage.getItem(state));

          const data = {
            ...obj,
            item_name: name,
            item_id: id,
          };

          sessionStorage.setItem(state, JSON.stringify(data));
        }

        classSelector(dropdownclass).classList.remove('active');
      }
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches(`.${inputName}`)) {
      const obj = Object.values(data)
        .filter((v) =>
          Object.values(v)
            .join(' ')
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
        .map((v) => dataHTMList(v, item))
        .slice(0, 10)
        .join(' ');

      innerHTML({
        classname: dropdownclass,
        content: obj,
      });
    }
  });

  return `
  <div class="datalist">
  	<div class="input-control">	
			<input 
      type="text" 
      placeholder="" 
      class="fminpt  ${inputName}"
      readonly 
      name="${inputName}"
      >
			<label>
        ${labelName}

              ${
                required
                  ? '<div class="required-box"><i class="fa fa-asterisk" title="Field required!"></i></div>'
                  : ''
              }
      </label>


      ${
        question
          ? `
        <i class="fa fa-question-circle-o question-box">
          <div>
            ${question}
          </div>
        </i>
      `
          : ''
      }


		</div>

    <ul class="${dropdownclass} item-dropdown">
      ${Object.values(data)
        .map((v) => dataHTMList(v, item))
        .slice(0, 10)
        .join(' ')}
    </ul>

    </div>
  `;
};

export default dataList;
