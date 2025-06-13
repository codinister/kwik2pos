import transPreview from './btn/transPreview.js'
import contPreview from './btn/contPreview.js'

const previews = (pay_id,cust_id,tax_id,user_id) => {
  return `
  <div class="previews">
  ${transPreview(pay_id,cust_id,tax_id,user_id)}
  ${contPreview(cust_id,tax_id,user_id)}
  </div>
  `
}

export default previews