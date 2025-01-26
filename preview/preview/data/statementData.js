
import statement from '../statements/statements.js';

const statementData = (
  tax_id,
  settings,
  customers,
  users,
  taxes,
  items,
  payments
) => {


  const obj = {
    settings,
    customers,
    users,
    taxes,
    items,
    payments,
  };

  document.querySelector('.contentroot').innerHTML = statement(obj);
};

export default statementData;
