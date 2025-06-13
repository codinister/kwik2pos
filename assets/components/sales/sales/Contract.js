import { textInput } from '../../../utils/InputFields.js';
import Buttons from '../../../utils/Buttons.js';
import { dmy } from '../../../utils/DateFormats.js';
import { classSelector } from '../../../utils/Selectors.js';

const Contract = (fullname, ss_id, cust_id, fullpayment) => {
  const fn = fullname.split(' ');

  const one = fn[0]?.slice(0, 1);
  const two = fn[1]?.slice(0, 1);
  const three = fn[2]?.slice(0, 1);
  const four = fn[3]?.slice(0, 1);

  const sales = JSON.parse(sessionStorage.getItem('sales'));

  if (sales?.contract) {

    const {
      cont_id,
      title,
      start_date,
      refferedtoas,
      contractnumber,
      otherinfo,
      ss_id,
      cust_id,
    } = sales?.contract;

    sessionStorage.setItem(
      'contract',
      JSON.stringify({
        cont_id,
        title,
        start_date,
        refferedtoas,
        contractnumber,
        otherinfo,
        ss_id,
        cust_id,
      })
    );

    setTimeout(()=>{
      if(classSelector('otherinfo')){
        CKEDITOR.instances.otherinfo.setData(otherinfo)
      }
      classSelector('title').value = title 
      classSelector('start_date').valueAsDate = new Date(start_date)
      classSelector('refferedtoas').value = refferedtoas
    }, 1000)

  }
  else{
  

  }



  const contnumber = `SP AGENCY/${one || ''}${two || ''}${three || ''}${
    four || ''
  }/${dmy(new Date())}`;



  if (!sessionStorage.getItem('contract')) {
    sessionStorage.setItem(
      'contract',
      JSON.stringify({
        cont_id: '',
        title: 'OUT OF HOME ADVERTISING CONTRACT',
        start_date: dmy(new Date()),
        refferedtoas: 'Agency',
        contractnumber: contnumber,
        otherinfo: '',
        ss_id,
        cust_id,
      })
    );
  }

 
  document.addEventListener('input', (e) => {
    if (e.target.matches('.contr')) {
      const { name, value } = e.target;

      if (!sessionStorage.getItem('contract')) {
        sessionStorage.setItem(
          'contract',
          JSON.stringify({
            cont_id: '',
            title: 'OUT OF HOME ADVERTISING CONTRACT',
            start_date: dmy(new Date()),
            refferedtoas: 'Agency',
            contractnumber: contnumber,
            otherinfo: '',
            ss_id: '',
            cust_id: '',
          })
        );
      }

      const obj = JSON.parse(sessionStorage.getItem('contract'));
      const newobj = { ...obj, [name]: value };
      const update = {...newobj, touched: true}
      sessionStorage.setItem('contract', JSON.stringify(update));

    }
  });

  setTimeout(() => {
    //CKEDITOR INSTANCE
    CKEDITOR.replace('otherinfo', {
      height: '300px',
    });
  }, 500);

  return `
  <div class="contract-form"> 

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

export default Contract;
