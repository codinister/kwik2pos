import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';

const CompanyDetails = ({...options}) => {
  const sett = getLoginuser('settings');

  const {title, desc} = options

  return `
  <div class="companydetails">
  <p>${sett?.comp_name}</p>
  <h4>${title}</h4>
  <p>${desc}</p>
  </div>
  `;
};

export default CompanyDetails;
