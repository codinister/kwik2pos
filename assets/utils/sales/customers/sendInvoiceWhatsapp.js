import getLoginuser from '../../../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const sendInvoiceWhatsapp = (e) => {
  const { firstname } = getLoginuser('user')
  const { comp_name } = getLoginuser('settings')
  const { ss_id, cust_name, phone } = e.target.dataset;
  const url = `https://www.kwik2pos.com`;
  //const url = `http://localhost/kwikpos`;
  const mobile = phone.split(' ').join('');

  const mess = [
    `Hi! ${cust_name} this is ${firstname} from ${comp_name} please click on the link below to view your invoice
   `,
    `${url}/assets/pdf/invoice.php?inv=${btoa(ss_id)}`,
  ].join('\n\n');
  window.location.href = `https://wa.me/233${mobile}?text="${decodeURI(
    mess
  )}"`;
};

export default sendInvoiceWhatsapp;
