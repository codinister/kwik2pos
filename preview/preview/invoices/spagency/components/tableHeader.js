import getLogo from '../../../../utils/getLogo.js';
import imagePath from '../../../../utils/imagePath.js';
import invoiceDate from '../../../../utils/invoiceDate.js';

const tableHeader = ({ ...obj }) => {
  const {
    invoice_no,
    customers: { fullname: cust_name, phone, location: custloc },
    settings: {
      comp_name,
      comp_logo,
      comp_location,
      comp_email,
      comp_website,
      duration,
    },
    taxes: { createdAt, profile, trans_type },
    items,
    durations,
  } = obj;

  //INVOICE HEADER
  let invoice_no_type = 'SALES INVOICE #';
  let invoice_to_type = 'SALES INVOICE TO:';
  let invoice_desc = 'SALES INVOICE';

  if (trans_type === 'proforma') {
    invoice_no_type = 'PROFORMA #';
    invoice_to_type = 'PROFORMA TO:';
    invoice_desc = 'PROFORMA INVOICE';
  }




  const logo = getLogo(comp_logo);

  return `
    
    <table cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <td style="width: 15rem;">
                    ${logo}
                    <br />
                    ${invoice_desc}
                </td>
                <td style="width: 58rem;">
                <h2>${comp_name.toUpperCase()}</h2>
                <table cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width: 29rem;">
                        ${comp_location}
                        <br />
                        ${comp_email}
                        <br />
                        ${comp_website}
                        <br />
                        <br />

                  ${invoiceDate(duration, durations, createdAt)}
                    
                        <br />
                        <br />
                        PROJECT:${profile}
                        <br />
                        </td>
                        <td style="width: 29rem;">
                        <strong>${invoice_to_type}</strong>
                        <br />
                        ${cust_name}
                        <br />
                        ${phone}
                        <br />
                        ${custloc}
                        <br />
                        <br />
                        ${invoice_no_type}:
                        <strong>${invoice_no}</strong>
                        <img src="${imagePath()}images/spagency/underline.jpg" alt="" width="200" height="10" />
                        <br />
                        <br />
                        </td>
                    </tr>
                </table>
                </td>
            </tr>
            </thead>


            
        </table>
    
    
    `;
};

export default tableHeader;
