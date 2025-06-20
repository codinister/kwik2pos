import { Buttonx } from './InputFields.js';
import { classSelector } from './Selectors.js';
import disabledButton from '../utils/disabledButton.js'

const setButton = (statename, statefields) => {
  const state_name = statename + 'required';
  if (sessionStorage.getItem(state_name)) {
    const getstate = Object.values(
      JSON.parse(sessionStorage.getItem(state_name))
    ).filter(Boolean).length;

    const error = JSON.parse(sessionStorage.getItem(state_name))?.error;
    const fields = Number(getstate) === Number(statefields);

    if (error) {
      if (classSelector(statename)) {
        classSelector(statename).innerHTML = disabledButton();
      }
    } else if (fields) {
      if (classSelector(statename)) {
        classSelector(statename).innerHTML = Buttonx({
          classname: statename,
          buttonname: 'Save',
        });
      }
    } else {
    
      if (classSelector(statename)) {
        classSelector(statename).innerHTML = disabledButton();
      }
    }
  }
};

export default setButton;
