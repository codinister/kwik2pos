import CompanyDetails from "../utils/CompanyDetails.js"
import goBack from '../utils/goBack.js'

const Recordexpenses = () => {
  return `
  <div class="record-expenses">
    <div>
      <div>
      ${CompanyDetails({
        title: 'Record Expenses', 
        desc: ''
      })}
      </div>
      <div>
      ${goBack()}
      </div>
    </div>
  </div>
  `
}

export default Recordexpenses