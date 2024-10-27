
import receipts from './reciepts/receipts.js'



const url = new URLSearchParams(window.location.search);

Promise.allSettled(['Receipts', 2, 3])
  .then((data) => {
    document.querySelector('.root').innerHTML = data[0].value;
  })
  .catch((err) => console.log(eerr));
