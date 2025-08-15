const reportDescription = () => {
  return `
  <div class="reportdescription">

  <div>
    <i class="fa fa-question-circle-o"></i>
    <h4>Simple Report</h4>
    <div>
      Includes all income and all expenses, including inventory or raw material purchases — even if the items haven’t been sold yet. It’s a quick, overall view of how much you’re spending vs earning.
    </div>
  </div>

  <div>
    <h4>Standard Report</h4>
    <div>
      Only includes the cost of inventory that has been sold (COGS). Inventory that is purchased but not yet sold is not included as an expense. This gives a more accurate profit based on actual sales.
    </div>
  </div>

  </div>
  `;
};

export default reportDescription;
