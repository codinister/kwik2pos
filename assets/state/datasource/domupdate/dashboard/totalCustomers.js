import { formatDate } from "../../../../utils/DateFormats.js";
import getDates from "../../../../utils/getDates.js";
import textContent from "../../../../utils/textContent.js";

  const totalCustomers = (data)=>{
  const customerDates = getDates(data)
  textContent({
    classname: 'totalcustomers-total',
    content: data.length,
  });
  textContent({
    classname: 'totalcustomers-date',
    content: `${formatDate(customerDates[0])} - ${formatDate(
      customerDates[customerDates.length - 1]
    )}`,
  });
}

export default totalCustomers