import { Button } from './InputFields.js';
import { classSelector } from './Selectors.js';
import disabledButton from '../utils/disabledButton.js';
import innerHTML from './innerHTML.js'
import sessionGet from '../state/sessionstorage/GET/sessionGet.js';

const setButton = (statename, statefields) => {
  const state_name = statename + 'required';
  if (sessionGet(state_name)) {
    const getstate = Object.values(sessionGet(state_name)).filter(
      Boolean
    ).length;

    const error = sessionGet(state_name)?.error;
    
    const fields = Number(getstate) === Number(statefields);


    if (error) {
      if (classSelector(statename)) {
        innerHTML({
          classname: statename, 
          content: disabledButton()
        })

      }
    } else if (fields) {
      if (classSelector(statename)) {
        innerHTML({
          classname: statename, 
          content: Button({
          classname: statename,
          buttonname: 'Save',
        })
        })
 
      }
    } else {
        innerHTML({
          classname: statename,
          content: disabledButton(),
        });
      
    }
  }
};

export default setButton;
