import statement from '../statements/statements.js';

const statementData = (obj) => {
  document.querySelector('.contentroot').innerHTML = statement(obj);
};

export default statementData;
