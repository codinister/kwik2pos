import roleAccess from "../../roleAccess";

const customerReport = () => {

  let customer_reports = '';

  if (roleAccess()) {
    customer_reports = `
    <div class="view-rep">
    <span>CUSTOMER REPORTS </span> <span>^</span>
    </div>

    <div> 
    <button class="cust-rep-btn">CUSTOMERS REPORT</button>
    <button class="vend-rep-btn">VENDORS REPORT</button>
    <button class="ref-rep-btn">REFERRERS REPORT</button>
    </div>
    `;
  }

  return customer_reports;
};

export default customerReport;
