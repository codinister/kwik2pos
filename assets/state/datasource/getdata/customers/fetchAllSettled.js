import fetchApiUrl from "../../../../utils/fetchApiUrl.js";
import urlCode from "../../../../utils/urlCode.js";

const fetchAllSettled = () => {
  return [
    fetch(fetchApiUrl('customersprofile', 'getCustomers') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getInvoices') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getProformas') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getReceipts') + urlCode()).then(
      (resp) => resp.json()
    ),
  ];
};

export default fetchAllSettled;
