import { classSelector } from '../../../utils/Selectors.js';
import setButton from '../../../utils/setButton.js';
import sessionGet from '../../sessionstorage/GET/sessionGet.js';
import sessionSet from '../../sessionstorage/SET/sessionSet.js';
const errors = (statename, name, value, statefields) => {
  if (classSelector(`error-${name}`)) {
    const required = statename + 'required';
    classSelector(`error-${name}`).textContent = value;
    const obj = sessionGet(required);
    obj['error'] = value;

    sessionSet({
      statename: required,
      content: obj,
    });

    setButton(statename, statefields);
  }
};

const setState = (statename, name, value) => {
  if (!sessionGet(statename)) {
    sessionSet({
      statename: statename,
      content: {},
    });

    const data = sessionGet(statename);

    const obj = {
      ...data,
      [name]: value,
    };

    sessionSet({
      statename: statename,
      content: obj,
    });
  } else {
    const data = sessionGet(statename);

    const obj = {
      ...data,
      [name]: value,
    };

    sessionSet({
      statename: statename,
      content: obj,
    });
  }
};

const isRequired = (required, statename, name, value, statefields) => {
  const state_name = statename + 'required';
  if (required == 1) {
    setState(state_name, name, value);
  }
  setButton(statename, statefields);
};




const inputValidationEvent = (data) => {
  const emails = data?.map((v) => v.email);
  const phones = data?.map((v) => v.phone);

  document.addEventListener('input', (e) => {
    if (e.target.matches('.fminpt')) {
      const {
        dataset: { max, min, required, statefields, statename },
        value,
        name,
        files,
        type,
      } = e.target;

      if (value.length > 0) {
        if (type === 'password') {
          if (value.length < min) {
            isRequired(required, statename, name, '', statefields);
            return errors(
              statename,
              name,
              `${min} or more characters required!`,
              statefields
            );
          } else {
            errors(statename, name, '', statefields);
          }
        }

        if (type === 'tel') {
          if (value.length < min) {
            isRequired(required, statename, name, '', statefields);
            return errors(
              statename,
              name,
              `${min} or more characters required!`,
              statefields
            );
          } else if (phones.includes(value)) {
            isRequired(required, statename, name, '', statefields);
            return errors(
              statename,
              name,
              `Phone number is in use!`,
              statefields
            );
          } else {
            errors(statename, name, '', statefields);
          }
        }

        if (type === 'email') {
          const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (value.match(validRegex)) {
            errors(statename, name, ``, statefields);
          } else {
            isRequired(required, statename, name, '', statefields);
            return errors(
              statename,
              name,
              `Valid email required!`,
              statefields
            );
          }

          if (emails.includes(value)) {
            isRequired(required, statename, name, '', statefields);
            return errors(statename, name, `Email is in use!`, statefields);
          }

          errors(statename, name, ``, statefields);
        }

        if (type === 'file') {
          if (files || files[0]) {
            const imgs = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!imgs.includes(files[0].type)) {
              isRequired(required, statename, name, '', statefields);
              return errors(statename, name, `Unsupported file!`, statefields);
            } else {
              errors(statename, name, ``, statefields);
            }

            const reader = new FileReader();
            reader.onload = function (e) {
              classSelector(name).setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(files[0]);
          }
        }
      } else {
        errors(statename, name, ``, statefields);
      }

      isRequired(required, statename, name, value, statefields);

      setState(statename, name, value);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.showpass')) {
      const name = e.target.dataset.name;
      if (classSelector(name).getAttribute('type') === 'password') {
        classSelector(name).setAttribute('type', 'text');
      } else {
        classSelector(name).setAttribute('type', 'password');
      }
    }
  });
};

export default inputValidationEvent;
