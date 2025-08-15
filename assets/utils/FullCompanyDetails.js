import getLoginuser from "../state/sessionstorage/GET/getLoginuser.js";

const FullCompanyDetails = () => {
  const sett = getLoginuser('settings');
  return `
  <div class="fullcompanydetails">
    <h5>${sett?.comp_name}</h5>
    <p>${sett?.comp_location}</p>
    <p>${sett?.comp_phone}</p>
  </div>
  `;
};

export default FullCompanyDetails;
