import { textInput } from '../InputFields.js';
import Buttons from '../Buttons.js';
import { classSelector } from '../Selectors.js';
import { dmy } from '../DateFormats.js';
import displayToast from '../displayToast.js';
import Spinner from '../Spinner.js';
import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const contractNote = () => {
  const sls = JSON.parse(sessionStorage.getItem('sales'));

  const fullname = sls?.cust_name;





  const contractNumber = (fullname = '') => {
    const fn = fullname.split(' ');
    const cnumber = fn
      .map((v) => {
        return v.slice(0, 1);
      })
      .join('');
    const us = getLoginuser('user')
    const sett = getLoginuser('settings')
    const contnumber = `${sett?.comp_name.toUpperCase()}/${cnumber}/${dmy(
      new Date(us?.login_date)
    )}`;
    return contnumber;
  };

  setTimeout(() => {
    //CKEDITOR INSTANCE
    CKEDITOR.replace('otherinfo', {
      height: '300px',
    });

    const us = JSON.parse(sessionStorage.getItem('zsdf'));
    const start_date = new Date(us?.login_date);

    if (classSelector('start_date')) {
      classSelector('start_date').valueAsDate = new Date(start_date);
    }
    if (classSelector('title')) {
      classSelector('title').value = 'OUT OF HOME ADVERTISING CONTRACT';
    }
    if (classSelector('refferedtoas')) {
      classSelector('refferedtoas').value = 'Agency';
    }

  

    if (!!sls?.contract) {
      if (classSelector('otherinfo')) {

        const info = sls?.contract.otherinfo

        CKEDITOR.instances.otherinfo.setData(info);
      }
      if (classSelector('start_date')) {
        classSelector('start_date').valueAsDate = new Date(sls?.contract.start_date);
      }
      if (classSelector('title')) {
        classSelector('title').value = sls?.contract?.title;
      }
      if (classSelector('refferedtoas')) {
        classSelector('refferedtoas').value = sls?.contract.refferedtoas;
      }
    }



    if (sessionStorage.getItem('contract')) {
      const { title, start_date, refferedtoas, otherinfo } = JSON.parse(
        sessionStorage.getItem('contract')
      );

      if (classSelector('otherinfo')) {
        CKEDITOR.instances.otherinfo.setData(otherinfo);
      }
      if (classSelector('start_date')) {
        classSelector('start_date').valueAsDate = new Date(start_date);
      }
      if (classSelector('title')) {
        classSelector('title').value = title;
      }
      if (classSelector('refferedtoas')) {
        classSelector('refferedtoas').value = refferedtoas;
      }
    }
  }, 1000);

  /*
   *BEGIN SAVE CONTRACT
   */

  document.addEventListener('input', (e) => {
    if (e.target.matches('.contr')) {
      const { name, value } = e.target;

      if (!sessionStorage.getItem('contract')) {
        const us = JSON.parse(sessionStorage.getItem('zsdf'));
        const start_date = new Date(us?.login_date);
        sessionStorage.setItem(
          'contract',
          JSON.stringify({
            cont_id: sls?.contract.cont_id,
            title: 'OUT OF HOME ADVERTISING CONTRACT',
            start_date,
            refferedtoas: 'Agency',
            contractnumber: contractNumber(fullname),
            otherinfo: '',
            ss_id: sls?.ss_id,
            cust_id: sls?.cust_id,
          })
        );
      }

      const obj = JSON.parse(sessionStorage.getItem('contract'));
      const newobj = { ...obj, [name]: value };

      sessionStorage.setItem('contract', JSON.stringify(newobj));
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.contract-btn')) {

      if(sessionStorage.getItem('contract')) {
      
      const st = JSON.parse(sessionStorage.getItem('contract'));
      st['otherinfo'] = CKEDITOR.instances.otherinfo.getData();
      sessionStorage.setItem('contract', JSON.stringify(st));
      const obj = JSON.parse(sessionStorage.getItem('contract'));

      const trim = Object.values(obj)
        .map((v) => v)
        .filter(Boolean);

      if (trim.length < 5) {
        return displayToast('bgdanger', 'All fields required!');
      }

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));

      Spinner('btn-wrapper');

      fetch('router.php?controller=sales&task=save_contract', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
      
          if (data !== 'error') {
            sessionStorage.removeItem('sales');
            sessionStorage.removeItem('prozdlist');
            sessionStorage.removeItem('contract');
            displayToast('lightgreen', 'An error occured!');

        

            classSelector('contract-note-wrapper').innerHTML = ''
            classSelector('note-container').innerHTML = ''
     
            sessionStorage.setItem('rend', '404')

          } else {
            displayToast('bgdanger', 'An error occured!');
          }


        });
      }
      else{
        displayToast('lightgreen', 'An error occured!');
        classSelector('btn-wrapper').innerHTML = '';
      }
    }
  });

  /*
   *END SAVE CONTRACT
   */



   if (!sessionStorage.getItem('contract')) {
    const us = JSON.parse(sessionStorage.getItem('zsdf'));
    const start_date = new Date(us?.login_date);
    sessionStorage.setItem(
      'contract',
      JSON.stringify({
        cont_id: sls?.contract.cont_id,
        title: 'OUT OF HOME ADVERTISING CONTRACT',
        start_date,
        refferedtoas: 'Agency',
        contractnumber: contractNumber(fullname),
        otherinfo: '',
        ss_id: sls?.ss_id,
        cust_id: sls?.cust_id,
      })
    );
  }

  return `<div class="contract-form"> 

  <h3> CONTRACT FORM</h3>

  ${textInput({
    type: 'text',
    classname: 'title contr',
    required: true,
    name: 'title',
    label: 'Title',
  })}

  ${textInput({
    type: 'date',
    classname: 'start_date contr',
    required: true,
    name: 'start_date',
    label: 'Start date',
  })}

  ${textInput({
    type: 'text',
    classname: 'refferedtoas contr',
    required: true,
    name: 'refferedtoas',
    label: 'referred to as',
  })}

  <div class="form-control otherinfo">
  <label>Additional information</label>
  <textarea class="otherinfo" id="otherinfo"></textarea>
  </div>

  <div class="btn-wrapper">
  ${Buttons([
    {
      btnclass: 'contract-btn',
      btnname: 'CREATE CONTRACT',
    },
  ])}
  </div>

  </div>
  `;
};

export default contractNote;
