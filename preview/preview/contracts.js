
import contracts from './contracts/contracts.js'


const url = new URLSearchParams(window.location.search);

Promise.allSettled(['Contracts', 2, 3])
  .then((data) => {
    document.querySelector('.root').innerHTML = data[0].value;
  })
  .catch((err) => console.log(eerr));
