
const contPreview = (tax_id,cust_id,user_id) => {
  return `
  <button 
    data-tax_id="${tax_id}"
    data-cust_id="${cust_id}"
    data-user_id="${user_id}"
  class="preview-contract">View Contract</button>
  `
}

export default contPreview